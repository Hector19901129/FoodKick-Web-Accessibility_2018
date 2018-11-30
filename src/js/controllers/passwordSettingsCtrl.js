class PasswordSettingsCtrl {
  constructor($scope, pageLoaded, goBack) {
    this.$scope = $scope;
    this.pageLoaded = pageLoaded;
    this.goBack = goBack;

    pageLoaded();

    $scope.goBack = goBack;
  }
}

PasswordSettingsCtrl.$inject = ['$scope', 'pageLoaded', 'goBack'];

export default PasswordSettingsCtrl;
