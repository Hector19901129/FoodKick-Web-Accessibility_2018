class FkZipEmailRegistrationCtrl {
  constructor($rootScope, $scope, fkZipEmailNotificationService, fkHttp, fkUtils, API) {
    this.$rootScope = $rootScope;
    this.$scope = $scope;
    this.fkZipEmailNotificationService = fkZipEmailNotificationService;
    this.fkHttp = fkHttp;
    this.fkUtils = fkUtils;
    this.API = API;

    $scope.zipEmailRegister = {
      email: '',
      zipCode: ''
    };

    $scope.zipEmailRegister.zipCode = fkZipEmailNotificationService.zipCode;

    $scope.formDescriptor = {
      id: 'zip_email_notification',
      actions: [{
        name: 'submit',
        label: 'NOTIFY ME',
        action: (desc, data, originalData, formHelpers) => {
          let errors = formHelpers.validate({ forceTouch: true });

          if (errors && Object.keys(errors).length) {
            return;
          }
          fkHttp({
            spinner: 'zip-code-check',
            url: API.zipEmailNotification,
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            data: fkUtils.postData($scope.zipEmailRegister),
            dispatch: 'true'
          }).then(responseData => {
            if (responseData.data.status === 'SUCCESS') {
              $rootScope.$broadcast('emailZipRegistrationDone');
            } else {
              formHelpers.handleErrors(responseData.data);
            }
          });
        },
        validOnly: true
      }],
      fields: [{
        name: 'email',
        placeholder: 'Enter your email',
        label: 'Email',
        type: 'email',
        required: true
      }]
    };
  }

}

FkZipEmailRegistrationCtrl.$inject = ['$rootScope', '$scope', 'fkZipEmailNotificationService', 'fkHttp', 'fkUtils', 'API'];

export default FkZipEmailRegistrationCtrl;
