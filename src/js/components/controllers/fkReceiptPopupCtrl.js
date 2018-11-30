class FkReceiptPopupCtrl {
  constructor($rootScope, ngDialog) {
    this.$rootScope = $rootScope;
    this.ngDialog = ngDialog;

    this.dialog = null;

    $rootScope.$on('fk-close-receipt', () => {
      this.dialog.close();
    });

    this.$rootScope.$on('fk-open-receipt-popup', (ev, data) => {
      this.dialog = ngDialog.open({
        templateUrl: 'templates/fkReceiptPopup.html',
        appendClassName: 'fk-receipt-popup',
        showClose: false,
        ariaRole: 'dialog',
        data: {
          orderId: data.orderId
        }
      });
      $rootScope.$emit('fk-popup-opened', {
        name: 'fkReceiptPopup',
        type: 'Receipt Page'
      });
    });
  }
}

FkReceiptPopupCtrl.$inject = ['$rootScope', 'ngDialog'];

export default FkReceiptPopupCtrl;
