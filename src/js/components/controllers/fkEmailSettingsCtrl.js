class FkEmailSettingsCtrl {
  constructor($rootScope, $scope, fkEmailAndPasswordService, fkUserService) {
    this.$rootScope = $rootScope;
    this.$scope = $scope;
    this.fkEmailAndPasswordService = fkEmailAndPasswordService;
    this.fkUserService = fkUserService;

    $scope.$on('fk-forgot-password-form',() => {
      $rootScope.$broadcast('fk-forgot-password', {status: 'forgotPassword'});
    });

    $scope.fkUserService = fkUserService;

    $scope.emailSettingsData = {
      newEmail: '',
      password: ''
    };

    $scope.formDescriptor = {
      id: 'fkEmailSettingsForm',

      forgotPassword: () => {
        $scope.$emit('fk-forgot-password-form', {status: 'forgotPassword'});
      },

      actions: [
        {
          name: 'submit',
          action: this.submitNewEmail.bind(this),
          label: 'SAVE',
          buttonClass: 'col-lg-7 button-secondary save-changes',
          validOnly: true
        }
      ],
      fields: [
        {
          name: 'newEmail',
          placeholder: 'Enter New Email',
          label: 'New Email',
          type: 'email',
          required: true,
          cssClass: 'col-lg-7'
        },
        {
          name: 'confirmEmail',
          placeholder: 'Confirm New Email',
          label: 'Re-type New Email',
          type: 'email',
          required: true,
          cssClass: 'col-lg-7 confirm-email'
        },
        {
          name: 'password',
          placeholder: 'Enter Your Password',
          label: 'Enter Current Password',
          required: true,
          type: 'showpassword',
          cssClass: 'col-lg-7 password'
        },
        {
          template: '<div class="forgot-password"> <a href="" ng-click="$ctrl.formDescriptor.forgotPassword()">Forgot Password</a>',
          type: 'angular'
        }
      ]
    };
  }

  isTheEmailFieldsSame(data) {
    return data.newEmail === data.confirmEmail;
  }

  submitNewEmail(desc, data, originalData, formHelpers) {
    if (this.isTheEmailFieldsSame(data)) {
      this.fkEmailAndPasswordService.setEmailAdress(this.fkUserService.user.username, data.newEmail,data.password)
      .then(responseData => {
      if (responseData.status && responseData.status=== 'SUCCESS'){
        formHelpers.reset();
        this.$rootScope.$broadcast('fk-email-changed', responseData);
      } else {
        formHelpers.handleErrors(responseData);
      }
    });
    } else {
      formHelpers.handleError('Different_Email','The given email addresses are different.');
    }
  }

}

FkEmailSettingsCtrl.$inject = ['$rootScope', '$scope', 'fkEmailAndPasswordService', 'fkUserService'];

export default FkEmailSettingsCtrl;
