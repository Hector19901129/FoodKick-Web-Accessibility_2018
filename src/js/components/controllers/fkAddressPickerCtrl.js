class FkAddressPickerCtrl {
  constructor($scope, $rootScope, ngDialog, fkAddressService) {
    this.$scope = $scope;
    this.$rootScope = $rootScope;
    this.ngDialog = ngDialog;
    this.fkAddressService = fkAddressService;

    $scope.pickerAddress = () => {
      if (fkAddressService.addresses.length) {
        if (!$scope.dialog || !$scope.dialog.id || !ngDialog.isOpen($scope.dialog.id)) {

          $scope.dialog = ngDialog.open({
            templateUrl: 'templates/fkAddressChange.html',
            appendClassName: 'fk-address-change narrow',
            showClose: false,
            ariaRole: 'dialog',
            scope: $scope
          });
        }

      } else {
        $rootScope.$broadcast('fk-error-ERR_ZIP_REQUIRED', { ev: '', data: {} });
      }
    };

    $rootScope.$on('open-address-book', () => {
      $scope.pickerAddress();
    });

    $scope.$on('fk-zip-code-unavailable', () => {
      this.closeDialog();
      $rootScope.$broadcast('fk-zip-check-done-success');
    });

    $scope.selected = { address: {} };

    if (fkAddressService.selectedAddress) {
      $scope.selected.address = fkAddressService.selectedAddress;
    }

    $rootScope.$on('fk-selected-address-set', () => {
      $scope.selected.address = fkAddressService.selectedAddress;
    });

    $scope.$on('fk-zip-check-done', (ev, data) => {
      this.closeDialog();
      $scope.zipCode = data.zipCheckData.zipCode;
    });

    $scope.dialog = null;
  }

  closeDialog() {
    if (this.$scope.dialog){
      this.$scope.dialog.close();
    }
  }
  focus() {
    var myEl = angular.element(document.querySelector('.account-menu'));
      myEl.css("position", "absolute");
      myEl.css("opacity", 0);
      myEl.css("transform", "scale(0)");
      myEl.css("left", "0px");
      myEl.css("margin-top", "-var(--fk-vertical-space)");
      myEl.css("transform-origin", "50% 0");
      myEl.css("transition", "transform 350ms cubic-bezier(0.23, 1.2, 0.32, 1), opacity 350ms cubic-bezier(0.23, 1.2, 0.32, 1),-webkit-transform 350ms cubic-bezier(0.23, 1.2, 0.32, 1)");
      myEl.css("box-shadow", "absolute");
      myEl.css("position", "0px 25px 20px -20px var(--fk-color-black-a), 0px 0px 40px 0px rgba(0, 0, 0, 0.2)!important");
      var btns = angular.element(document.querySelectorAll(".account-menu [tabindex]"));
      angular.forEach(btns, function(value){
        value.setAttribute("tabindex", -1);
      });
      angular.forEach(myEl, function(value){
        value.setAttribute("aria-expanded", "false");
      });
  }
}

FkAddressPickerCtrl.$inject = ['$scope', '$rootScope', 'ngDialog', 'fkAddressService'];

export default FkAddressPickerCtrl;
