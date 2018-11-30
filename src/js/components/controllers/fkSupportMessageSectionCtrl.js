class FkSupportMessageSectionCtrl {
  constructor($rootScope, ngDialog, $scope, fkNotificationsService, fkUserService, fkHttp, fkUtils, API) {
    this.$rootScope = $rootScope;
    this.$scope = $scope;
    this.fkUserService = fkUserService;
    this.fkHttp = fkHttp;
    this.fkUtils = fkUtils;
    this.API = API;

    this.fkNotificationsService = fkNotificationsService;
    this.ngDialog = ngDialog;

    this.sendData = null;
    $scope.userData = {};

    $scope.userData = {
        firstname: fkUserService.user && fkUserService.user.firstName,
        lastname: fkUserService.user && fkUserService.user.lastName,
        email: fkUserService.user && fkUserService.user.username,
        homePhone: fkUserService.user && parseInt(fkUserService.user.mobileNumber.replace('(' , '').replace(')' , '').replace(' ', '').replace('-', ''), 10)
      };

    this.$postLink = () => {
      this.fkNotificationsService.contactUsInit().then((responsData) => {
        $scope.userData.ordersLength = responsData.previousOrders.length;
        $scope.userData.subjects = Object.values(responsData.subjects);
        $scope.userData.previousOrders = {};
        responsData.previousOrders.forEach(function(item){
          for (var key in item){
            if (item.hasOwnProperty(key)){
              $scope.userData.previousOrders[key] = item[key];
            }
          }
        });
      });

        $scope.formDescriptor = {
        id: 'support_message_form',
        url: fkUtils.replaceURLParams(API.sendMessage, {
          username: "username"}),
        method: 'POST',
        preSubmit: (data, formHelpers) => {
          return formHelpers.serialize(
            formHelpers.filterFields(
              data,
              [
                'subject',
                'orderId',
                'message',
                'firstname',
                'lastname',
                'email',
                'homePhone'
              ]
            )
          );

        },
        processResponse: (responsData) => {
          if (responsData.status === 'SUCCESS') {
        $rootScope.$broadcast('sendMessageClose');
        $rootScope.$broadcast('globalsendMessageClose');
        this.dialog = ngDialog.open({
          templateUrl: 'templates/fkContactUsMessageSent.html',
          appendClassName: 'fk-plantid-change-warning narrow',
          showClose: false,
          ariaRole: 'dialog',
          preCloseCallback: () => {
            this.dialog = null;
          }
        });
        this.$scope.$emit('fk-popup-opened', {
          name: 'fkContactUsMessageSent',
          type: 'Info Page'
        });

          }
        },
        actions: [
          {
            name: "submit",
            type: "submit",
            label: "SEND MESSAGE",
            validOnly: true
          }
        ],
        fields: [
          {
            name: 'firstname',
            label: 'First Name',
            type: 'text',
            cssClass: 'half firstname',
            required: true
          },
          {
            name: 'lastname',
            label: 'Last Name',
            type: 'text',
            cssClass: 'half lastname',
            required: true
          },
          {
            name: 'email',
            label: 'Email',
            type: 'email',
            required: true,
            cssClass: 'full additional'
          },
          {
            name: 'homePhone',
            label: 'Phone Number',
            cssClass: 'full',
            required: true,
            type: 'text'
          },
          {
            type: 'angular',
            cssClass: 'full additional',
            required: true,
            template: `<div class="full fk-custom-field">
              <label>Subject</label>
              <div class="select--wrapper">
              <select class="address-selector" ng-model="$ctrl.formData.subject" required="required">
              <option value="" disabled hidden selected="selected">Choose Subject</option>
              <option ng-repeat="subject in $ctrl.formData.subjects track by $index" value="{{$index}}">{{subject}}</option>
              </select>
              <fk-icon fk-icon-id="#down"></fk-icon>
              </div></div>`
          },
          {
            type: 'angular',
            cssClass: 'full additional',
            required: true,
            template: `<div class="full fk-custom-field" ng-if="$ctrl.formData.ordersLength>=1">
              <label>Order Number<span class="optional-text">Optional</span></label>
              <div class="select--wrapper">
              <select class="address-selector" ng-model="$ctrl.formData.orderId">
              <option value="" disabled hidden selected="selected">Choose Order Number</option>
              <option ng-repeat="(key,value) in $ctrl.formData.previousOrders" value="{{key}}">{{value}}</option>
              </select>
              <fk-icon fk-icon-id="#down"></fk-icon>
              </div></div>`
          },
          {
            name: 'message',
            label: 'How can we help you?',
            placeholder: 'Type your message here',
            cssClass: 'full',
            type: 'textarea',
            required: true
          }
        ]
      };
    };
  }

}

FkSupportMessageSectionCtrl.$inject = ['$rootScope', 'ngDialog', '$scope', 'fkNotificationsService', 'fkUserService', 'fkHttp', 'fkUtils', 'API'];

export default FkSupportMessageSectionCtrl;
