class FkCancelModifyChangesCtrl {
  constructor($scope, fkOrderModifyService, ngDialog) {
    this.$scope = $scope;
    this.fkOrderModifyService = fkOrderModifyService;
    this.ngDialog = ngDialog;

    this.cancelModifyDialog = null;

    $scope.$on('fk-open-cancel-window', (e, orderId) => {
      $scope.orderId = orderId;
      this.cancelOrder();
    });

    $scope.cancelModifyChngs = () => {
      if ($scope.orderId) {
        fkOrderModifyService.cancelOrderModify().then(() => this.cancelModifyDialog.close());
      }
    };

    $scope.keepShp = () => {
      this.cancelModifyDialog.close();
    };
  }

  cancelOrder() {
    if (!this.cancelModifyDialog) {
      this.cancelModifyDialog = this.ngDialog.open({
        templateUrl: 'templates/fkCancelModifyChanges.html',
        appendClassName: 'fk-cancel-modify narrow',
        showClose: false,
        scope: this.$scope,
        preCloseCallback: () => {
          this.cancelModifyDialog = null;
        }
      });
      this.$scope.$emit('fk-popup-opened', {
        name: 'fkCancelModifyChanges',
        type: 'Info Page'
      });
    }
  }

}

FkCancelModifyChangesCtrl.$inject = ['$scope', 'fkOrderModifyService', 'ngDialog'];

export default FkCancelModifyChangesCtrl;
