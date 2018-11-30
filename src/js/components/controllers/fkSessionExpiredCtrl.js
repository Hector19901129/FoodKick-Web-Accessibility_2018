class FkSessionExpiredCtrl {
  constructor($scope, $timeout, $state, ngDialog, fkUtils) {
    this.$scope = $scope;
    this.$timeout = $timeout;
    this.$state = $state;
    this.ngDialog = ngDialog;
    this.fkUtils = fkUtils;

    this.seDialog = null;

    $scope.closeSe = () => {
      if (this.seDialog) {
        this.seDialog.close();
      }
    };

    $scope.$on('fk-error-ERR_IDENTIFY_CARTLINE', () => {
      $state.go('home', {}, {reload: true});
      this.fkUtils.goToTop();
      $timeout(() => {
        this.showWarning();
      }, 300);
    });
  }

  showWarning() {
    if (!this.seDialog) {
      this.seDialog = this.ngDialog.open({
        templateUrl: 'templates/fkSessionExpired.html',
        appendClassName: 'fk-session-expired-warning narrow',
        showClose: false,
        scope: this.$scope,
        preCloseCallback: () => {
          this.seDialog = null;
        }
      });
      this.$scope.$emit('fk-popup-opened', {
        name: 'fkSessionExpired',
        type: 'Info Page'
      });
    }
  }

}

FkSessionExpiredCtrl.$inject = ['$scope', '$timeout', '$state', 'ngDialog', 'fkUtils'];

export default FkSessionExpiredCtrl;
