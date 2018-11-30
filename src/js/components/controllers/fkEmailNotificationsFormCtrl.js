class FkEmailNotificationsFormCtrl {
  constructor($scope, fkNotificationsService) {
    this.$scope = $scope;
    this.fkNotificationsService = fkNotificationsService;

    $scope.emailStatuses = {
      emailStatus: 'N'
    };

    $scope.formDescriptor = {
      id: 'email_notifications_form',
      actions: [
        {
          name: 'submit',
          action: this.setEmailPreferences.bind(this),
          label: 'Save',
          buttonClass: 'button-secondary uppercased'
        }
      ],
      fields: [
        {
          name: 'emailStatus',
          placeholder: 'Email Notifications',
          label: 'Email Notifications',
          type: 'checkbox'
        }
      ]
    };

    this.$postLink = () => {
      fkNotificationsService.getEmailPreferences().then((emailStatuses) => {
        if (emailStatuses === 'Y') {
          $scope.emailStatuses.emailStatus = true;
        } else {
          $scope.emailStatuses.emailStatus = false;
        }
      });
    };
  }

  setEmailPreferences(desc, data, originalData, formHelpers) {
    this.fkNotificationsService.setEmailPreferences(data.emailStatus)
    .then(responseData => {
      if (!responseData.data || responseData.data.status || responseData.data.status === 'SUCCESS'){
        formHelpers.handleErrors(responseData.data);
      }
    });
  }

}

FkEmailNotificationsFormCtrl.$inject = ['$scope', 'fkNotificationsService'];

export default FkEmailNotificationsFormCtrl;
