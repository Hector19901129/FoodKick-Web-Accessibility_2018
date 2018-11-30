class FkOrderModifyService {
  constructor(fkHttp, fkUtils, API, fkOrderService, $log, fkCartUtilsService, fkAddressService, $interval, $rootScope, $q) {
    this.fkHttp = fkHttp;
    this.fkUtils = fkUtils;
    this.API = API;
    this.fkOrderService = fkOrderService;
    this.$log = $log;
    this.fkCartUtilsService = fkCartUtilsService;
    this.fkAddressService = fkAddressService;
    this.$interval = $interval;
    this.$rootScope = $rootScope;
    this.$q = $q;

    this._modifyState = null;

    this.$interval(() => this.cutoffCheck(), 1000);

    this.$rootScope.$on('fk-user-change', (ev, data) => {
      if (!data.user) {
        this.cancelModifyState();
      }
    });
  }

  getModifyState() {
    return this._modifyState;
  }

  getRemainingTime() {
    return this._modifyState && this._modifyState.modificationCutoffDate ? Math.max(this._modifyState.modificationCutoffDate - Date.now(), 0) : 0;
  }

  setModifyState(newState) {
    if (newState && !newState.modificationCutoffDate) {
      newState.modificationCutoffDate = newState.modificationCutoffTimeMs;
    }

    if (newState && !newState.orderId) {
      newState.orderId = newState.cartDetail.orderNumber;
    }

    if (newState && newState.cartDetail && newState.orderId) {
      this._modifyState = newState;
    }

    if (!newState) {
      this._modifyState = newState;
    }

    return this._modifyState;
  }

  enableModifyState(order) {
    return this.setModifyState(order);
  }

  cancelModifyState() {
    return this.setModifyState(null);
  }

  loadModifiedOrder(orderId) {
    if (!this._modifyState || this._modifyState.orderId !== orderId) {
      this.fkOrderService.loadOrderRaw(orderId).then(order => {
        if (!order.orderId) {
          order.orderId = orderId;
        }
        this.enableModifyState(order);
      });
    }
  }

  modifyOrder(orderId) {
    return this.fkHttp({
      spinner: 'modify-spinner',
      method: 'GET',
      url: this.fkUtils.replaceURLParams(this.API.modifyOrder, {
        username: "username",
        order: orderId
      })
    }).then(response => response.data)
      .then(order => this.enableModifyState(order))
      .then(order => {
        if (order) {
          this.fkAddressService.setDeliveryAddress(order.cartDetail.deliveryAddressId, order.deliveryAddress.type);
        }
        return order;
      })
      .then(() => this.fkOrderService.loadOrderRaw(orderId))
      .then(order => this.$rootScope.$broadcast('fk-open-cart', order))
      .catch(error => {
        this.$log.error(error);
        return {errors: {CLIENT_ERROR: error}};
      });
  }

  cancelOrderModify(cancelCartLoad) {
    this.cancelModifyState();

    return this.fkHttp({
      spinner: 'modify-spinner',
      method: 'GET',
      url: this.fkUtils.replaceURLParams(this.API.cancelOrderModify, {
        username: "username"
      })
    }).then(response => response.data)
      .then(() => !cancelCartLoad ? this.fkCartUtilsService.viewCartlines() : this.$q.resolve())
      .catch(error => {
        this.$log.error(error);
        return {errors: {CLIENT_ERROR: error}};
      });
  }

  cutoffCheck() {
    if (this._modifyState && this._modifyState.modificationCutoffDate < Date.now()) {
      this.cancelOrderModify();
      this.$rootScope.$broadcast('fk-close-cart');
      this.$rootScope.$broadcast('fk-order-modify-timeup');
    }
  }

}

FkOrderModifyService.$inject = ['fkHttp', 'fkUtils', 'API', 'fkOrderService', '$log', 'fkCartUtilsService', 'fkAddressService', '$interval', '$rootScope', '$q'];

export default FkOrderModifyService;
