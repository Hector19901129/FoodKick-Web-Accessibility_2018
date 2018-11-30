class FkPastItemsButtonCtrl {
  constructor($scope, $state, fkUserService) {
    this.$scope = $scope;
    this.$state = $state;
    this.fkUserService = fkUserService;

    $scope.fkUserService = fkUserService;

    $scope.openPastItemsPage = () => {
      $state.go( 'pastitems' );
    };
  }

}

FkPastItemsButtonCtrl.$inject = ['$scope', '$state', 'fkUserService'];

export default FkPastItemsButtonCtrl;
