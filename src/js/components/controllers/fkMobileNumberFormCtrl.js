class FkMobileNumberFormCtrl {
  constructor($rootScope, $scope, fkAddressService, fkUserService, fkUtils, API) {
    this.$rootScope = $rootScope;
    this.$scope = $scope;
    this.fkAddressService = fkAddressService;
    this.fkUserService = fkUserService;
    this.fkUtils = fkUtils;
    this.API = API;

    this.$postLink = () => {
      $scope.mobileNumberData = {
        mobileNumber: this.phoneNumber
      };
    };

    $scope.formDescriptor = {
      id: 'mobile_number_form',
      url: fkUtils.replaceURLParams(API.mobileNumber, {username: "username"}),
      method: 'POST',
      preSubmit: data => {
        return {
          mobile_number : data.mobileNumber.replace(/[^\d]/g, ''),
          order_notices : data.order ? 'Y' : 'N',
          order_exceptions : data.order ? 'Y' : 'N',
          offers : data.offers ? 'Y' : 'N'
        };
      },
      processResponse: (responsData) => {
        fkUserService.updateUser(responsData);
        $rootScope.$broadcast('fk-mobile-number-add', {data: responsData});
      },
      actions: [
        {
          name: 'submit',
          type: 'submit',
          label: 'SAVE'
        }
      ],
      fields: [
        {
          name: 'mobileNumber',
          label: 'Mobile Number',
          placeholder: '(xxx) xxx - xxxx',
          type: 'text',
          required: true
        },
        {
          name: 'order',
          label: 'Receive Order SMS Alerts',
          type: 'checkbox',
          value: 'Y'
        },
        {
          name: 'offers',
          label: 'Receive Amazing Food Deals & Offers SMS Alerts',
          type: 'checkbox',
          value: 'Y'
        }
      ]
    };
  }

}

FkMobileNumberFormCtrl.$inject = ['$rootScope', '$scope', 'fkAddressService', 'fkUserService', 'fkUtils', 'API'];

export default FkMobileNumberFormCtrl;
