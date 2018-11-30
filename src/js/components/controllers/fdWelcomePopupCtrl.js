class FdWelcomePopupCtrl {
  constructor($rootScope, $scope, ngDialog) {
    this.$rootScope = $rootScope;
    this.$scope = $scope;
    this.ngDialog = ngDialog;

    this.welcomePopup = null;
    this.confirmNewSite = null;

    $scope.$on('fd-welcome-popup-open', () => {
      this.showWelcomePopup();
    });
  }

  closeDialog() {
    if (this.welcomePopup){
        this.welcomePopup.close();
      }
  }

  showWelcomePopup() {
    if (!this.welcomePopup) {
      this.welcomePopup = this.ngDialog.open({
      templateUrl: 'templates/fdWelcomePopup.html',
      appendClassName: 'fd-welcome-popup narrow',
      showClose: false,
      scope: this.$scope,
      ariaRole: 'dialog',
      preCloseCallback: () => {
        this.welcomePopup = null;
      }
      });
    }
  }

  stay() {
    this.$rootScope.$broadcast('fd-confirm-new-site');
    this.closeDialog();
    // ne mutassa többet
  }

}

FdWelcomePopupCtrl.$inject = ['$rootScope', '$scope', 'ngDialog'];

export default FdWelcomePopupCtrl;
