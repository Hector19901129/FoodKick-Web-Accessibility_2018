class FkBankFormCtrl {
  constructor($rootScope, $scope, fkUserService, fkPaymentMethodService, fkAddressService, fkUtils, ngDialog, API, FORMS) {
    this.$rootScope = $rootScope;
    this.$scope = $scope;
    this.fkUserService =fkUserService;
    this.fkPaymentMethodService = fkPaymentMethodService;
    this.fkAddressService = fkAddressService;
    this.fkUtils = fkUtils;
    this.ngDialog = ngDialog;
    this.API = API;
    this.FORMS = FORMS;
    this.$postLink = () => {

      $scope.form_id = "bank_form";
      $scope.editType = "";
      $scope.bankFormData = {};
      this.isEdit = this.defaultAction === "edit" ? true : false;
      this.showAddresses = !this.isEdit && this.fkAddressService.addresses.length > 0;

      if (fkUserService.user && fkUserService.user.username) {
        $scope.username = fkUserService.user.username;
      } else {
        $scope.username = "username";
      }

      fkPaymentMethodService.getPaymentMethods().then((payments) => {
        $scope.paymentMethods = payments;
        $scope.bankFormInit();
      });

      fkAddressService.getSelectedDeliveryAddress().then( (selectedAddress) => {
        $scope.selectedAddress = selectedAddress || null;

        if ( selectedAddress && selectedAddress.id) {
          $scope.bankFormData.billingAddressId = selectedAddress.id;
          if ( this.defaultAction !== "edit" ) {
            $scope.selectDeliveryAddressPopulate( $scope.selectedAddress );
          }
        }
        $scope.bankFormData.addresses = $scope.addresses = this.fdxAddresses();
      });

      $scope.formDescriptor = {
        id: $scope.form_id,
        url: fkUtils.replaceURLParams(API.addPaymentMethod, {
          username: $scope.username
        }),
        method: 'POST',
        preSubmit: (data) => {
          if ( $scope.getFormScope().$valid ) {
            data = $scope.finalizeBankFormData( data );
            data.paymentMethodType = "EC";

            if (this.dpPayment) {
              data.dlvPassCart = true;
            }

            return data;
          }
          return false;
        },
        processResponse: (responsData) => {
          if ( responsData.status === "SUCCESS" ) {
            this.onPaymentChanged();
            if (this.defaultAction === 'edit' || this.defaultAction === 'new_acct') {
              $rootScope.$broadcast('fk-credit-card-change', {});
            }
          } else if ($scope.editType === "edit") {
            let errorMsg = "";
            if ( responsData.data && responsData.data.errors ) {
              for (let key in responsData.data.errors ) {
                if ( typeof responsData.data.errors[key] === "string" ) {
                  errorMsg += responsData.data.errors[key] + "<br/>";
                }
              }
            }
            document.getElementById("APIerrMsg").innerHTML = errorMsg;
          }
        },
        actions: [
        {
          name: "submit",
          type: "submit",
          label: "Save Bank Account",
          validOnly: true,
          showCondition: "($ctrl.defaultAction === 'edit')? false : true",
          buttonClass: "bank_form_submit button-primary"
        },
        {
          name: "delete",
          label: "Delete",
          showCondition: "($ctrl.defaultAction == 'edit')? true : false",
          type: "confirmation",
          icon: "#trash",
          buttonClass: 'delete-card bank_form_delete',
          action: (desc, data, originalData, formHelpers) => {
            $scope.editType = "del";
            formHelpers.submit({
              url: fkUtils.replaceURLParams(API.deletePaymentMethod, {username: $scope.username}),
              data: fkUtils.postData({paymentMethodId: data.paymentMethodId, dlvPassCart: this.dpPayment})
            });
          }
        },
        {
          name: "edit",
          label: "Save Bank Account",
          validOnly: true,
          buttonClass: "button-primary half bank_form_edit",
          showCondition: "($ctrl.defaultAction === 'edit')? true : false",
          action: (desc, data, originalData, formHelpers) => {
            $scope.editType = "edit";
            let tempData = {};
            tempData = $scope.finalizeBankFormData( data );
            formHelpers.submit({
              url: fkUtils.replaceURLParams(API.editPaymentMethod, {username: $scope.username}),
              data: fkUtils.postData(tempData)
            });
          }
        },
        {
          name: "showBankEditOptions",
          action: () => {
            $scope.showBankEditOptions();
          },
          hide: true
        },
        {
          name: "showAddressOptions",
          action: () => {
            $scope.showAddressOptions();
          },
          hide: true
        }
        ],
        fields: [
        {
          type: "angular",
          template: `<div id="APIerrMsg" class="errors"></div>`
        },
        {
          name: 'bankAccountType',
          placeholder: 'Bank Account Type',
          type: 'radio',
          required: true,
          options: [{
            name: 'Checking',
            value: "C"
          }, {
            name: 'Savings',
            value: "S"
          }]
        },
        {
          name: 'accountHolder',
          placeholder: 'Jane Dough',
          label: 'Name',
          type: 'text',
          required: true
        },
        {
          name: 'bankName',
          placeholder: 'e.g. TD Bank, Chase Bank, etc',
          label: 'Bank',
          type: 'text',
          required: true
        },
        {
          name: 'accountNumber',
          placeholder: '0123456012',
          label: 'Account Number',
          type: 'text',
          maxlength: '21',
          pattern: this.isEdit ? null : '[0-9\s]{5,21}',
          cssClass: this.isEdit ? "optionalDisabledField" : "",
          required: this.isEdit ? false : true,
          disabled: this.isEdit ? true : false
        },
        {
          type: 'angular',
          cssClass: 'full',
          template: `<fk-icon fk-icon-id="#info-i-isolated" class="info-icon-acct-i" ng-if="$ctrl.defaultAction !== 'edit'">
          <div class="info-icon-acct-content" style="background-image: url(/assets/img/svg/check-account.svg);">
            <span class="Find-your-account-nu">Find your account number at the bottom of the check.</span>
            <span class="Account-number">Account number</span>
          </div></fk-info-icon>`
        },
        {
          name: 'accountNumberVerify',
          placeholder: '0123456012',
          label: 'Verify Account Number',
          type: 'text',
          maxlength: '21',
          pattern: this.isEdit ? null : '[0-9\s]{5,21}',
          fkFieldCompareTo: {
            fieldName: 'accountNumber',
            errMsg: 'Does not match Account Number'
          },
          cssClass: this.isEdit ? "hide" : "",
          required: this.isEdit ? false : true,
          disabled: this.isEdit ? true : false
        },
        {
          name: 'abaRouteNumber',
          placeholder: '1234567890',
          label: 'Routing Number',
          type: 'text',
          maxlength: '9',
          pattern: this.isEdit ? null : '[0-9]{9,9}',
          cssClass: this.isEdit ? "optionalDisabledField" : "",
          required: this.isEdit ? false : true,
          disabled: this.isEdit ? true : false
        },
        {
          type: 'angular',
          cssClass: 'full',
          template: `<fk-icon fk-icon-id="#info-i-isolated" class="info-icon-rout-i" ng-if="$ctrl.defaultAction !== 'edit'">
          <div class="info-icon-rout-content" style="background-image: url(/assets/img/svg/check-routing.svg);">
            <span class="Find-your-routing-nu">Find your routing number at the bottom of the check.</span>
            <span class="Routing-Number">Routing number</span>
          </div>
          </fk-info-icon>`
        },
        {
          type: 'angular',
          cssClass: 'full',
          template: `<div id="existingAddress"><div class="full fk-custom-field">
            <input id="credit_card_form_existingAddress" ng-model="data.showAddresses" name="existingAddress" type="checkbox" ng-checked="data.showAddresses">
            <label for="credit_card_form_existingAddress">Use Existing Address</label>
            <div class="select--wrapper" ng-if="data.showAddresses">
            <select class="address-selector" ng-model="data.billingAddressId" required="required">
            <option value="" selected="selected" ng-if="!data.addresses">loading...</option>
            <option value="" disabled hidden selected="selected" ng-if="data.addresses">Choose existing billing address</option>
            <option ng-repeat="a in data.addresses" value="{{a.id}}">{{a.street1}},{{a.city}} {{a.state}} {{a.postalCode}}</option>
            </select>
            <fk-icon fk-icon-id="#down"></fk-icon>
            </div>
            </div></div>`
        },
        {
          name: 'billAddress1',
          placeholder: '23-30 Borden Ave',
          label: 'Address',
          required: true,
          cssClass: 'billing full',
          type: 'text'
        },
        {
          name: 'billApt',
          placeholder: 'Apartment, Suite, Unit, Building, Floor, Etc.',
          label: 'Apt#/Suite',
          cssClass: 'billing full',
          type: 'text'
        },
        {
          name: 'billCity',
          placeholder: 'Queens',
          label: 'City',
          required: true,
          cssClass: 'billing half',
          type: 'text'
        },
        {
          name: 'billState',
          placeholder: 'State',
          cssClass: 'billing half',
          type: 'select',
          required: true,
          options: FORMS.states
        },
        {
          name: 'billZipCode',
          placeholder: '11101',
          label: 'Zip',
          cssClass: 'billing half',
          required: true,
          type: 'text',
          pattern: '\\d{5}'
        },
        {
          name: 'billingCtry',
          placeholder: 'Country',
          cssClass: 'billing half',
          type: 'select',
          required: true,
          disabled: true,
          options: FORMS.countries
        }
      ]
    };

      $scope.$watch("bankFormData", () => {
        if ( !angular.equals({}, $scope.bankFormData) ) {
          if ( typeof $scope.actions !== "object" ) {
            let ae = angular.element( document.getElementById($scope.form_id+"_chooseExistingBankAccount") );
            if (ae.data()) {
              $scope.actions = ae.data().$scope.actions;
            }
          }

          if ( null !== $scope.getFormScope() ) {
            $scope.getFormScope().editMode = this.defaultAction === "new_acct" ? false : true;
          }
        }
      }, true);

      $scope.$watch("bankFormData.billingAddressId", () => {
        if ( $scope.addresses && $scope.addresses.length > 0 ) {
          for ( let i=0; i < $scope.addresses.length; i++ ) {
            if ( $scope.bankFormData.billingAddressId === $scope.addresses[i].id ) {
              $scope.selectDeliveryAddressPopulate( $scope.addresses[i] );
              break;
            }
          }
        }
      });

      $scope.showAddressOptions = () => {
        ngDialog.open({
          templateUrl: 'templates/fkAddressSelector.html',
          appendClassName: 'confirm-popup',
          showClose: false,
          ariaRole: 'dialog',
          scope: $scope
        });
      };

      $scope.selectDeliveryAddressPopulate = (address) => {
        $scope.bankFormData.accountHolder = address.hasOwnProperty("name") ? address.name : address.firstName + " " + address.lastName;
        $scope.bankFormData.billAddress1 = address.street1;
        $scope.bankFormData.billApt = address.apartment;
        $scope.bankFormData.billCity = address.city;
        $scope.bankFormData.billZipCode = parseFloat(address.postalCode);
        $scope.bankFormData.billState = {value: address.state };
        $scope.bankFormData.billingCtry = {value: "US" };
      };

      $scope.showBankEditOptions = () => {
        ngDialog.open({
          templateUrl: 'templates/fkBankPaymentMethodSelect.html',
          appendClassName: 'confirm-popup',
          ariaRole: 'dialog',
          scope: $scope
        });
      };

      $scope.selectBankInfoPopulate = (bankAccount) => {

        $scope.bankFormData.paymentMethodId = bankAccount.id;
        $scope.bankFormData.bankName = bankAccount.bankName;
        $scope.bankFormData.bankAccountType = bankAccount.description === "Checking Account" ? "C" : "S";
        $scope.bankFormData.abaRouteNumber = bankAccount.routing;
        $scope.bankFormData.accountNumber = bankAccount.maskedAccountNumber;
        $scope.bankFormData.accountNumberVerify = '';
        $scope.selectDeliveryAddressPopulate( bankAccount.billingAddress );
        this.defaultAction = "edit";
      };

      $scope.getFormScope = () => {
        let form_ae = angular.element( document.getElementById($scope.form_id) );
          if ( typeof form_ae.data() == "object" ) {
            return form_ae.data().$formController;
          }
        return null;
      };

      $scope.finalizeBankFormData = (bankFormData) => {
        let finalizedBankFormData = {};
        let propBlackList = ["showAddresses", "billingAddressId"];
        for ( let prop in bankFormData ) {
          if ( !this.isInArray(prop, propBlackList) ) {
            if ( typeof bankFormData[prop] === "object" ) {
              finalizedBankFormData[prop] = bankFormData[prop].value;
            } else {
              finalizedBankFormData[prop] = bankFormData[prop];
            }
          }
        }
        return finalizedBankFormData;
      };

      $scope.bankFormInit = () => {
        if (fkUserService.user) {
          if ( $scope.$parent.$parent.paymentToEdit && typeof $scope.$parent.$parent.paymentToEdit == "object"
            && $scope.$parent.$parent.paymentToEdit.id && $scope.$parent.$parent.paymentToEdit.id.length > 0 ) {
            this.defaultAction = $scope.editType = "edit";
            $scope.selectBankInfoPopulate( $scope.$parent.$parent.paymentToEdit, "checkout" );
          }
          $scope.bankFormData.billingCtry = {value: "US" };
          $scope.bankFormData.billingAddressId = '';
          $scope.bankFormData.showAddresses = this.showAddresses;
          if (this.defaultAction !== "edit") {
            $scope.bankFormData.bankAccountType = "C";
          }
          this.paymentUrl = API.accountAddPaymentMethod;
          if (this.paymentValidation) {
            this.paymentUrl = API.addAndSetPaymentMethod;
          }
          $scope.formDescriptor.url = fkUtils.replaceURLParams(this.paymentUrl, {
            username: fkUserService.user.username
          });

          if ( fkUserService.user.totalOrderCount > 0 ) {
            $scope.bankFormOn = true;
            let tempODarr = ngDialog.getOpenDialogs();
            $scope.dialogID = tempODarr[tempODarr.length - 1];
          }
        }
      };

      $scope.$on('fk-user-change', () => {
        $scope.bankFormInit();
      });
    };
  }

  isInArray(value, array) {
    return array.indexOf(value) > -1;
  }

  fdxAddresses() {
    return this.fkAddressService.addresses.filter( address => !address.availableServiceTypes || address.availableServiceTypes.indexOf('FDX') > -1);
  }
}

FkBankFormCtrl.$inject = ['$rootScope', '$scope', 'fkUserService', 'fkPaymentMethodService', 'fkAddressService', 'fkUtils', 'ngDialog', 'API', 'FORMS'];

export default FkBankFormCtrl;
