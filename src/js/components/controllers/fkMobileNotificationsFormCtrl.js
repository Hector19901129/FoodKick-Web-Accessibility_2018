class FkMobileNotificationsFormCtrl {
  constructor($scope, fkNotificationsService) {
    this.$scope = $scope;
    this.fkNotificationsService = fkNotificationsService;

    $scope.mobileStatuses = {
      mobileNumber: '',
      deliveryUpdates: false,
      orderStatus: false,
      offers: false
    };

    $scope.formDescriptor = {
      id: 'mobile_notifications_form',
      actions: [
        {
          name: 'submit',
          action: this.setMobilePreferences.bind(this),
          label: 'Save',
          buttonClass: 'button-secondary uppercased'
        }
      ],
      fields: [
        {
          name: 'mobileNumber',
          placeholder: ' ',
          label: 'MOBILE NUMBER',
          cssClass: 'uppercased fourtypercentwidth',
          type: 'text',
          required: true
        },
        {
          name: 'deliveryUpdates',
          placeholder: 'Delivery Updates',
          label: 'Delivery Updates',
          cssClass: 'leftFloated',
          type: 'checkbox'
        },
        {
          name: 'orderStatus',
          placeholder: 'Order Status',
          label: 'Order Status',
          cssClass: 'leftFloated',
          type: 'checkbox'
        },
        {
          name: 'offers',
          placeholder: 'Receive amazing food deals & offers SMS Alerts',
          label: 'Receive amazing food deals & offers SMS Alerts',
          cssClass: 'leftFloated',
          type: 'checkbox'
        }
      ]
    };

    this.$postLink = () => {
      fkNotificationsService.getMobilePreferences().then((mobileStatuses) => {
        $scope.mobileStatuses.mobileNumber = mobileStatuses.mobileNumber;
        $scope.mobileStatuses.deliveryUpdates = mobileStatuses.deliveryUpdates;
        $scope.mobileStatuses.orderStatus = mobileStatuses.orderStatus;
        $scope.mobileStatuses.offers = mobileStatuses.offers;
      });
    };
  }

  setMobilePreferences(desc, data, originalData, formHelpers) {
    this.fkNotificationsService.setMobilePreferences(data.mobileNumber, data.deliveryUpdates, data.orderStatus, data.offers)
    .then(responseData => {
      if (!responseData.data || !responseData.data.status || responseData.data.status !== 'SUCCESS'){
        formHelpers.handleErrors(responseData.data);
      }
    });
  }

}

FkMobileNotificationsFormCtrl.$inject = ['$scope', 'fkNotificationsService'];

export default FkMobileNotificationsFormCtrl;
