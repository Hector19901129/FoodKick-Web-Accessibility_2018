class FkModifyBarCtrl {
  constructor($rootScope, $scope, $state, fkModifiableOrders, fkOrderModifyService, fkUtils) {
    this.$rootScope = $rootScope;
    this.$scope = $scope;
    this.$state = $state;
    this.fkModifiableOrders = fkModifiableOrders;
    this.fkOrderModifyService = fkOrderModifyService;
    this.fkUtils = fkUtils;


    $scope.$watchGroup([this.modifiableCount.bind(this), this.modifyState.bind(this)], newValues => (this.show = newValues.some(item => item)) && true);

    $rootScope.$on('hide-modify-bar', () => {
      this.show = false;
    });
  }

  nextModifiableOrder() {
    this.order = this.fkModifiableOrders.getNextModifiableOrder();
    return {
      orderId: this.order.orderId,
      startDate: this.order.deliveryStartTime,
      endDate: this.order.deliveryEndTime,
      start: this.order.start,
      end: this.order.end
    };
  }

  modifiableCount() {
    return this.fkModifiableOrders.getModifiableOrderCount();
  }

  modifyState() {
    return this.fkOrderModifyService.getModifyState();
  }

  modifyOrderId() {
    let order = this.nextModifiableOrder();
    if (order) {
      return order.orderId;
    }
    return null;
  }

  remainingTime() {
    return this.fkOrderModifyService.getRemainingTime();
  }

  seeMore() {
    this.$state.go('orderhistory');
    this.fkUtils.goToTop();
  }

  modifyOrder() {
    let orderId = this.modifyOrderId();
    this.$rootScope.$broadcast('fk-hide-atp-alert');
    if (orderId) {
      this.fkOrderModifyService.modifyOrder(orderId);
    }
  }

  cancelChangesConfirm() {
    let order = this.modifyState();
    if (order && order.orderId) {
      this.$rootScope.$broadcast('fk-open-cancel-window', order.orderId);
    }
  }

}

FkModifyBarCtrl.$inject = ['$rootScope', '$scope', '$state', 'fkModifiableOrders', 'fkOrderModifyService', 'fkUtils'];

export default FkModifyBarCtrl;
