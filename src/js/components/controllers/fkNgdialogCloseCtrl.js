class FkNgdialogCloseCtrl {
  constructor($scope) {
    this.$scope = $scope;

    $scope.close = () => {
      this.close();
    };
  }

}

FkNgdialogCloseCtrl.$inject = ['$scope'];

export default FkNgdialogCloseCtrl;
