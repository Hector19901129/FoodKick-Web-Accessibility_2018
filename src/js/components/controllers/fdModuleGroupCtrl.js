class FdModuleGroupCtrl {
  constructor($scope, fkUtils) {
    this.$scope = $scope;
    this.$fkUtils = fkUtils;
  }
}

FdModuleGroupCtrl.$inject = ['$scope', 'fkUtils'];

export default FdModuleGroupCtrl;
