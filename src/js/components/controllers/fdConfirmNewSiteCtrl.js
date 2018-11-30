class FdConfirmNewSiteCtrl {
  constructor($rootScope, $scope, ngDialog) {
    this.$rootScope = $rootScope;
    this.$scope = $scope;
    this.ngDialog = ngDialog;

    this.confirmNewSite = null;

    $scope.$on('fd-confirm-new-site', () => {
      this.showConfirmNewSite();
    });
  }

  closeDialog() {
    if (this.confirmNewSite){
        this.confirmNewSite.close();
    }
  }

  showConfirmNewSite() {
    if (!this.confirmNewSite) {
      this.confirmNewSite = this.ngDialog.open({
      templateUrl: 'templates/fdConfirmNewSite.html',
      appendClassName: 'fd-confirm-new-site narrow',
      showClose: false,
      scope: this.$scope,
      ariaRole: 'dialog',
      preCloseCallback: () => {
        this.confirmNewSite = null;
      }
      });
    }
  }
}

FdConfirmNewSiteCtrl.$inject = ['$rootScope', '$scope', 'ngDialog'];

export default FdConfirmNewSiteCtrl;
