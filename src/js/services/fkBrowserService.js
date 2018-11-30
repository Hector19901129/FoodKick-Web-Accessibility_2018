class FkBrowserService {
  constructor($window, $rootScope, ngDialog) {
    this.$rootScope = $rootScope;
    this.$window = $window;
    this.ngDialog = ngDialog;
  }

  detectBrowser() {
    var userAgent = this.$window.navigator.userAgent;
    var ieReg = /msie|Trident.*rv[ :]*11\./gi;
    var ie = ieReg.test(userAgent);
    if (ie) {
      this.browserNotification();
    }
  }

  browserNotification() {
    this.ngDialog.open({
      templateUrl: 'templates/fkBrowserNotification.html',
      appendClassName: 'fk-browser-notification narrow',
      showClose: false,
      ariaRole: 'dialog'
    });

    this.$rootScope.$emit('fk-popup-opened', {
      name: 'fkBrowserNotification',
      type: 'Info Page'
    });
  }
}

FkBrowserService.$inject = ['$window', '$rootScope', 'ngDialog'];

export default FkBrowserService;
