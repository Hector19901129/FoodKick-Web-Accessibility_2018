import './../../css/paymentMethods.css';

class PaymentMethodsCtrl {
  constructor($scope, fkPaymentMethodService, fkUserService, pageLoaded, goBack) {
    this.$scope = $scope;
    this.fkPaymentMethodService = fkPaymentMethodService;
    this.fkUserService = fkUserService;
    this.pageLoaded = pageLoaded;
    this.goBack = goBack;

    fkPaymentMethodService.getPaymentMethods();

    $scope.bankFormOn = () => fkUserService.user && fkUserService.user.totalOrderCount > 0;

    pageLoaded();

    $scope.goBack = goBack;
  }
}

PaymentMethodsCtrl.$inject = ['$scope', 'fkPaymentMethodService', 'fkUserService', 'pageLoaded', 'goBack'];

export default PaymentMethodsCtrl;
