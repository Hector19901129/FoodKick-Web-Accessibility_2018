class FkPlantIdChangeCtrl {
  constructor($scope, $timeout, $state, ngDialog, fkUtils, $location) {
    this.$scope = $scope;
    this.$timeout = $timeout;
    this.$state = $state;
    this.ngDialog = ngDialog;
    this.fkUtils = fkUtils;
    this.$location = $location;
    this.isException = this.$location.$$path !== '/deliverypass';
    this.piDialog = null;

    $scope.$on('fk-plantid-change', (ev, data) => {
      if (data && data.plantId && data.oldPlantId && this.isException) {
        if (this.$state.current.name !== 'feed') {
          $state.go('home', {}, {reload: true});
        }
        this.fkUtils.goToTop();
        $timeout(() => {
          this.showWarning();
        }, 300);
      }
    });
  }

  showWarning() {
    if (!this.piDialog) {
      this.piDialog = this.ngDialog.open({
        templateUrl: 'templates/fkPlantIdChange.html',
        appendClassName: 'fk-plantid-change-warning narrow',
        showClose: false,
        scope: this.$scope,
        preCloseCallback: () => {
          this.piDialog = null;
        }
      });
      this.$scope.$emit('fk-popup-opened', {
        name: 'fkPlantIdChange',
        type: 'Info Page'
      });
    }
  }

}

FkPlantIdChangeCtrl.$inject = ['$scope', '$timeout', '$state', 'ngDialog', 'fkUtils', '$location'];

export default FkPlantIdChangeCtrl;
