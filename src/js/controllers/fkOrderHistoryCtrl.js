import './../../css/fkOrderHistory.css';

class FkOrderHistoryCtrl {
  constructor($rootScope, $scope, $state, fkOrderService, fkOrderModifyService, fkUtils) {
    this.$rootScope = $rootScope;
    this.$scope = $scope;
    this.$state = $state;
    this.fkOrderService = fkOrderService;
    this.fkOrderModifyService = fkOrderModifyService;
    this.fkUtils = fkUtils;

    $scope.deliveryStatusIcons = fkOrderService.deliveryStatusIcons;

    fkOrderService.getPastOrders().then((pastOrders) => {
      if (pastOrders && pastOrders.orders && pastOrders.totalResultCount > 0) {
        $scope.noOrderHistory = false;
        $scope.orderHistory = pastOrders.orders;
      } else {
        $scope.noOrderHistory = true;
      }
    });
  }

  modifyOrder(orderId) {
    if (this.fkOrderModifyService.getModifyState()) {
      this.$rootScope.$broadcast('fk-modify-warning');
    } else {
      this.$rootScope.$broadcast('fk-hide-atp-alert');
      this.fkOrderModifyService.modifyOrder(orderId);
    }
  }

  currentModifiedOrder() {
    let modifyState = this.fkOrderModifyService.getModifyState();
    if (modifyState) {
      return modifyState.orderId;
    }
    return null;
  }

  shopFromOrder(orderId) {
    this.$state.go('pastorders', {orderId: orderId});
    this.fkUtils.goToTop();
  }

}

FkOrderHistoryCtrl.$inject = ['$rootScope', '$scope', '$state', 'fkOrderService', 'fkOrderModifyService', 'fkUtils'];

export default FkOrderHistoryCtrl;
