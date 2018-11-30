class FkMobileNumberController {
  constructor($rootScope, $scope, ngDialog) {
    this.mobileNumberDialog = null;
    this.ngDialog = ngDialog;
    this.$scope = $scope;

    $rootScope.$on('fk-delivery-address-refreshed', (ev, data) => {
      if (!this.mobileNumberDialog && data && data.changedPhoneNumber) {
        this.mobileNumberDialog = this.ngDialog.open({
          templateUrl: 'templates/fkMobileNumber.html',
          appendClassName: 'fk-mobile-number narrow',
          showClose: false,
          ariaRole: 'dialog',
          scope: this.$scope,
          data: {
            phoneNumber: data.changedPhoneNumber
          },
          preCloseCallback: () => {
            this.mobileNumberDialog = null;
          }
        });
        this.$scope.$emit('fk-popup-opened', {
          name: 'fkMobileNumber',
          type: 'Info Page'
        });
      }
    });

    $rootScope.$on('fk-mobile-number-add', () => {
      if (this.mobileNumberDialog) {
        this.mobileNumberDialog.close();
      }
    });
  }
}

FkMobileNumberController.$inject = ['$rootScope', '$scope', 'ngDialog'];

export default FkMobileNumberController;
