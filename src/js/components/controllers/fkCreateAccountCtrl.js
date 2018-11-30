class FkCreateAccountCtrl {
  constructor($scope, $q, fkUserService, ngDialog, fkUtils, API) {
    this.$scope = $scope;
    this.$q = $q;
    this.fkUserService = fkUserService;
    this.ngDialog = ngDialog;
    this.fkUtils = fkUtils;
    this.API = API;

    $scope.$on('fk-sign-up-response', (e, d) => {
      if (d.responsData && d.responsData.status === 'SUCCESS') {
        ngDialog.close();
      } else {
        $scope.signUpErrors = d.responsData.errors;
      }
    });

    this.custom_CSS = fkUtils.getFrontendURL('', {pathname: '/assets/oneall/fk-custom-social-buttons.css', page: ''});

    this.$postLink = () => {
      setTimeout(() => {
        window._oneall = window._oneall || [];
        window._oneall.push(['social_login', 'set_providers', ['facebook', 'google']]);
        window._oneall.push(['social_login', 'set_custom_css_uri', this.custom_CSS]);
        window._oneall.push(['social_login', 'set_callback_uri', fkUtils.getAPIEndpoint(API.socialLogin+'?context=CREATE&redirect_url=', API.APIhost) + fkUtils.getFrontendURL()]);
        window._oneall.push(['social_login', 'do_render_ui', 'social-register']);
      }, 1000);
    };
  }
}

FkCreateAccountCtrl.$inject = ['$scope', '$q', 'fkUserService', 'ngDialog', 'fkUtils', 'API'];

export default FkCreateAccountCtrl;
