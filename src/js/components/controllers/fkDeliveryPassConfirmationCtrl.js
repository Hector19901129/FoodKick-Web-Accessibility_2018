class FkDeliveryPassConfirmationCtrl {
  constructor($rootScope, ngDialog, $state, fkUtils, $scope, $location, fkDeliveryPassService) {
    this.$rootScope = $rootScope;
    this.ngDialog = ngDialog;
    this.$state = $state;
    this.$scope = $scope;
    this.fkUtils = fkUtils;
    this.$location = $location;
    this.fkDeliveryPassService = fkDeliveryPassService;
    this.dialog = null;

    $rootScope.$on('delivery-pass-confirmation', (e, data) => {
      $scope.dpConfirmDetails = data.cartDetail;
      this.dialog = ngDialog.open({
        templateUrl: 'templates/fkDeliveryPassConfirmation.html',
        appendClassName: 'fk-delivery-pass-confirm narrow',
        showClose: false,
        ariaRole: 'dialog',
        scope: $scope,
        preCloseCallback: () => {
          this.dialog = null;
        }
      });
    });

    $rootScope.$on('delivery-pass-failure', (e, data) => {
      $scope.failure = data.error;
      this.dialog = ngDialog.open({
        templateUrl: 'templates/fkDpPurchaseFailure.html',
        appendClassName: 'fk-delivery-pass-confirm narrow',
        showClose: false,
        ariaRole: 'dialog',
        scope: $scope,
        preCloseCallback: () => {
          this.dialog = null;
        }
      });
    });
  }

  startShopping() {
    if (this.dialog) {
      this.dialog.close();
    }
    this.$state.go('home');
    this.fkUtils.goToTop();
  }

  deliverySettings() {
    if (this.dialog) {
      this.dialog.close();
    }

    if (this.$location.$$path !== '/deliverypass') {
      this.fkDeliveryPassService.getDpSettingsInfo();
    }

    this.$state.go('account.detail', { partial: 'deliveryPass' });
    this.fkUtils.goToTop();
  }

}

FkDeliveryPassConfirmationCtrl.$inject = ['$rootScope', 'ngDialog', '$state', 'fkUtils', '$scope', '$location', 'fkDeliveryPassService'];

export default FkDeliveryPassConfirmationCtrl;
