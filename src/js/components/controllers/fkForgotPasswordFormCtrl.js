class FkForgotPasswordFormCtrl {
  constructor($scope, fkUtils, API) {
    this.$scope = $scope;
    this.fkUtils = fkUtils;
    this.API = API;

    $scope.forgotPasswordData = {
      email: null
    };

    $scope.formDescriptor = {
      id: 'forgot_password_form',
      url: fkUtils.replaceURLParams(API.forgotPassword, {
        username: "username"}),
      method: 'POST',
      processResponse: responsData => {
        if (responsData.status === 'SUCCESS') {
          $scope.$emit('fk-forgot-password-success', {response: responsData});
        }
      },
      preSubmit: data => {
        return {username: data.email};
      },
      actions: [
        {
          name: 'submit',
          type: 'submit',
          label: 'Submit'
        }
      ],
      fields: [
        {
          name: 'email',
          placeholder: 'Email',
          label: 'Email',
          type: 'email',
          required: true
        }
      ]
    };
  }
}

FkForgotPasswordFormCtrl.$inject = ['$scope', 'fkUtils', 'API'];

export default FkForgotPasswordFormCtrl;
