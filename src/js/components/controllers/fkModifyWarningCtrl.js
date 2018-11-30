class FkModifyWarningCtrl {
  constructor($scope, ngDialog) {
    this.$scope = $scope;
    this.ngDialog = ngDialog;

    this.showWarningDailog = null;

    $scope.showWarning = () => {
      if (!this.showWarningDailog) {
        this.showWarningDailog = ngDialog.open({
          name: 'fkModifyWarning',
          templateUrl: 'templates/fkModifyWarning.html',
          appendClassName: 'fk-modify-warning narrow',
          showClose: false,
          preCloseCallback: () => {
            this.showWarningDailog = null;
          }
        });
        this.$scope.$emit('fk-popup-opened', {
          name: 'fkModifyWarning',
          type: 'Info Page'
        });
      }
    };

    $scope.$on('fk-modify-warning', () => {
      $scope.showWarning();
    });
  }

}

FkModifyWarningCtrl.$inject = ['$scope', 'ngDialog'];

export default FkModifyWarningCtrl;
