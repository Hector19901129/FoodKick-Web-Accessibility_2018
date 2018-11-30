class FkModificationTimeCompleteCtrl {
  constructor($rootScope, $scope, ngDialog) {
    this.$rootScope = $rootScope;
    this.$scope = $scope;
    this.ngDialog = ngDialog;

    this.cancelModifyDialog = null;

    $scope.$on('fk-order-modify-timeup', () => {
      this.modifyTimeup();
    });

    $scope.continue = () => {
      this.closeDialog();
    };
  }

  closeDialog() {
    this.cancelModifyDialog.close();
  }

  modifyTimeup() {
    if (!this.cancelModifyDialog) {
      this.cancelModifyDialog = this.ngDialog.open({
        templateUrl: 'templates/fkModificationTimeComplete.html',
        appendClassName: 'fk-modify-timeup narrow',
        showClose: false,
        scope: this.$scope,
        preCloseCallback: () => {
          this.cancelModifyDialog = null;
        }
      });
      this.$scope.$emit('fk-popup-opened', {
        name: 'fkModificationTimeComplete',
        type: 'Info Page'
      });
    }
  }

}

FkModificationTimeCompleteCtrl.$inject = ['$rootScope', '$scope', 'ngDialog'];

export default FkModificationTimeCompleteCtrl;
