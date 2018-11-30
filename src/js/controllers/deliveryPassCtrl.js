import './../../css/deliveryPass.css';

class DeliveryPassCtrl {
  constructor(pageLoaded, goBack, $scope, fkUserService, fkDeliveryPassService) {
    this.pageLoaded = pageLoaded;
    this.goBack = goBack;
    this.fkUserService = fkUserService;
    this.fkDeliveryPassService = fkDeliveryPassService;
    $scope.fkUserService = fkUserService;
    $scope.fkDeliveryPassService = fkDeliveryPassService;
    $scope.goBack = goBack;
    pageLoaded();
  }
}

DeliveryPassCtrl.$inject = ['pageLoaded', 'goBack', '$scope', 'fkUserService', 'fkDeliveryPassService'];
export default DeliveryPassCtrl;
