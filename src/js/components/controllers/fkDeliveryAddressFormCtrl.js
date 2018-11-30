class FkDeliveryAddressFormCtrl {
  constructor($rootScope, $scope, fkUserService, fkHttp, fkUtils, API, FORMS) {
    this.$rootScope = $rootScope;
    this.$scope = $scope;
    this.fkUserService = fkUserService;
    this.fkHttp = fkHttp;
    this.fkUtils = fkUtils;
    this.API = API;
    this.FORMS = FORMS;

    this.sendData = null;

    this.$postLink = () => {
      $scope.deliveryData = {
        dlvServiceType: 'HOME',
        state: {value: 'NY'},
        shipToAddressId: null
      };

      if (this.editData) {
        $scope.deliveryData = {
          dlvfirstname: this.editData.firstName,
          dlvlastname: this.editData.lastName,
          dlvcompanyname: this.editData.companyName,
          dlvhomephone: this.editData.contactPhoneNumber.phone,
          dlvhomephoneext: this.editData.contactPhoneNumber.extension,
          address1: this.editData.street1,
          address2: this.editData.street2,
          apartment: this.editData.apartment,
          city: this.editData.city,
          state: {value: this.editData.state},
          zipcode: Number(this.editData.postalCode),
          deliveryInstructions: this.editData.deliveryInstruction,
          doorman: this.editData.altType === 'DOORMAN' ? true : false,
          dlvServiceType: 'HOME',
          shipToAddressId: this.editData.id
        };
        this.oldPhone = this.editData.contactPhoneNumber.phone;
      }

      $scope.formDescriptor = {
        id: 'delivery_address_form',
        url: fkUtils.replaceURLParams(API.addAndSetDeliveryAddress, {
          username: "username"}),
        method: 'POST',
        preSubmit: data => {
          this.sendData = {
            dlvfirstname: data.dlvfirstname,
            dlvlastname: data.dlvlastname,
            dlvcompanyname: data.dlvcompanyname,
            dlvhomephone: data.dlvhomephone.replace(/[^\d]/g, ''),
            dlvhomephoneext: data.dlvhomephoneext && data.dlvhomephoneext.replace(/[^\d]/g, '') || "",
            address1: data.address1 ,
            address2: data.address2 || "",
            apartment: data.apartment || "",
            city: data.city,
            state: data.state.value,
            zipcode: data.zipcode,
            country: "US",
            deliveryInstructions: data.deliveryInstructions || "",
            doorman: data.doorman || "false",
            dlvServiceType: data.dlvcompanyname ? "CORPORATE" : "HOME"
          };

          if ($scope.$ctrl.defaultAction === 'edit') {
            this.sendData.shipToAddressId = data.shipToAddressId;
          }

          if (this.oldPhone !== this.sendData.dlvhomephone) {
            $rootScope.$broadcast('fk-delivery-address-refreshed', {
              changedPhoneNumber: data.dlvhomephone
            });
          }

          return this.sendData;
        },
        processResponse: (responsData) => {
          if (responsData.status === 'SUCCESS') {
            this.onAddressSaved();
          }
        },
        actions: [
          {
            name: "submit",
            type: "submit",
            label: "SAVE ADDRESS"
          },
          {
            name: "reset",
            type: "reset",
            label: "Reset",
            hide: true
          },
          {
            name: "addandset",
            label: "Add and set delivery address",
            url: fkUtils.replaceURLParams(API.addAndSetDeliveryAddress, { username: "username"}),
            hide: true
          },
          {
            name: "edit",
            label: "Edit delivery address",
            url: fkUtils.replaceURLParams(API.editCheckoutDeliveryAddress, { username: "username"}),
            hide: true
          },
          {
            name: "Delete",
            buttonClass: this.hideDelete ? 'hide' : 'delete-address',
            label: "Delete",
            type: "confirmation",
            showCondition: true,
            title: "Delete address",
            message: "Are you sure?",
            icon: "#trash",
            action: (desc, data, originalData, formHelpers) => {
              formHelpers.submit({
                url: fkUtils.replaceURLParams(API.deleteDeliveryAddress, { username: "username"}),
                data: fkUtils.postData({shipToAddressId: data.shipToAddressId})
              });
            }
          }
        ],
        fields: [
          {
            name: 'dlvfirstname',
            label: 'First Name',
            type: 'text',
            cssClass: 'half',
            required: true
          },
          {
            name: 'dlvlastname',
            label: 'Last Name',
            cssClass: 'half',
            type: 'text',
            required: true
          },
          {
            name: 'dlvcompanyname',
            placeholder: 'Company Name',
            label: 'Company Name',
            cssClass: 'full',
            required: false,
            optionalText: 'Req. for Office',
            type: 'text'
          },
          {
            name: 'dlvhomephone',
            label: 'Phone Number',
            cssClass: 'half',
            type: 'text',
            required: true
          },
          {
            name: 'dlvhomephoneext',
            label: 'Ext.',
            placeholder: 'Phone Extension',
            cssClass: 'half',
            type: 'text',
            pattern: '^\\d{0,5}$'
          },
          {
            name: 'address1',
            placeholder: 'Street Address',
            label: 'Address',
            cssClass: 'full',
            required: true,
            type: 'text'
          },
          // TODO
          // {
          //   name: 'address2',
          //   placeholder: 'Address',
          //   label: 'Address 2',
          //   labelType: 'float',
          //   type: 'textarea'
          // },
          {
            name: 'apartment',
            label: 'Apt#/Suite',
            placeholder: 'Apartment',
            cssClass: 'full',
            type: 'text'
          },
          {
            name: 'city',
            label: 'City',
            cssClass: 'half',
            required: true,
            type: 'text'
          },
          {
            name: 'state',
            label: 'State',
            cssClass: 'state',
            required: true,
            type: 'select',
            options: FORMS.states
          },
          {
            name: 'zipcode',
            label: 'Zip',
            placeholder: 'Zip',
            cssClass: 'zip',
            required: true,
            type: 'number',
            pattern: '^\\d{5}$'
          },
          {
            name: 'deliveryInstructions',
            label: 'Delivery Instructions',
            placeholder: 'e.g. Buzzer is broken, please call.',
            cssClass: 'full',
            type: 'text'
          },
          {
            name: 'doorman',
            placeholder: 'Leave with doorman',
            cssClass: 'full',
            type: 'checkbox'
          }
          //TODO Are we need it?
          // {
          //   name: 'dlvServiceType',
          //   placeholder: 'Service Type',
          //   type: 'select',
          //   required: true,
          //   options: [{name: 'HOME'}, {name: 'CORPORATE'}, {name: 'DEPOT'}, {name: 'PICKUP'}, {name: 'WEB'}, {name: 'IPHONE'}, {name: 'ANDROID'}, {name: 'PREREG'}, {name: 'FDX'}, {name: 'NONE'}]
          // }
        ]
      };

    };

    $scope.$on('fk-user-change', () => {
      if (fkUserService.user) {
        $scope.deliveryData.dlvfirstname = fkUserService.user.firstName;
        $scope.deliveryData.dlvlastname = fkUserService.user.lastName;
        $scope.deliveryData.shipToAddressId = null;
      }
    });
  }
}

FkDeliveryAddressFormCtrl.$inject = ['$rootScope', '$scope', 'fkUserService', 'fkHttp', 'fkUtils', 'API', 'FORMS'];

export default FkDeliveryAddressFormCtrl;
