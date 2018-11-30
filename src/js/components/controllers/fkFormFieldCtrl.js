class FkFormFieldCtrl {
  constructor($scope) {
    this.$scope = $scope;

    this.$postLink = () => {
      $scope.form = this.form;
    };
  }

}

FkFormFieldCtrl.$inject = ['$scope'];

export default FkFormFieldCtrl;
