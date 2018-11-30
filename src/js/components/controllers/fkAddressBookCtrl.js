class FkAddressBookCtrl {
  constructor($scope, $rootScope, $animate, fkAddressService, ngDialog) {
    this.$scope = $scope;
    this.$rootScope = $rootScope;
    this.$animate = $animate;
    this.fkAddressService = fkAddressService;
    this.ngDialog = ngDialog;

    $animate.enabled(false);
    $scope.add = false;
    $scope.addressService = fkAddressService;
    // var el = angular.element(document.querySelector("#panel0"));
    // el.setAttribute("aria-selected", true);
    $scope.setDeliveryAddress = (address, index_num) => {
      fkAddressService.setDeliveryAddress(address.id, address.type).then( response => {
        this.setAddress({type: 'address',data: address, errors: response.errors || {} });
      });
      var el = angular.element(document.querySelector("#panel"+index_num));
        //console.log(el);
        angular.forEach(el, function(value){
          value.setAttribute("aria-selected", "true");
        });
    };

    $scope.edit = (address) => this.openEdit(address);

    $scope.addAddress = () => this.openEdit();

    $scope.addressChanged = () => {
      if (this.addressPopup && this.addressPopup.close) {
        this.addressPopup.close();
      }
      this.refresh(true);
    };
    $scope.checkAddress = (event, address, index_num) => {
      if (event.keyCode === 13) {
        
        fkAddressService.setDeliveryAddress(address.id, address.type).then( response => {
          this.setAddress({type: 'address',data: address, errors: response.errors || {} });
        });
        var el = angular.element(document.querySelector("#panel"+index_num));
        //console.log(el);
        angular.forEach(el, function(value){
          value.setAttribute("aria-selected", "true");
        });
      }
    };
    $scope.getSelectType = (address) => {
      if ((address.availableServiceTypes && address.availableServiceTypes.indexOf('FDX')) < 0 || $scope.addressService.selectedAddress && $scope.addressService.selectedAddress.id === address.id){
        return 'selected-background';
      }
        return 'unselected-background';
    };
    
  }

  refresh(signal) {
    this.fkAddressService.getAddresses().then(() => {
      if (signal) {
        this.$rootScope.$broadcast('fk-delivery-address-refreshed', {});
      }
    });
  }

  openEdit(address) {
    let template = !address ? 'templates/fkAddAddressPopup.html': 'templates/fkAddressPopup.html';
    this.$scope.editAddress = address;
    this.addressPopup = this.ngDialog.open({
      templateUrl: template,
      appendClassName: 'fk-checkout-form narrow',
      showClose: false,
      ariaRole: 'dialog',
      scope: this.$scope
    });
    if (address) {
      this.$scope.$emit('fk-address-edit-opened', {address});
    } else {
      this.$scope.$emit('fk-address-add-opened');
    }
  }

  
}

FkAddressBookCtrl.$inject = ['$scope', '$rootScope', '$animate', 'fkAddressService', 'ngDialog'];

export default FkAddressBookCtrl;
