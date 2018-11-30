class NotificationsCtrl {
  constructor($scope, pageLoaded, goBack) {
    this.$scope = $scope;
    this.pageLoaded = pageLoaded;
    this.goBack = goBack;

    pageLoaded();

    $scope.goBack = goBack;
  }
}

NotificationsCtrl.$inject = ['$scope', 'pageLoaded', 'goBack'];

export default NotificationsCtrl;
