class FkZipCheckCtrl {
  constructor($rootScope, $scope, fkUserService, ngDialog) {
    this.$rootScope = $rootScope;
    this.$scope = $scope;
    this.fkUserService = fkUserService;
    this.ngDialog = ngDialog;

    this.zipCheckDialog = null;

    $scope.$on('fk-error-ERR_ZIP_REQUIRED', (ev, data) => {
      this.showZipCheck(data.config);
    });

    $scope.$on('fk-zip-code-unavailable', () => {
      this.closeDialog();
      $rootScope.$broadcast('fk-zip-check-done-success');
    });

    $scope.$on('fk-zip-check-done', () => {
      this.closeDialog();
    });
  }

  closeDialogWithX() {
    this.closeDialog();
    this.$scope.$emit('fk-zip-popup-closed-with-x');
  }

  closeDialog() {
    if (this.zipCheckDialog) {
      this.zipCheckDialog.close();
    }
  }

  showZipCheck() {
    if (!this.zipCheckDialog) {
      this.zipCheckDialog = this.ngDialog.open({
        templateUrl: 'templates/fkZipCheck.html',
        appendClassName: 'fk-zip-check narrow',
        showClose: false,
        scope: this.$scope,
        ariaRole: 'dialog',
        preCloseCallback: () => {
          this.zipCheckDialog = null;
        }
      });
      this.$scope.$emit('fk-zip-popup-opened');
    }
  }

  signIn() {
    this.closeDialog();
    this.$rootScope.$broadcast( 'fk-account-signIn', {} );
  }

  signUp() {
    this.closeDialog();
    this.$rootScope.$broadcast( 'fk-account-signUp', {} );
  }

  isUser() {
    return this.fkUserService.user && this.fkUserService.user.fdUserId ? true : false;
  }

}

FkZipCheckCtrl.$inject = ['$rootScope', '$scope', 'fkUserService', 'ngDialog'];

export default FkZipCheckCtrl;
