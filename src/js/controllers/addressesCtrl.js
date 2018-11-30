import './../../css/addresses.css';

class AddressesCtrl {
  constructor($scope, fkAddressService, pageLoaded, goBack) {
    this.$scope = $scope;
    this.fkAddressService = fkAddressService;
    this.pageLoaded = pageLoaded;
    this.goBack = goBack;

    fkAddressService.getAddresses().then( () => {
      $scope.fkAddressService = fkAddressService;
    });

    pageLoaded();

    $scope.goBack = goBack;
  }

}

AddressesCtrl.$inject = ['$scope', 'fkAddressService', 'pageLoaded', 'goBack'];

export default AddressesCtrl;
