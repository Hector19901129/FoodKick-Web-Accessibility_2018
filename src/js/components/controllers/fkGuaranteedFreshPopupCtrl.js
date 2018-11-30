class FkGuaranteedFreshPopupCtrl {
  constructor($rootScope, ngDialog) {
    this.$rootScope = $rootScope;
    this.ngDialog = ngDialog;
    this.dialog = null;

    $rootScope.$on('open-guaranteed-fresh-popup', () => {
      this.dialog = ngDialog.open({
        templateUrl: 'templates/fkGuaranteedFreshPopup.html',
        appendClassName: 'fk-guaranteed-fresh-popup narrow',
        showClose: false,
        ariaRole: 'dialog',
        preCloseCallback: () => {
          this.dialog = null;
        }
      });
      this.$scope.$emit('fk-popup-opened', {
        name: 'fkGuaranteedFreshPopup',
        type: 'Info Page'
      });
    });
  }
}

FkGuaranteedFreshPopupCtrl.$inject = ['$rootScope', 'ngDialog'];

export default FkGuaranteedFreshPopupCtrl;
