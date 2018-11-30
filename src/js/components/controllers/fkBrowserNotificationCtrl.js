class FkBrowserNotificationCtrl {
  constructor($rootScope, ngDialog) {
    this.$rootScope = $rootScope;
    this.ngDialog = ngDialog;

  }
}

FkBrowserNotificationCtrl.$inject = ['$rootScope', 'ngDialog'];

export default FkBrowserNotificationCtrl;
