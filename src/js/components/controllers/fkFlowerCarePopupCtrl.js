class FkFlowerCarePopupCtrl {
  constructor($rootScope, ngDialog) {
    this.$rootScope = $rootScope;
    this.ngDialog = ngDialog;

    this.dialog = null;

    $rootScope.$on('fk-open-flower-care-popup', () => {
      this.dialog = ngDialog.open({
        templateUrl: 'templates/fkFlowerCarePopup.html',
        appendClassName: 'fk-flower-care-popup narrow',
        showClose: false,
        ariaRole: 'dialog',
        preCloseCallback: () => {
          this.dialog = null;
        }
      });

      this.$rootScope.$emit('fk-popup-opened', {
        name: 'fkFlowerCarePopup',
        type: 'Info Page'
      });
    });

  }
}

FkFlowerCarePopupCtrl.$inject = ['$rootScope', 'ngDialog'];

export default FkFlowerCarePopupCtrl;
