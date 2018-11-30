class FkOrderCancelConfirmationCtrl {
  constructor($rootScope, $scope, $state, fkOrderService, ngDialog, fkUtils) {
    this.$rootScope = $rootScope;
    this.$scope = $scope;
    this.$state = $state;
    this.fkOrderService = fkOrderService;
    this.ngDialog = ngDialog;
    this.fkUtils = fkUtils;

    $scope.orderService = fkOrderService;

    this.orderConfirmDailog = null;

    $scope.openConfirmation = () => {
      if (!this.orderConfirmDailog) {
        this.orderConfirmDailog = ngDialog.open({
          templateUrl: 'templates/fkOrderCancelConfirmation.html',
          appendClassName: 'fk-order-cancellation narrow',
          showClose: false,
          scope: $scope,
          preCloseCallback: () => {
            this.orderConfirmDailog = null;
          }
        });
      }
    };

    $scope.$on('fk-open-cancel-confirmation', () => {
      $scope.openConfirmation();
    });

    $rootScope.$broadcast('fk-close-receipt');
  }

  goHome () {
    this.$state.go('home');
    this.fkUtils.goToTop();
  }

  goToHistory () {
    this.$state.go('orderhistory', {}, { reload: true });
  }

}

FkOrderCancelConfirmationCtrl.$inject = ['$rootScope', '$scope', '$state', 'fkOrderService', 'ngDialog', 'fkUtils'];

export default FkOrderCancelConfirmationCtrl;
