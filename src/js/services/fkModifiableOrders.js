class FkModifiableOrders {
  constructor(fkHttp, fkUtils, API, fkUserService, $interval, $rootScope, $timeout) {
    this.fkHttp = fkHttp;
    this.fkUtils = fkUtils;
    this.API = API;
    this.fkUserService = fkUserService;
    this.$interval = $interval;
    this.$rootScope = $rootScope;
    this.$timeout = $timeout;
    this._modifiableOrderCount = 0;
    this._nextModifiableOrder = null;
    this.atpRecommendationCount = 0;
    this.atpRecommendation = null;
    this._checking = false;
    this._orders = [];

    this.$interval(() => { this.refreshIfNeeded(); }, 1000);

    this.$rootScope.$on('fk-user-change', (ev, data) => {
      this.setNextModifiableOrder(null);
      if (data.user) {
        this.checkModifiableOrders(100);
        this.getAtpRecommendations(10);
      } else {
        this.reset();
      }
    });

    this.$rootScope.$on('fk-checkout', () => {
      this.checkModifiableOrders(500);
      this.checkModifiableOrders(5000);
    });

    this.reset();
  }

  reset() {
    this._modifiableOrderCount = 0;
    this.setNextModifiableOrder(null);
    this.atpRecommendationCount = 0;
    this.atpRecommendation = null;
    this._checking = false;
    this._orders = [];
  }

  hasOrder(orderNumber) {
    return this._orders.some(order => orderNumber === order.orderId);
  }

  getModifiableOrderCount() {
    return this._modifiableOrderCount;
  }

  getNextModifiableOrder() {
    return this._nextModifiableOrder;
  }

  setNextModifiableOrder(order) {
    return (this._nextModifiableOrder = order) && order;
  }

  overCutoffTime() {
    return this._nextModifiableOrder && this._nextModifiableOrder.modificationCutoffTime && this._nextModifiableOrder.modificationCutoffTime - Date.now();
  }

  getAtpUnavaRecommendation() {
    return this.atpRecommendation;
  }

  getAtpRecommendationCount() {
    return this.atpRecommendationCount;
  }

  checkModifiableOrders(delay) {
    this._checking = true;
    delay = delay || 100;
    this.$timeout(() => this.fkUserService.user ? this.fkHttp({
        method: 'POST',
        url: this.fkUtils.replaceURLParams(this.API.getModifiableOrders, {
          username: this.fkUserService.user && this.fkUserService.user.username || "username"
        })
      }).then(response => response.data.modifiedOrders || [])
        .then(orders => {
          this._modifiableOrderCount = orders.length;
          this.setNextModifiableOrder(orders.sort((a, b) => a - b)[0]);
          this._checking = false;
          this._orders = orders;

          return orders;
        }) : true, delay);
  }

  getAtpRecommendations(delay) {
    return this.$timeout(() => this.fkUserService.user ? this.fkHttp({
      method: 'GET',
      url: this.API.getAtpDetails
    }).then(response => {
    if (response.data && response.data.unavailability.replaceableLines) {
      this.atpRecommendation = response.data.unavailability.replaceableLines;
      this.atpRecommendationCount = this.atpRecommendation.length;
      this.$rootScope.$broadcast('fk-atp-unavailableData', {unavaialabilityData: this.atpRecommendation});
    }
    return response.data;
    }).catch(error => {
      //this.$log.error(error);
      return { errors: error };
    }) : true, delay);
  }

  refreshIfNeeded() {
    let overCutoff = this.overCutoffTime();
    if (!this._checking && overCutoff && overCutoff < 60000) {
     this.checkModifiableOrders(overCutoff + 2000);
    }
  }

}

FkModifiableOrders.$inject = ['fkHttp', 'fkUtils', 'API', 'fkUserService', '$interval', '$rootScope', '$timeout'];

export default FkModifiableOrders;
