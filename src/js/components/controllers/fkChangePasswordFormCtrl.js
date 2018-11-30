class FkChangePasswordFormCtrl {
  constructor($scope, $state, fkUtils, API) {
    this.$scope = $scope;
    this.$state = $state;
    this.fkUtils = fkUtils;
    this.API = API;

    $scope.passwordData = {
      password: null,
      show: null,
      confirmPassword: null,
      confirmShow: null
    };

    $scope.formDescriptor = {
      id: 'change_password_form',
      url: fkUtils.replaceURLParams(API.changePassword, {username: "username"}),
      method: 'POST',
      preSubmit: data => {
        return {
          source: 'IPW',
          username: $scope.$ctrl.userData.email,
          token: $scope.$ctrl.userData.token,
          password: data.password,
          confirmPassword: data.confirmPassword
        };
      },
      processResponse: (responsData) => {
        if (responsData.status === 'SUCCESS') {
          $state.go('changePasswordSuccessful');
        }
      },
      actions: [
        {
          name: 'submit',
          type: 'submit',
          label: 'Change Password'
        }
      ],
      fields: [
        {
          name: 'password',
          placeholder: 'New Password',
          label: 'New Password',
          required: true,
          type: 'showpassword'
        },
        {
          name: 'confirmPassword',
          placeholder: 'Repeat New Password',
          label: 'Retype Password',
          required: true,
          type: 'showpassword'
        }
      ]
    };
  }

}

FkChangePasswordFormCtrl.$inject = ['$scope', '$state', 'fkUtils', 'API'];

export default FkChangePasswordFormCtrl;
