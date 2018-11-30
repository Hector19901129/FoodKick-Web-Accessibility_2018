class FkGlobalNavigationWidgetCtrl {
  constructor($scope, fkGlobalNavService) {
    this.$scope = $scope;
    this.fkGlobalNavService = fkGlobalNavService;

    $scope.menu = {};

    fkGlobalNavService.get().then(response => {
      $scope.menu.departments = response.data.departments;
    });
  }
}

FkGlobalNavigationWidgetCtrl.$inject = ['$scope', 'fkGlobalNavService'];

export default FkGlobalNavigationWidgetCtrl;
