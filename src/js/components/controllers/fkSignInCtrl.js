class FkSignInCtrl {
  constructor($scope, fkUtils, ngDialog, API) {
    this.$scope = $scope;
    this.fkUtils = fkUtils;
    this.ngDialog = ngDialog;
    this.API = API;

    let custom_CSS = fkUtils.getFrontendURL('', {pathname: '/assets/oneall/fk-custom-social-buttons.css', page: ''});

    $scope.forgotPassword= () => {
      ngDialog.open({
        templateUrl: 'templates/fkForgotPasswordPopup.html',
        appendClassName: 'fk-forgot-password narrow',
        showClose: false,
        ariaRole: 'dialog',
        scope: $scope
      });
      this.$scope.$emit('fk-popup-opened', {
        name: 'fkForgotPasswordPopup',
        type: 'Info Page'
      });
    };

    $scope.$on('fk-sign-in-response', (e, d) => {
      if (d.responsData && d.responsData.status === 'SUCCESS') {
        ngDialog.close();
      } else {
        this.signInErrors = d.responsData.errors;
      }
    });

    this.$postLink = () => {
      setTimeout(() => {
        window._oneall = window._oneall || [];
        window._oneall.push(['social_login', 'set_providers', ['facebook', 'google']]);
        window._oneall.push(['social_login', 'set_custom_css_uri', custom_CSS]);
        window._oneall.push(['social_login', 'set_callback_uri', fkUtils.getAPIEndpoint(API.socialLogin+'?context=SIGNIN&redirect_url=', API.APIhost) + fkUtils.getFrontendURL()]);
        window._oneall.push(['social_login', 'do_render_ui', 'social-login']);
      }, 1000);
    };
  }
}

FkSignInCtrl.$inject = ['$scope', 'fkUtils', 'ngDialog', 'API'];

export default FkSignInCtrl;
