class FkFreshFactorHelpCtrl {
  constructor($rootScope, ngDialog) {
    this.$rootScope = $rootScope;
    this.ngDialog = ngDialog;

    $rootScope.$on('fk-open-fresh-factor-help', () => {
      this.openFreshFactorHelp();
    });
  }

  openFreshFactorHelp() {
    this.ngDialog.open({
      templateUrl: 'templates/fkFreshFactorHelp.html',
      appendClassName: 'fk-fresh-factor narrow',
      showClose: false,
      ariaRole: 'dialog'
    });
    this.$rootScope.$emit('fk-popup-opened', {
      name: 'fkFreshFactorHelp',
      type: 'Info Page'
    });
  }

}

FkFreshFactorHelpCtrl.$inject = ['$rootScope', 'ngDialog'];

export default FkFreshFactorHelpCtrl;
