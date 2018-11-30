class FkPageMenuCtrl {
  constructor($scope, $state) {
    this.$scope = $scope;
    this.$state = $state;

    $scope.hidemobile = false;
    $scope.$state = $state;

    $scope.togglesubitem = (index, path, entry) => {
      if ($scope.showsubitem !== index) {
        $scope.showsubitem = index;
        if (!this.ismobile) {
          $state.go(this.state, {
            partial: path,
            subpartial: entry
          });
        } else if (entry === ''){
          $scope.showsubitem = index;
          $state.go(this.state, {
            partial: path,
            subpartial: entry
          });
        }
      } else {
        $scope.showsubitem = false;
      }
    };

    this.$postLink = () => {
      if (this.ismobile) {
        if ($state.params.partial || $state.params.subpartial) {
          $scope.hidemobile = true;
        }
      }
    };
  }

}

FkPageMenuCtrl.$inject = ['$scope', '$state'];

export default FkPageMenuCtrl;
