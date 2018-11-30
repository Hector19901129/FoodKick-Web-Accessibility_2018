class FkOrderCancellationWarningCtrl {
  constructor($rootScope, $scope, fkCartService, fkOrderService, fkOrderModifyService, ngDialog, fkModifiableOrders) {
    this.$rootScope = $rootScope;
    this.$scope = $scope;
    this.fkCartService = fkCartService;
    this.fkOrderService = fkOrderService;
    this.fkOrderModifyService = fkOrderModifyService;
    this.ngDialog = ngDialog;
    this.fkModifiableOrders = fkModifiableOrders;

    this.orderCancelDialog = null;

    $scope.$on('fk-order-cancel-warning', (ev, data) => {
      $scope.cancelOrderNo = data.orderNo;
      this.cancelOrder();
    });

    $scope.modifyState = () => fkOrderModifyService.getModifyState();

    $scope.initCancellation = () => {
      this.closeDialog();
      let order = $scope.modifyState();
      if (order && order.orderId) {
         fkOrderModifyService.cancelOrderModify().then(() => {
           fkOrderService.cancelOrder($scope.cancelOrderNo).then(response => {
            if (response.status === 'SUCCESS') {
              $rootScope.$broadcast('fk-close-receipt');
              fkCartService.clearCart();
              $rootScope.$broadcast('fk-open-cancel-confirmation');
            }
          });
        });
         return;
      }
      fkOrderService.cancelOrder($scope.cancelOrderNo).then(response => {
        if (response.status === 'SUCCESS') {
          this.fkModifiableOrders.checkModifiableOrders(10000);
          $rootScope.$broadcast('fk-close-receipt');
          fkCartService.clearCart();
          $rootScope.$broadcast('fk-open-cancel-confirmation');
        }
      });
    };

    $scope.ignoreCancellation = () => {
      this.closeDialog();
    };
  }

  closeDialog() {
    this.orderCancelDialog.close();
  }

  cancelOrder() {
    if (!this.orderCancelDialog) {
      this.orderCancelDialog = this.ngDialog.open({
        templateUrl: 'templates/fkOrderCancellationWarning.html',
        appendClassName: 'fk-order-cancellation-warning narrow',
        showClose: false,
        scope: this.$scope,
        preCloseCallback: () => {
          this.orderCancelDialog = null;
        }
      });
      this.$scope.$emit('fk-popup-opened', {
        name: 'fkOrderCancellationWarning',
        type: 'Info Page'
      });
    }
  }

}

FkOrderCancellationWarningCtrl.$inject = ['$rootScope', '$scope', 'fkCartService', 'fkOrderService', 'fkOrderModifyService', 'ngDialog', 'fkModifiableOrders'];

export default FkOrderCancellationWarningCtrl;
