class FkLogoutButtonCtrl {
  constructor($rootScope, $state, fkUserService, $window, fkUtils) {
    this.$rootScope = $rootScope;
    this.$state = $state;
    this.fkUserService = fkUserService;
    this.$window = $window;
    this.fkUtils = fkUtils;
  }

  logOut() {
    this.fkUserService.logout()
    .then(() => {
      this.$window.sessionStorage.removeItem('ATP_ALERT_FLAG');
      this.$state.go('home', {}, {reload: true});
      this.fkUtils.goToTop();
    });
  }

}

FkLogoutButtonCtrl.$inject = ['$rootScope', '$state', 'fkUserService', '$window', 'fkUtils'];

export default FkLogoutButtonCtrl;
