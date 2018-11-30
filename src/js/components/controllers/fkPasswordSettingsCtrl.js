class FkPasswordSettingsCtrl {
  constructor($rootScope, $scope, fkEmailAndPasswordService, fkUserService) {
    this.$rootScope = $rootScope;
    this.$scope = $scope;
    this.fkEmailAndPasswordService = fkEmailAndPasswordService;
    this.fkUserService = fkUserService;

    $scope.showSuccess = false;

    $scope.forgotPassword = () => {
      $rootScope.$broadcast('fk-forgot-password', {status: 'forgotPassword'});
    };

    $scope.$on('fk-forgot-password-form',() => {
      $rootScope.$broadcast('fk-forgot-password', {status: 'forgotPassword'});
    });

    $scope.passwordSettingsData = {
      currentPassword: '',
      newPassword: '',
      showpassword: ''
    };

    $scope.formDescriptor = {
      id: 'fkPasswordSettings',

      forgotPassword: () => {
        $scope.$emit('fk-forgot-password-form', {status: 'forgotPassword'});
      },

      actions: [
        {
          name: 'submit',
          action: this.submitNewPassword.bind(this),
          label: 'SAVE',
          buttonClass: 'col-lg-7 button-secondary',
          validOnly: true
        }
      ],

      fields: [
        {
          name: 'newPassword',
          placeholder: 'Enter New Password',
          label: 'New Password',
          required: true,
          type: 'showpassword',
          cssClass: 'col-lg-7'
        },
        {
        name: 'confirmPassword',
        placeholder: 'Confirm New Password',
        label: 'Re-type New Password',
        required: true,
        type: 'showpassword',
        cssClass: 'col-lg-7 confirm-password'
        },
        {
          name: 'currentPassword',
          placeholder: 'Enter Your Password',
          label: 'Enter Current Password',
          required: true,
          type: 'showpassword',
          cssClass: 'col-lg-7 current-password'
        },
        {
          template: '<div class="forgot-password"> <a href="" ng-click="$ctrl.formDescriptor.forgotPassword()">Forgot Password</a>',
          type: 'angular'
        }
      ]
    };
  }

  isThePasswordFieldsSame(data) {
    return data.newPassword === data.confirmPassword;
  }

  submitNewPassword(desc, data, originalData, formHelpers) {
    if (this.isThePasswordFieldsSame(data)) {
      this.$scope.showSuccess = false;
      this.fkEmailAndPasswordService.setPassword(this.fkUserService.user.username, data.currentPassword, data.newPassword).then(responseData => {
        if (responseData.status && responseData.status === 'SUCCESS') {
          this.$scope.showSuccess = true;
          formHelpers.reset();
        } else {
          formHelpers.handleErrors(responseData);
        }
      });
    } else {
      formHelpers.handleError('Different_Password','The given passwords are different.');
    }
  }

}

FkPasswordSettingsCtrl.$inject = ['$rootScope', '$scope', 'fkEmailAndPasswordService', 'fkUserService'];

export default FkPasswordSettingsCtrl;
