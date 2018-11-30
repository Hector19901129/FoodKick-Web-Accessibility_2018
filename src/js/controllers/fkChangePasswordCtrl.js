import './../../css/changepassword.css';

class FkChangePasswordCtrl {
  constructor($scope, $state) {
    this.$scope = $scope;
    this.$state = $state;

    $scope.user = {};
    $scope.user.email = $state.params.email;
    $scope.user.token = $state.params.token;
  }

}

FkChangePasswordCtrl.$inject = ['$scope', '$state'];

export default FkChangePasswordCtrl;
