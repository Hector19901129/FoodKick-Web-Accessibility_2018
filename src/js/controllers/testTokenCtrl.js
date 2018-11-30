class TestTokenCtrl {
  constructor(API) {
    this.API = API;

    window._oneall = window._oneall || [];

    this.callback = null;
    this.custom_CSS = window.location.protocol + '//' + window.location.host + '/assets/oneall/fk-custom-social-buttons.css';

    if (API.APIhost) {
      this.callback = API.APIhost;
    } else {
      this.callback = window.location.protocol + '//' + window.location.host;
    }

    window._oneall.push(['social_login', 'set_providers', ['facebook', 'google']]);
    // window._oneall.push(['social_login', 'set_grid_sizes', [10,2]]);
    window._oneall.push(['social_login', 'set_custom_css_uri', this.custom_CSS]); //TODO add css url
    window._oneall.push(['social_login', 'set_callback_uri', this.callback + '/mobileapi/api/sociallogin?redirect_url=' + window.location]);
    window._oneall.push(['social_login', 'set_event', 'onLogin', this.onLogin]);
    window._oneall.push(['social_login', 'do_render_ui', 'social-login']);
  }

  onLogin(args) {
    //TODO call social login
    console.log(args); //TODO remove log
  }

}

TestTokenCtrl.$inject = ['API'];

angular.module('fkControllers').controller('testTokenCtrl', TestTokenCtrl);
