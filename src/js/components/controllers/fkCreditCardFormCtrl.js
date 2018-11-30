class FkCreditCardFormCtrl {
  constructor($rootScope, $scope, fkAddressService, API, FORMS, fkUtils, vcRecaptchaService, fkUserService, CAPTCHAKEY, CONFIG) {
    this.$rootScope = $rootScope;
    this.$scope = $scope;
    this.fkAddressService = fkAddressService;
    this.API = API;
    this.FORMS = FORMS;
    this.fkUtils = fkUtils;
    this.vcRecaptchaService = vcRecaptchaService;
    this.fkUserService = fkUserService;
    this.CAPTCHAKEY = (CONFIG.CAPTCHAKEY && CONFIG.CAPTCHAKEY.Payment) || CAPTCHAKEY.payment;

    this.$postLink = () => {
      let pm;

      $scope.setResponse = (response) => {
        $scope.captchaToken = response;
      };

      // preset some values
      $scope.paymentData = {
        paymentMethodType: 'CC',
        billState: {value: 'NY'},
        billCity: 'New York',
        billingCtry: {value: 'US'},
        cardBrand: "ALL",
        showAddresses: this.defaultAction === 'submit' && fkAddressService.addresses.length > 0,
        key: this.CAPTCHAKEY,
        setResponse : $scope.setResponse
      };

      $scope.paymentData.showCaptcha = this.fkUserService.CaptchaList.payment;

      $scope.paymentData.addresses = this.fdxAddresses();

      this.paymentUrl = API.accountAddPaymentMethod;

      if (this.paymentValidation) {
        this.paymentUrl = API.addAndSetPaymentMethod;
      }

      $scope.formDescriptor = {
        id: 'credit_card_form',
        url: fkUtils.replaceURLParams(this.paymentUrl, {username: "username"}),
        method: 'POST',
        preSubmit: (data, formHelpers) => {
          if (this.defaultAction !== 'edit') {
            this.setAddress();
          }

          if (this.dpPayment) {
            data.dlvPassCart = true;
          }

          if ($scope.captchaToken) {
            data.captchaToken = $scope.captchaToken;
          }

          return formHelpers.serialize(
            formHelpers.filterFields(
              data,
              [
                "paymentMethodId",
                "paymentMethodType",
                "accountHolder",
                "accountNumber",
                "cardBrand",
                "cardExpMonth",
                "cardExpYear",
                "csv",
                "billCity",
                "billState",
                "billAddress1",
                "billZipCode",
                "billingCtry",
                "billApt",
                "dlvPassCart",
                "captchaToken"
              ]
            )
          );
        },
        processResponse: (responsData) => {
          if (responsData.status === 'SUCCESS') {
            this.onPaymentChanged();
            if (this.defaultAction === 'edit' || this.defaultAction === 'submit') {
               $rootScope.$broadcast('fk-credit-card-change', {});
            }
            if ($scope.paymentData.showCaptcha) {
              this.fkUserService.checkLogin();
            }
          }
          return responsData;
        },
        showCaptcha : (resp) => {
          if (resp.status === 'FAILED' && resp.showCaptcha) {
            $scope.paymentData.showCaptcha = resp.showCaptcha;
            this.fkUserService.checkLogin();
            this.vcRecaptchaService.reload();
          }
        },
        actions: [
          {
            name: "submit",
            type: "submit",
            validOnly: true,
            label: this.defaultAction === 'edit' ? "SAVE CARD" : "SAVE NEW CARD"
          },
          {
            name: "reset",
            type: "reset",
            label: "Reset",
            hide: true
          },
          {
            name: "edit",
            label: "SAVE CARD",
            hide: true,
            url: fkUtils.replaceURLParams(API.editPaymentMethod, {username: "username"})
          },
          {
            name: "delete",
            type: "confirmation",
            showCondition: true,
            label: "Delete",
            buttonClass: this.hideDelete ? 'hide' : 'delete-card',
            icon: "#trash",
            action: (desc, data, originalData, formHelpers) => {
              formHelpers.submit({
                url: fkUtils.replaceURLParams(API.deletePaymentMethod, {username: 'username'}),
                data: fkUtils.postData({paymentMethodId: data.paymentMethodId, dlvPassCart:this.dpPayment})
              });
            }
          }
        ],
        fields: [
          {
            name: 'paymentMethodType',
            type: 'hidden'
          },
          {
            name: 'cardBrand',
            label: 'Type of Card',
            type: 'radio',
            options: [
              {name: 'ALL', value: 'ALL'},
              {name: 'Visa', value: 'VISA'},
              {name: 'Amex', value: 'AMEX'},
              {name: 'MasterCard', value: 'MC'},
              {name: 'Discover', value: 'DISC'}
            ],
            required: true
          },
          {
            name: 'accountHolder',
            label: 'Name',
            cssClass: 'full',
            placeholder: 'Name as it appears on the card',
            type: 'text',
            required: true
          },
          {
            name: 'accountNumber',
            label: 'Card Number',
            placeholder: '.... .... .... ....',
            cssClass: 'full',
            type: 'text',
            validators: [                 //TODO async refactor when possible
              (name, desc, data, origData, helpers) => {
                helpers.serialize(data);
                let error = 'ccnumber',
                    valid = false;
                switch (true) {
                  case /^4/.test(data.accountNumber):
                    $scope.paymentData.cardBrand = "VISA";
                    valid = true;
                    break;
                  case /^(5[1-5]\d{4}|677189)\d{10}$|^(222[1-9]|2[3-6]\d{2}|27[0-1]\d|2720)\d{12}/.test(data.accountNumber):
                    $scope.paymentData.cardBrand = "MC";
                    valid = true;
                    break;
                  case /^(6011)|^(622(1(2[6-9]|[3-9][0-9])|[2-8][0-9]{2}|9([01][0-9]|2[0-5])))|^(64[4-9])|^65/.test(data.accountNumber):
                    $scope.paymentData.cardBrand = "DISC";
                    valid = true;
                    break;
                  case /^(34)|^(37)/.test(data.accountNumber):
                    $scope.paymentData.cardBrand = "AMEX";
                    valid = true;
                    break;
                }
                if (this.defaultAction === 'edit') {
                  valid = true;
                }
                return [{error: error, valid: valid}];
              }
            ],
            required: true
          },
          {
            name: 'cardExpMonth',
            label: 'Exp.',
            placeholder: 'M',
            cssClass: 'small',
            type: 'select',
            options: (() => {
              let i, v, months = [];

              for (i = 1; i < 13; i++) {
                v = i < 10 ? "0"+i : ""+i;

                months.push({
                  name: v,
                  value: v
                });
              }

              return months;
            })(),
            required: true
          },
          {
            name: 'cardExpYear',
            label: ' ',
            placeholder: 'Y',
            cssClass: 'small',
            type: 'select',
            options: (() => {
              let i, v, years = [], thisYear = (new Date()).getFullYear();

              for (i = 0; i < 20; i++) {
                v = thisYear + i;

                years.push({
                  name: ""+(v-2000),
                  value: ""+v
                });
              }

              return years;
            })(),
            required: true
          },
          {
            name: 'csv',
            label: 'CVV',
            placeholder: 'Used for validation',
            cssClass : 'medium',
            type: 'text',
            required :true
          },
          {
            type: 'angular',
            cssClass: 'full',
            template: ''+
              '<div class="full fk-custom-field" ng-if="data.addresses.length > 0">'+
              '<input id="credit_card_form_existingAddress" ng-model="data.showAddresses" name="existingAddress" type="checkbox" ng-checked="data.showAddresses">'+
              '<label for="credit_card_form_existingAddress">Use Existing Address</label>'+
              '<div class="select--wrapper" ng-if="data.showAddresses">'+
              '<select class="address-selector" ng-model="data.billingAddressId" required="required">'+
              '<option value="" disabled hidden selected="selected">Choose existing billing address</option>'+
              '<option ng-repeat="a in data.addresses" value="{{a.id}}">{{a.street1}},{{a.city}} {{a.state}} {{a.postalCode}}</option>'+
              '</div>'+
              '</div>'
          },
          {
            name: 'billAddress1',
            cssClass: 'billing full',
            label: 'Street Address',
            labelType: 'float',
            type: 'text',
            required: true
          },
          {
            name: 'billApt',
            cssClass: 'billing full',
            label: 'Apartment',
            labelType: 'float',
            type: 'text'
          },
          {
            name: 'billCity',
            cssClass: 'billing half',
            label: 'City',
            labelType: 'float',
            type: 'text',
            required: true
          },
          {
            name: 'billState',
            cssClass: 'billing half',
            label: 'State/Province',
            labelType: 'float',
            type: 'select',
            options: FORMS.states,
            required: true
          },
          {
            name: 'billZipCode',
            cssClass: 'billing half',
            label: 'Zip Code',
            labelType: 'float',
            type: 'text',
            pattern: '\\d{5}',
            required: true
          },
          {
            name: 'billingCtry',
            cssClass: 'billing half',
            label: 'Country',
            labelType: 'float',
            type: 'select',
            options: FORMS.countries,
            required: true
          },
          {
            type: 'angular',
            cssClass: 'full',
            template:'<div class="captcha-block" ng-if="data.showCaptcha"><div vc-recaptcha key="data.key" on-success="data.setResponse(response)"></div></div>'
          }

        ],
        errors: {
          ccnumber: "This card number is not valid."
        }
      };

      if (this.paymentMethod) {
        pm = this.paymentMethod;

        angular.copy({
          paymentMethodId: pm.id,
          accountHolder: pm.name,
          accountNumber: pm.maskedAccountNumber,
          cardBrand: this.getCardBrand(pm.cardType.toUpperCase()),
          cardExpMonth: {value: pm.expirationMonth},
          cardExpYear: {value: pm.expirationYear},
          csv: ' ',
          billCity: pm.billingAddress.city,
          billState: {value: pm.billingAddress.state},
          billingCtry: {value: pm.billingAddress.country},
          billAddress1: pm.billingAddress.street1,
          billZipCode: pm.billingAddress.postalCode,
          billApt: pm.billingAddress.apartment,
          addresses: this.fdxAddresses(),
          showCaptcha: $scope.paymentData.showCaptcha,
          key: this.CAPTCHAKEY.payment,
          setResponse: $scope.setResponse
        }, $scope.paymentData);

        $scope.formDescriptor.fields.filter(f => f.name === 'accountNumber').forEach(f => {
          f.disabled = true;
        });
      }

      $scope.$watch("paymentData.billingAddressId", () => {
        this.setAddress();
      });
    };

  }

  getCardBrand(bn) {
    bn = bn.toUpperCase();

    if (bn === 'MASTERCARD') {
      bn = 'MC';
    }
    if (bn === 'DISCOVER') {
      bn = 'DISC';
    }

    return bn;
  }

  hashAddress(o, exclude = []) {
    function getReplacer(result) {
      let path = new Map();
      let replacer = function(key,value) {
          let pathString = path.get(this) || '';
          if (exclude.some(r => r.test(pathString+key))) {
              return '';
          }
          if ( typeof value === 'object') {
              path.set(value, pathString + key + '/');
              return value;
          }
          result.push(`${pathString}${key}|${value}`);
          return value;
      };

      return replacer;
    }

    let result = [];
    JSON.stringify(o, getReplacer(result));
    return result.sort().join('-');
}

  fdxAddresses() {
    let filteredAddresses = {};
    let fdxAdresses = this.fkAddressService.addresses.filter( address => !address.availableServiceTypes || address.availableServiceTypes.indexOf('FDX') > -1);

    if (fdxAdresses.length) {
      filteredAddresses = fdxAdresses.reduce((p, address) => {
        let hashedAddress = this.hashAddress(address, [/\/id/]);

        p[hashedAddress] = address;

        return p;
      }, {});
    }

    return Object.keys(filteredAddresses).map(e => filteredAddresses[e]);
  }

  setAddress() {
    if (this.$scope.paymentData.addresses) {
      this.$scope.paymentData.addresses.forEach( address => {
        if (address.id === this.$scope.paymentData.billingAddressId) {
          this.$scope.paymentData.billCity = address.city;
          this.$scope.paymentData.billState = {value: address.state};
          this.$scope.paymentData.billingCtry = {value: address.country || 'US' }; //TODO this should be a constant
          this.$scope.paymentData.billAddress1 = address.street1;
          this.$scope.paymentData.billZipCode = address.postalCode;
          this.$scope.paymentData.billApt = address.apartment || '';
        }
      });
    }
  }

}

FkCreditCardFormCtrl.$inject = ['$rootScope', '$scope', 'fkAddressService', 'API', 'FORMS', 'fkUtils', 'vcRecaptchaService', 'fkUserService', 'CAPTCHAKEY', 'CONFIG'];

export default FkCreditCardFormCtrl;
