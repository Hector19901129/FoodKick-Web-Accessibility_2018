import './../../css/pastOrders.css';

class FkPastOrdersCtrl {
  constructor($rootScope, $scope, $state, $timeout, fkOrderService, fkUtils) {
    this.$rootScope = $rootScope;
    this.$scope = $scope;
    this.$state = $state;
    this.$timeout = $timeout;
    this.fkOrderService = fkOrderService;
    this.fkUtils = fkUtils;

    $scope.orderService = fkOrderService;
    $scope.pastOrderId = $state.params.orderId;

    fkOrderService.loadPastOrders().then((orders) => {
      if (!$scope.pastOrderId && orders && orders[0] && orders[0].id) {
        fkOrderService.loadOrder(orders[0].id);
        $scope.pastOrderId = orders[0].id;
      } else if (!$scope.pastOrderId) {
        $scope.noPastOrders = true;
        $scope.noPastOrdersDate = new Date();
      }
    }).then(() => {
      this.fkUtils.lazyLoadImage();
    });

    if ($scope.pastOrderId) {
      $scope.noPastOrders = false;
      fkOrderService.loadOrder($scope.pastOrderId);
    }
  }

  openPastOrderMenu() {
    this.$scope.isPastOrderDetailsOpen = false;
    if (!this.$scope.noPastOrders) {
      document.querySelector('fk-past-orders-nav').classList.toggle('closed-past-order-menu');
    }
  }

  openPastOrderDetails() {
    document.querySelector('fk-past-orders-nav').classList.add('closed-past-order-menu');
    this.$scope.isPastOrderDetailsOpen = !this.$scope.isPastOrderDetailsOpen;
  }

}

FkPastOrdersCtrl.$inject = ['$rootScope', '$scope', '$state', '$timeout', 'fkOrderService', 'fkUtils'];

export default FkPastOrdersCtrl;
