class FkZipCodeChangeCtrl {
  constructor($scope, $rootScope) {
    this.$scope = $scope;
    this.$rootScope = $rootScope;

    $rootScope.$on('fk-zip-check-done', function(ev, data) {
      setTimeout(function() {
        document.getElementById('zip_code_info').style.display = 'block';
      }, 7000);
      $scope.showPopUp = true;
      $scope.zipCheckData = data.zipCheckData;
    });

    $rootScope.$on('fk-selected-address-set', () => {
      $scope.showPopUp = false;
      document.getElementById('zip_code_info').style.display = 'none';
    });

    $scope.$on('fk-zip-code-unavailable', () => {
      this.closeDialog();
      document.getElementById('zip_code_info').style.display = 'none';
      $scope.showPopUp = false;
      $rootScope.$broadcast('fk-zip-check-done-success');
    });

    $scope.showPopUp = false;

    $scope.$on('fk-zip-code-unavailable', () => {
      $scope.showPopUp = false;
    });

    $scope.dialog = null;
  }

  closeDialog() {
    if (this.$scope.dialog) {
      this.$scope.dialog.close();
    }
  }

  checkAnotherZip() {
    this.$rootScope.$broadcast('fk-error-ERR_ZIP_REQUIRED', { ev: '', data: {} });
  }

  close() {
    document.getElementById('zip_code_info').style.display = 'none';
    this.$scope.showPopUp = false;
  }
}

FkZipCodeChangeCtrl.$inject = ['$scope', '$rootScope'];

export default FkZipCodeChangeCtrl;
