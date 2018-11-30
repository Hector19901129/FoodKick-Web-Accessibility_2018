class EmailSettingsCtrl {
  constructor($scope, pageLoaded, goBack) {
    this.$scope = $scope;
    this.pageLoaded = pageLoaded;
    this.goBack = goBack;

    pageLoaded();

    $scope.goBack = goBack;
  }

}

EmailSettingsCtrl.$inject = ['$scope', 'pageLoaded', 'goBack'];

export default EmailSettingsCtrl;
