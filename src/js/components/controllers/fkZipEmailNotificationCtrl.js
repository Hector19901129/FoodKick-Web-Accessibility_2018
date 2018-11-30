class FkZipEmailNotificationCtrl {
  constructor($rootScope, $scope, ngDialog) {
    this.$rootScope = $rootScope;
    this.$scope = $scope;
    this.ngDialog = ngDialog;

    this.zipCheckDialog = null;

    $scope.$on('emailZipRegistrationDone', () => {
      this.closeDialog();
      $rootScope.$broadcast('showEmailNotifyComplete');
    });

    $scope.$on('fk-zip-check-done-success', () => {
      this.notifyMe();
    });

    $scope.checkAnotherZip = () => {
      this.closeDialog();
      $rootScope.$broadcast('fk-error-ERR_ZIP_REQUIRED', { ev: '', data: {} });

    };
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

  notifyMe() {
    if (!this.zipCheckDialog) {
      this.zipCheckDialog = this.ngDialog.open({
        templateUrl: 'templates/fkZipEmailNotification.html',
        appendClassName: 'fk-zip-emailnotification narrow',
        showClose: false,
        scope: this.$scope,
        ariaRole: 'dialog',
        preCloseCallback: () => {
          this.zipCheckDialog = null;
        }
      });
      this.$scope.$emit('fk-popup-opened', {
        name: 'fkZipEmailNotification',
        type: 'Info Page'
      });
    }
  }

}

FkZipEmailNotificationCtrl.$inject = ['$rootScope', '$scope', 'ngDialog'];

export default FkZipEmailNotificationCtrl;
