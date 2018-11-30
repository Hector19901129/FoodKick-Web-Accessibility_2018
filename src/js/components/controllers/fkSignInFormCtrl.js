class FkSignInFormCtrl {
  constructor($scope, $state, fkUserService, fkReferalService, fkUtils, $location, $rootScope, vcRecaptchaService, CONFIG) {
    this.$scope = $scope;
    this.$state = $state;
    this.fkUserService = fkUserService;
    this.fkReferalService = fkReferalService;
    this.fkUtils = fkUtils;
    this.$location = $location;
    this.$rootScope = $rootScope;
    this.vcRecaptchaService = vcRecaptchaService;
    this.isException = this.$location.$$path !== '/deliverypass' && this.$state.current.name !== 'feed';

    var referalPromoCode = fkReferalService.referalData.promoCode;
    var referalClickId = fkReferalService.referalData.clickId;

    this.$postLink = () => {

    $scope.setResponse = (response) => {
      $scope.captchaToken = response;
    };

    let signInKey = (CONFIG.CAPTCHAKEY && CONFIG.CAPTCHAKEY.Signin) || '6LfvoWAUAAAAANJkLqtSIA4ZeVtaccF3DLB-_Qj2';
    let signUpKey = (CONFIG.CAPTCHAKEY && CONFIG.CAPTCHAKEY.Signup) || '6LcloWAUAAAAADTm4s9d7g-Ck07SF5SzAGFfT_Vg';

     $scope.signInData = {
        email: null,
        password: null,
        show: false,
        rafclickid: referalClickId,
        rafpromocode: referalPromoCode,
        setResponse : $scope.setResponse,
        captchakey: signInKey
      };

      $scope.formDescriptor = {
        id: 'sign_in_form',
        actions: [{
            name: 'submit',
            type: 'submit',
            validOnly: true
          },
          {
            name: 'signin',
            label: 'SIGN IN',
            action: (desc, data, originalData, formHelpers) => {
              let errors = formHelpers.validate({ forceTouch: true });

              if (errors && Object.keys(errors).length) {
                return;
              }
              this.userLogin($scope.signInData.email, $scope.signInData.password, $scope.captchaToken, $scope.signInData.rafclickid, $scope.signInData.rafpromocode);

            },
            hide: true
          },
          {
            name: 'signup',
            label: 'CREATE ACCOUNT',
            action: (desc, data, originalData, formHelpers) => {
              let errors = formHelpers.validate({ forceTouch: true });

              if (errors && Object.keys(errors).length) {
                return;
              }
              this.userRegister($scope.signInData.email, $scope.signInData.password, $scope.captchaToken);
            },
            hide: true
          }
        ],
        fields: [{
            name: 'email',
            placeholder: 'Email',
            label: 'Email',
            labelType: 'float',
            type: 'email',
            required: true
          },
          {
            name: 'password',
            placeholder: 'Password',
            label: 'Password',
            labelType: 'float',
            required: true,
            type: 'showpassword'
          },
          {
            type: 'angular',
            cssClass: 'full',
            template: `<div class="full captcha-block" ng-if="data.showCaptcha"><div vc-recaptcha key="data.captchakey" on-success="data.setResponse(response)"></div></div>`
          },
          {
            type: 'angular',
            cssClass: 'full',
            template: `<div class="policy">By registering you agree to the <a href="/help/legal/privacy" target="_blank" rel="noopener" class="noopener_class">privacy policy</a> and <a href="/help/legal/agreement" target="_blank">customer agreement</a>.</div>`
          }

        ]
      };


      if ($scope.$ctrl.defaultAction === "signin") {
        $scope.formDescriptor.actions[0].label = $scope.formDescriptor.actions[1].label;
        $scope.signInData.showCaptcha = this.fkUserService.CaptchaList.signIn;
      }

      if ($scope.$ctrl.defaultAction === "signup") {
        $scope.formDescriptor.actions[0].label = $scope.formDescriptor.actions[2].label;
        $scope.formDescriptor.id = 'sign_up_form';
        $scope.signInData.showCaptcha = this.fkUserService.CaptchaList.signUp;
        $scope.signInData.captchakey = signUpKey;
      }
    };
  }

  userLogin(email, password, captcha, rafclickid, rafpromocode) {
    return this.fkUserService.login(email, password, captcha, rafclickid, rafpromocode).then(data => {
      if (data.status === 'SUCCESS') {
        if (this.isException) {
          this.$state.go('home', {}, { reload: true });
          this.fkUtils.goToTop();
        } else {
          this.$state.reload();
        }
      } else if (data.status === 'FAILED' && data.showCaptcha) {
        this.$scope.signInData.showCaptcha = data.showCaptcha;
        this.fkUserService.checkLogin();
        this.vcRecaptchaService.reload();
      }

      this.$scope.$emit('fk-sign-in-response', { responsData: data });
      return data;
    });
  }

  userRegister(email, password, captcha) {
    return this.fkUserService.register(email, password, captcha).then(data => {
      if (data.status === 'SUCCESS') {
        if (this.isException) {
          this.$state.go('home', {}, { reload: true });
          this.fkUtils.goToTop();
        } else {
          this.$state.reload();
        }
      } else if (data.status === 'FAILED' && data.showCaptcha) {
        this.$scope.signInData.showCaptcha = data.showCaptcha;
        this.fkUserService.checkLogin();
        this.vcRecaptchaService.reload();
      }
      this.$scope.$emit('fk-sign-up-response', { responsData: data });
      return data;
    });
  }

}

FkSignInFormCtrl.$inject = ['$scope', '$state', 'fkUserService', 'fkReferalService', 'fkUtils', '$location', '$rootScope', 'vcRecaptchaService', 'CONFIG'];

export default FkSignInFormCtrl;
