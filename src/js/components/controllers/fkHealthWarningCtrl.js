class FkHealthWarningCtrl {
  constructor($scope, ngDialog, fkHttp, API) {
    this.$scope = $scope;
    this.ngDialog = ngDialog;
    this.fkHttp = fkHttp;
    this.API = API;

    this.hwDialog = null;
    this.httpConfig = null;

    $scope.agree = () => {
      fkHttp({
        spinner: 'health-warning',
        method: 'POST',
        url: API.ackHealthWarning
      }).then(() => {
        if (this.httpConfig) {
          fkHttp(this.httpConfig);
          this.httpConfig = null;
        }
        $scope.closeHW();
      });
    };

    $scope.closeHW = () => {
      if (this.hwDialog) {
        this.hwDialog.close();
      }
    };

    $scope.$on('fk-error-ERR_HEALTH_WARNING', (ev, data) => {
      this.showWarning(data.config);
    });
  }

  showWarning(config) {
    if (!this.hwDialog) {
      this.httpConfig = config || null;
      this.hwDialog = this.ngDialog.open({
        templateUrl: 'templates/fkHealthWarning.html',
        appendClassName: 'fk-health-warning',
        showClose: false,
        scope: this.$scope,
        ariaRole: 'dialog',
        preCloseCallback: () => {
          this.hwDialog = null;
        }
      });
      this.$scope.$emit('fk-popup-opened', {
        name: 'fkHealthWarning',
        type: 'Info Page'
      });
    }
  }

}

FkHealthWarningCtrl.$inject = ['$scope', 'ngDialog', 'fkHttp', 'API'];

export default FkHealthWarningCtrl;
