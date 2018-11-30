class FkRecaptchaCtrl {
  constructor($log, $window) {
    this.$log = $log;
    this.$window = $window;

    const loadReCaptcha = () => {
      if (document.getElementById('reCaptcha-js')) {
        $log.warn('reCaptcha already loaded.');
      } else {
        let script = document.createElement('script');
        script.type = 'text/javascript';
        script.id = 'reCaptcha-js';
        script.async = true;
        script.src = 'https://www.google.com/recaptcha/api.js?onload=vcRecaptchaApiLoaded&render=explicit';
        script.defer = true;

        let first = document.getElementsByTagName('script')[0];
        first.parentNode.insertBefore(script, first);

      }
    };

    this.$postLink = () => {
      loadReCaptcha();
    };

  }

}

FkRecaptchaCtrl.$inject = ['$log', '$window'];

export default FkRecaptchaCtrl;
