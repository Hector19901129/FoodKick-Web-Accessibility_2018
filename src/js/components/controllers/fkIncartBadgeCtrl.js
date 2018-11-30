class FkIncartBadgeCtrl {
  constructor($scope, fkCartService) {
    this.$scope = $scope;
    this.fkCartService = fkCartService;

    $scope.fkCartService = fkCartService;
  }
}

FkIncartBadgeCtrl.$inject = ['$scope', 'fkCartService'];

export default FkIncartBadgeCtrl;
