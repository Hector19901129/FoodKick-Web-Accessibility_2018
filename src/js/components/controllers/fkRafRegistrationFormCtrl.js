class FkRafRegistrationFormCtrl {
  constructor($scope, $state, fkUserService, ngDialog, fkReferalService, vcRecaptchaService) {
    this.$scope = $scope;
    this.$state = $state;
    this.fkUserService = fkUserService;
    this.fkReferalService = fkReferalService;
    this.ngDialog = ngDialog;
    this.dialog = null;
    this.signinDialog = null;
    this.vcRecaptchaService = vcRecaptchaService;

    var referalPromoCode = fkReferalService.referalData.promoCode;
    var referalClickId = fkReferalService.referalData.clickId;

    this.$postLink = () => {

      $scope.setResponse = (response) => {
        $scope.captchaToken = response;
      };

      let signUpKey = '6LcloWAUAAAAADTm4s9d7g-Ck07SF5SzAGFfT_Vg';

      $scope.signInData = {
        email: null,
        password: null,
        show: false,
        firstname: null,
        lastname: null,
        rafclickid: referalClickId,
        rafpromocode: referalPromoCode,
        setResponse : $scope.setResponse,
        captchakey: signUpKey,
        showCaptcha: this.fkUserService.CaptchaList.signUp
      };

      $scope.formDescriptor = {
        id: 'landing_page_form',
        actions: [{
            name: 'submit',
            type: 'submit',
            label: "GET STARTED",
            validOnly: true
          },
          {
            name: 'signup',
            label: 'GET STARTED',
            action: (desc, data, originalData, formHelpers) => {
              let errors = formHelpers.validate({ forceTouch: true });

              if (errors && Object.keys(errors).length) {
                return;
              }
              this.userRegister($scope.signInData.email, $scope.signInData.password, $scope.captchaToken, $scope.signInData.firstname, $scope.signInData.lastname, $scope.signInData.rafclickid, $scope.signInData.rafpromocode);
            },
            hide: true
          }
        ],
        fields: [{
            name: 'firstname',
            placeholder: 'First Name',
            label: 'First Name',
            labelType: 'float',
            type: 'text',
            cssClass: 'half',
            required: true
          },
          {
            name: 'lastname',
            placeholder: 'Last Name',
            label: 'Last Name',
            labelType: 'float',
            cssClass: 'half',
            type: 'text',
            required: true
          },
          {
            name: 'email',
            placeholder: 'Email',
            label: 'Email',
            labelType: 'float',
            cssClass: 'full',
            type: 'email',
            required: true
          },
          {
            name: 'password',
            placeholder: 'Password',
            label: 'Password',
            labelType: 'float',
            cssClass: 'full',
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
            template: `<div class="policy" ng-class="data.showCaptcha ? '': 'extraMargin'">By signing up, you agree to the <a href="/help/legal/privacy" target="_blank" rel="noopener" class="noopener_class">privacy policy</a> and <a href="/help/legal/agreement" target="_blank" rel="noopener" class="noopener_class">customer agreement</a>.</div>`
          }

        ]
      };

    };
  }

  signIn() {
    if (this.dialog) {
      this.dialog.close();
    }

    if (!this.signinDialog) {
      this.signinDialog = this.ngDialog.open({
        template: '<fk-sign-in></fk-sign-in><fk-ngdialog-close close="closeThisDialog()">' + '</fk-ngdialog-close>',
        plain: true,
        closeByNavigation: true,
        appendClassName: 'fk-Referal-signin narrow',
        showClose: false,
        ariaRole: 'dialog',
        scope: this.$scope,
        preCloseCallback: () => {
          this.signinDialog = null;
        }
      });
      this.$scope.$emit('fk-signin-popup', {});
    }
  }

  userRegister(email, password, captcha, firstname, lastname, rafclickid, rafpromocode) {
    return this.fkUserService.register(email, password, captcha, firstname, lastname, rafclickid, rafpromocode).then(data => {
      if (data.status === 'SUCCESS') {
        this.$state.go('home', {}, { reload: true });
      } else if (data.status === 'FAILED') {
        this.signUpErrors = data.errors;
        this.alreadyRegistered();
      }

      if (data.status === 'FAILED' && data.showCaptcha) {
        this.$scope.signInData.showCaptcha = data.showCaptcha;
        this.fkUserService.checkLogin();
        this.vcRecaptchaService.reload();
      }

      return data;
    });
  }

  alreadyRegistered() {
    if (!this.dialog) {
      this.dialog = this.ngDialog.open({
        templateUrl: 'templates/fkAlreadyRegisteredPopup.html',
        appendClassName: 'fk-landing-page-popup narrow',
        showClose: false,
        scope: this.$scope,
        preCloseCallback: () => {
          this.dialog = null;
        }
      });
    }
  }

}

FkRafRegistrationFormCtrl.$inject = ['$scope', '$state', 'fkUserService', 'ngDialog', 'fkReferalService', 'vcRecaptchaService'];

export default FkRafRegistrationFormCtrl;
