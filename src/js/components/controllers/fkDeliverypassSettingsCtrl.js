class FkDeliverypassSettingsCtrl {
  constructor($rootScope, $scope, fkUserService, fkPaymentMethodService, fkDeliveryPassService) {
    this.$rootScope = $rootScope;
    this.$scope = $scope;
    this.fkUserService = fkUserService;
    this.fkPaymentMethodService = fkPaymentMethodService;
    this.fkDeliveryPassService = fkDeliveryPassService;
    $scope.toggle = {};
    $scope.toggle.switch = true;

    this.$postLink = () => {
      this.fkDeliveryPassService.getDpSettingsInfo().then((response) => {
        $scope.settings = response.data;
        if (response.data.hasAutoRenewDP === 'Y') {
          $scope.toggle.switch = true;
        } else {
          $scope.toggle.switch = false;
        }

      });
    };

    if (fkDeliveryPassService && fkDeliveryPassService.dpAutopayStatus === 'Y') {
      $scope.toggle.switch = true;
    } else {
      $scope.toggle.switch = false;
    }

    fkPaymentMethodService.getPaymentMethods();

    $scope.selectedPaymentMethod = () => {
      return fkPaymentMethodService.selectedPaymentMethod;
    };

    $scope.setAutopayPreference = (a) => {
      fkDeliveryPassService.setAutopayPreferences(a).then((response) => {
        if (response.data.status === 'SUCCESS') {
          fkDeliveryPassService.getDpSettingsInfo();
        }
      });
    };
  }

  openReceipt(order_Id) {
    this.$rootScope.$broadcast('fk-open-receipt-popup', { orderId: order_Id });
  }
}

FkDeliverypassSettingsCtrl.$inject = ['$rootScope', '$scope', 'fkUserService', 'fkPaymentMethodService', 'fkDeliveryPassService'];

export default FkDeliverypassSettingsCtrl;
