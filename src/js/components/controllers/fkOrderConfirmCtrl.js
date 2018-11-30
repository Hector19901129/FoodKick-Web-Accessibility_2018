class FkOrderConfirmCtrl {
  constructor($rootScope, $scope, fkOrderService, fkBoldChatService, fkOrderModifyService, fkModifiableOrders, ngDialog) {
    this.$rootScope = $rootScope;
    this.$scope = $scope;
    this.fkOrderService = fkOrderService;
    this.fkBoldChatService = fkBoldChatService;
    this.fkOrderModifyService = fkOrderModifyService;
    this.fkModifiableOrders = fkModifiableOrders;
    this.ngDialog = ngDialog;

    $scope.orderService = fkOrderService;

    this.orderConfirmDailog = null;
    this.orderNumber = '';

    $rootScope.$on('fk-order-confirm', (e, data) => {
      this.orderNumber = data.orderNumber;
      $scope.orderFromModifyOrder = data.wasModify;
      this.loadOrder();
    });

    $scope.isThisOrderModifiable = () => {
      return fkOrderService.order.modifiable || fkModifiableOrders.hasOrder(this.orderNumber);
    };

    $scope.modifyOrder = () => {
      this.closeDialog();
      fkOrderModifyService.modifyOrder(this.orderNumber);
    };

    $scope.triggerChat = () => {
      fkBoldChatService.triggerChat();
    };
  }

  loadOrder() {
    this.fkOrderService.loadOrder(this.orderNumber);
    this.$scope.$emit('fk-order-confirm-popup', {orderNumber: this.orderNumber});

    if (!this.orderConfirmDailog) {
      this.orderConfirmDailog = this.ngDialog.open({
        templateUrl: 'templates/fkOrderConfirm.html',
        appendClassName: 'fk-order-confirm narrow',
        showClose: false,
        ariaRole: 'dialog',
        scope: this.$scope,
        preCloseCallback: () => {
          this.orderConfirmDailog = null;
        }
      });
    }
  }

  closeDialog() {
    if (this.orderConfirmDailog) {
      this.orderConfirmDailog.close();
    }
  }

}

FkOrderConfirmCtrl.$inject = ['$rootScope', '$scope', 'fkOrderService', 'fkBoldChatService', 'fkOrderModifyService', 'fkModifiableOrders', 'ngDialog'];

export default FkOrderConfirmCtrl;
