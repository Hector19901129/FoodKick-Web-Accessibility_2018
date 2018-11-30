class FkGlobalAlertBarCtrl {
  constructor(fkOrderService, fkModifyOrderService, $rootScope, fkCartService, $interval, fkAddressService, $filter, fkUserService) {
    this.fkOrderService = fkOrderService;
    this.fkModifyOrderService = fkModifyOrderService;
    this.$rootScope = $rootScope;
    this.fkCartService = fkCartService;
    this.$interval = $interval;
    this.fkAddressService = fkAddressService;
    this.$filter = $filter;
    this.fkUserService = fkUserService;

    this.promise = null;

    $rootScope.$on('init_delivery_state', () => {
      if (fkUserService.user) {
        this.stop();
        if (!$rootScope.showModifyAlertBarOrderNo) {
          this.getUpcomingDelivery();
        }
      }
    });

    $rootScope.$on('logoff_delivery_state', () => {
      this.stop();
      $rootScope.$broadcast('displayGlobalAlertbar', false);
    });
  }

  updateGlobalOrderTime(order) {
    let timeNow = new Date();
    let timestart = new Date(order.deliveryTimeslot.startDate);
    this.timestarthours = this.$filter('date')(timestart, 'h:mma');
    let timeend = new Date(order.deliveryTimeslot.endDate);
    this.timeendhours = this.$filter('date')(timeend, 'h:mma');
    if (timeNow.getDate() === timestart.getDate()) {
      this.timeLabel = 'TODAY';
    } else {
      this.timeLabel = 'TOMORROW';
    }
  }

  checkCuttOffHour() {
    let timeNow = new Date().getTime();
    let timeEnd = new Date(this.getPastOrders.deliveryTimeslot.cutoffDateDate).getTime();
    if (timeEnd - timeNow > 60000) {
      this.$rootScope.$broadcast('displayGlobalAlertbar', true);
    } else {
      this.$rootScope.$broadcast('displayGlobalAlertbar', false);
      this.stop();
      this.$rootScope.$broadcast('init_delivery_state');
    }
  }

  start() {
    this.stop();
    this.promise = this.$interval(() => {
      this.checkCuttOffHour();
    }, 1000);
  }

  stop() {
    this.$interval.cancel(this.promise);
  }

  startCutOffTimer() {
    this.start();
  }

  getUpcomingDelivery() {
    this.fkOrderService.getPastOrders().then((orders) => {
      let timeNowms = new Date().getTime();
      if (orders.orders && !this.$rootScope.showModifyAlertBar) {
        this.orders = orders.orders;
        for (let i = 0; i < this.orders.length; i++) {
          this.getPastOrders = this.orders[i];
          if (this.getPastOrders.deliveryTimeslot.cutoffDateDate > timeNowms && (this.getPastOrders.status === "Processing" || this.getPastOrders.status === "Submitted")) {
            this.updateGlobalOrderTime(this.getPastOrders);
            this.checkCuttOffHour();
            this.startCutOffTimer();
            break;
          } else {
            this.$rootScope.$broadcast('displayGlobalAlertbar', false);
          }
          if (i === this.orders.length) {
            this.$rootScope.$broadcast('displayGlobalAlertbar', false);
            break;
          }
        }
      }
    });
  }

  modifyOrder() {
    this.orderModifyId = this.getPastOrders.id;
    this.fkModifyOrderService.getOrderDetails(this.orderModifyId).then((response) => {
      if (response.status !== 'FAILED') {
        this.stop();
        this.$rootScope.$broadcast('logoff_delivery_state');
        this.$rootScope.$broadcast('displayGlobalAlertbar', false);
        this.$rootScope.orderDetails = response;
        this.fkModifyOrderService.orderDetails = angular.copy(response);
        this.fkModifyOrderService.setcutOffTime(response.modificationCutoffTimeMs);
        this.fkCartService.updateCart(response);
        this.fkAddressService.setDeliveryAddress(response.cartDetail.deliveryAddressId, response.deliveryAddress.type);
        this.$rootScope.$broadcast('showModifyOrderAlertbar');
      }
    });
  }
}

FkGlobalAlertBarCtrl.$inject = ['fkOrderService', 'fkModifyOrderService', '$rootScope', 'fkCartService', '$interval', 'fkAddressService', '$filter', 'fkUserService'];

export default FkGlobalAlertBarCtrl;
