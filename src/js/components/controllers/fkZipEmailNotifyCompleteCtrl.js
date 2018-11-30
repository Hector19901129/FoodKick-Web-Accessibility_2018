class FkZipEmailNotifyCompleteCtrl {
  constructor($rootScope, $scope, $state, $window, ngDialog, fkUtils) {
    this.$rootScope = $rootScope;
    this.$scope = $scope;
    this.$state = $state;
    this.$window = $window;
    this.ngDialog = ngDialog;
    this.fkUtils = fkUtils;

    this.zipCheckDialog = null;

    $scope.visitPage = () => {
      $window.open("//freshdirect.com/index.jsp");
    };

    $scope.browseStore = () => {
      if (!this.zipCheckDialog) {
        this.zipCheckDialog = ngDialog.open({
          templateUrl: 'templates/fkZipEmailNotifyComplete.html',
          appendClassName: 'fk-zip-notify-complete narrow',
          showClose: false,
          scope: $scope,
          ariaRole: 'dialog',
          preCloseCallback: () => {
            this.zipCheckDialog = null;
          }
        });
        this.$scope.$emit('fk-popup-opened', {
          name: 'fkZipEmailNotifyComplete',
          type: 'Info Page'
        });
      }
    };

    $scope.goToHome = () => {
      this.closeDialog();
      $state.go('home', {}, {reload: true});
      this.fkUtils.goToTop();
    };

    $scope.checkAnotherZip = () => {
      this.closeDialog();
      $rootScope.$broadcast('fk-error-ERR_ZIP_REQUIRED', { ev: '', data: {} });
    };

    $scope.$on('showEmailNotifyComplete', () => {
      $scope.browseStore();
    });
  }

  closeDialog() {
    this.zipCheckDialog.close();
  }

  signIn() {
    this.closeDialog();
    this.$rootScope.$broadcast('fk-account-signIn', {});
  }

  signUp() {
    this.closeDialog();
    this.$rootScope.$broadcast('fk-account-signUp', {});
  }

}

FkZipEmailNotifyCompleteCtrl.$inject = ['$rootScope', '$scope', '$state', '$window', 'ngDialog', 'fkUtils'];

export default FkZipEmailNotifyCompleteCtrl;
