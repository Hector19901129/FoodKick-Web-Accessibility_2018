class FkReceiptButtonCtrl {
  constructor($rootScope) {
    this.$rootScope = $rootScope;
  }

  openReceipt() {
    this.$rootScope.$broadcast('fk-open-receipt-popup', {orderId: this.order});
    this.onclicked();
  }
}

FkReceiptButtonCtrl.$inject = ['$rootScope'];

export default FkReceiptButtonCtrl;
