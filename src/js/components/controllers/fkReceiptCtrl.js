class FkReceiptCtrl {
  constructor($rootScope, fkReceiptService, fkOrderModifyService) {
    this.$rootScope = $rootScope;
    this.fkReceiptService = fkReceiptService;
    this.fkOrderModifyService = fkOrderModifyService;

    this.$postLink = () => {
      fkReceiptService.getReceiptData(this.orderId).then((order) => {
        this.order = order;
      });
    };

    this.modifyStateOrderId = fkOrderModifyService.getModifyState();
  }

  modifyState() {
    return this.fkOrderModifyService.getModifyState();
  }

  cancelOrder() {
    if (this.modifyStateOrderId && this.modifyStateOrderId.orderId !== this.order.deliveryDetails.number) {
      this.$rootScope.$broadcast('fk-modify-warning');
    } else {
      this.$rootScope.$broadcast('fk-order-cancel-warning', { orderNo: this.order.deliveryDetails.number });
    }
  }

}

FkReceiptCtrl.$inject = ['$rootScope', 'fkReceiptService', 'fkOrderModifyService'];

export default FkReceiptCtrl;
