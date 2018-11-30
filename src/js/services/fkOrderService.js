class FkOrderService {
  constructor(fkHttp, fkUtils, API, fkUserService, $log, MAPS_API_KEY, $q, $rootScope, $filter, fkCartUtilsService) {
    this.fkHttp = fkHttp;
    this.fkUtils = fkUtils;
    this.API = API;
    this.fkUserService = fkUserService;
    this.$log = $log;
    this.MAPS_API_KEY = MAPS_API_KEY;
    this.$q = $q;
    this.$rootScope = $rootScope;
    this.$filter = $filter;
    this.fkCartUtilsService = fkCartUtilsService;

    this.order = {
      orderId: '1',
      address: {
        street1: '',
        city: ''
      },
      phone: '',
      time: '',
      total: 0,
      estimatedPrice: false,
      modifiable: false
    };
    this.deliveryStatusIcons = {
      'In process': '#ds-submitted',
      Processing: '#ds-submitted',
      Submitted: '#ds-submitted',
      Cancelled: '#ds-cancelled',
      Returned: '#ds-cancelled',
      'En-route': '#ds-vespa',
      'Contact Customer Service': '#ds-exclamation',
      'Pending redelivery': '#ds-exclamation',
      'Pending Cancellation': '#ds-exclamation',
      Delivered: '#ds-checked'
    };
    this.pastOrdersIsLoading = false;
    this.pastOrdersCount = 0;
    this.loadingPromise = this.$q.resolve([]);
    this.orderIndex = null;
    this.pastOrdersMenu = [];

    this.createPastOrdersMenuGroups(new Date());

    this.$rootScope.$on('fk-user-change', (ev, data) => {
      this.createPastOrdersMenuGroups(new Date());
      if (data.user) {
        this.loadPastOrders();
      }
    });

  }

  calculateLastDay(date) {
    let firstDay = new Date(date.getFullYear(), date.getMonth(), 1, 0, 0, 0, 0);
    return firstDay.setMonth(firstDay.getMonth() + 1) - 1;
  }

  createPastOrdersMenuGroups(currentDate) {
    let menuGroups = [];
    this.orderIndex = {};
    for (let i = 0; i < 12; i++) {
      let currentTime = new Date();
      currentTime.setMonth(currentDate.getMonth() - i, 1);
      let menuGroupItem = {
        title: this.$filter('date')(currentTime, 'MMMM yyyy'),
        date: currentTime,
        endDate: this.calculateLastDay(currentTime),
        entries: []
      };
      this.orderIndex[menuGroupItem.title] = menuGroupItem.entries;
      menuGroups.push(menuGroupItem);
    }
    this.pastOrdersCount = 0;
    this.pastOrdersMenu = menuGroups;
  }

  setEntries(pastOrdersData) {
    let pastOrdersMenuEntries = pastOrdersData.orders.map((order) => ({
      day: this.fkUtils.filtersToOrdinalNumber(this.$filter('date')(new Date(order.deliveryTimeslot.endDate), 'd')),
      time: new Date(order.deliveryTimeslot.endDate),
      group: this.$filter('date')(new Date(order.deliveryTimeslot.endDate), 'MMMM yyyy'),
      endDate: order.deliveryTimeslot.endDate,
      id: order.id
    }));
    if (pastOrdersMenuEntries.length !== this.pastOrdersCount) {
      if (this.pastOrdersMenu[0].endDate < pastOrdersMenuEntries[0].endDate) {
        this.createPastOrdersMenuGroups(new Date(pastOrdersMenuEntries[0].endDate));
      }
      this.pastOrdersMenu.forEach(item => item.entries.splice(0));
      pastOrdersMenuEntries.forEach(item => {
        if (this.orderIndex[item.group]) {
          this.orderIndex[item.group].push(item);
        }
      });
      this.pastOrdersCount = pastOrdersMenuEntries.length;
    }
    return pastOrdersMenuEntries;
  }

  getPastOrders() {
    this.pastOrdersIsLoading = true;
    return this.fkHttp({
      spinner: 'get-order',
      method: 'GET',
      url: this.fkUtils.replaceURLParams(this.API.getPastOrders, {
        username: this.fkUserService.user && this.fkUserService.user.username || "username"
      })
    }).then(response => {
      this.pastOrdersIsLoading = false;
      return response.data;
    }).catch(error => {
      this.$log.error(error);
      return {
        errors: {
          CLIENT_ERROR: error
        }
      };
    });
  }

  loadOrderRaw(orderNumber) {
    return this.fkHttp({
      spinner: 'get-order',
      method: 'GET',
      url: this.fkUtils.replaceURLParams(this.API.reviewOrder, {
        username: this.fkUserService.user && this.fkUserService.user.username || "username",
        order: orderNumber
      })
    }).then(response => response.data)
      .catch(error => {
        this.$log.error(error);
        return {errors: {CLIENT_ERROR: error}};
      });
  }

    getCreditedOrders() {
    return this.fkHttp({
      spinner: 'get-order',
      method: 'POST',
      url: this.fkUtils.replaceURLParams(this.API.getCreditedOrders, {
        username: this.fkUserService.user && this.fkUserService.user.username || "username"
      })
    }).then(response => {
      return response.data;
    }).catch(error => {
      this.$log.error(error);
      return {
        errors: {
          CLIENT_ERROR: error
        }
      };
    });
  }

  loadOrder(orderNumber) {
    return this.loadOrderRaw(orderNumber)
      .then(data => {
        let address = data.deliveryAddress;
        let reservationDate = new Date(data.reservationDate);
        this.order.orderData = data;
        this.order.orderId = orderNumber;
        this.order.address = address;
        this.order.payment= data.paymentMethod;
        this.order.phone = this.order.address.contactPhoneNumber.phone;
        this.order.total = data.cartDetail.estimatedTotal;
        this.order.deliveryPassCart = data.cartDetail.deliveryPassCartOnly;
        this.order.dpInRegularCart = data.cartDetail.dlvPassCharge;
        this.order.estimatedPrice = data.cartDetail.estimatedPrice;
        this.order.time = this.fkUtils.generateDate(data.reservationDate, data.reservationTimeRange);
        this.order.cartInfo = this.fkCartUtilsService.flattenCart(data.cartDetail);
        this.order.mapUrl = '//maps.googleapis.com/maps/api/staticmap?center=' + address.city + ',' + address.state + ',' + address.street1 + '&zoom=14&size=440x260&markers=color:red%7C' + address.city + ',' + address.state + ',' + address.street1 + '&type=roadmap&key=' + this.MAPS_API_KEY;
        this.order.products = [].concat.apply([], this.order.cartInfo.affiliates.map((affiliate) => affiliate.lineItems)).filter(li => li.productConfiguration && li.productConfiguration.productPotato && li.productConfiguration.productPotato.productData && !li.dlvPassProduct).map((lineItem) => {
          return {
            productData: lineItem.productConfiguration.productPotato.productData,
            quantity: lineItem.productConfiguration.quantity,
            lineItemTotal: lineItem.price
          };
        });
        this.order.date = reservationDate;
        this.order.reservationDate = this.$filter('date')(reservationDate, 'EEEE') + ', ' + this.fkUtils.filtersToOrdinalNumber(this.$filter('date')(reservationDate, 'd'));
        this.order.reservationTime = data.reservationTimeRange;
        this.order.group = this.$filter('date')(reservationDate, 'MMMM yyyy');
        this.order.modifiable = data.modifiable;
        this.order.details = {
          orderId: orderNumber,
          total: data.cartDetail.estimatedTotal,
          deliveryStatus: data.status,
          deliveryDate: this.$filter('date')(reservationDate, 'shortDate') + ' ' + data.reservationTimeRange,
          deliveryAddress: data.deliveryAddress.street1 + ' apt ' + data.deliveryAddress.apartment + ' ' + data.deliveryAddress.city,
          deliveryAddressStreet1: data.deliveryAddress.street1,
          deliveryAddressApt: data.deliveryAddress.apartment,
          deliveryAddressCity: data.deliveryAddress.city,
          paymentMethod: data.paymentMethod.cardType + ' Ending: ' + data.paymentMethod.maskedAccountNumber.slice(-4),
          deliveryIcon: this.deliveryStatusIcons[data.status]
        };

        return this.order;
      }).catch(error => {
        this.$log.error(error);
        return {errors: {CLIENT_ERROR: error}};
      });
  }

  cancelOrder(orderID) {
    this.$rootScope.$broadcast('hide-modify-bar');
    return this.fkHttp({
      spinner: 'get-order',
      method: 'POST',
      url: this.fkUtils.replaceURLParams(this.API.orderCancellation, {
        username: this.fkUserService.user && this.fkUserService.user.username || "username",
        order: orderID
      })
    }).then(response => {
      this.$rootScope.$broadcast('fk-order-cancelled', {orderID: orderID});
      return response.data;
    }).catch(error => {
      this.$log.error(error);
      return { errors: { CLIENT_ERROR: error } };
    });
  }

  loadPastOrders() {
    if (!this.pastOrdersIsLoading) {
      this.loadingPromise = this.getPastOrders().then(newPastOrdersData => {
        if (newPastOrdersData && newPastOrdersData.orders && newPastOrdersData.orders.length > 0) {
          return this.setEntries(newPastOrdersData);
        }
        return [];
      });
    }
    return this.loadingPromise;
  }

}

FkOrderService.$inject = ['fkHttp', 'fkUtils', 'API', 'fkUserService', '$log', 'MAPS_API_KEY', '$q', '$rootScope', '$filter', 'fkCartUtilsService'];

export default FkOrderService;
