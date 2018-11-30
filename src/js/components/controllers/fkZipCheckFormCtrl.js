class FkZipCheckFormCtrl {
  constructor($rootScope, $scope, fkZipEmailNotificationService, fkHttp, fkUtils, API) {
    this.$rootScope = $rootScope;
    this.$scope = $scope;
    this.fkZipEmailNotificationService = fkZipEmailNotificationService;
    this.fkHttp = fkHttp;
    this.fkUtils = fkUtils;
    this.API = API;

    $scope.zipCheckData = {
      zipCode: null,
      serviceType : 'FDX'
    };

    $scope.formDescriptor = {
      id: 'zip_check_form',
      actions: [
        {
        name: 'submit',
        label: 'OK',
        action: (desc, data, originalData, formHelpers) => {
          let errors = formHelpers.validate({forceTouch: true});

          if (errors && Object.keys(errors).length) {
            return;
          }

          $scope.$emit('fk-zip-entered', {zipCode: $scope.zipCheckData.zipCode});

          fkHttp({
            spinner: 'zip-code-check',
            url: API.checkZip,
            method: 'POST',
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            data: fkUtils.postData($scope.zipCheckData),
            dispatch: 'true'
          }).then(responseData => {
            if (responseData.data.status === 'SUCCESS') {
              $scope.$emit('fk-zip-check-done', {zipCheckData:$scope.zipCheckData});
            } else if (responseData.data.errors && responseData.data.errors.ERR_ZIP_INVALID) {
              formHelpers.handleErrors({
                errors: {
                  zipCode: responseData.data.errors.ERR_ZIP_INVALID
                }
              });
            } else {
              fkZipEmailNotificationService.zipCode = responseData.data.zipCode;
              $rootScope.$broadcast('fk-zip-code-unavailable');
            }
          });
        },
        validOnly: true
        }
      ],
      fields: [
        {
          name: 'zipCode',
          placeholder: 'Enter Zip Code',
          label: 'ZIP CODE',
          type: 'text',
          pattern: '^\\d{5}$',
          required: true
        }
      ]
    };
  }

}

FkZipCheckFormCtrl.$inject = ['$rootScope', '$scope', 'fkZipEmailNotificationService', 'fkHttp', 'fkUtils', 'API'];

export default FkZipCheckFormCtrl;
