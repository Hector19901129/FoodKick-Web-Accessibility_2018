class FkCheckoutCtrl {
  constructor($scope, $element, fkCartService, fkAddressService, fkDeliveryTimeslotService, fkUserService, fkPaymentMethodService, fkHttp, fkUtils, API, ngDialog, $q, $log, $timeout, $rootScope, $state, fkBoldChatService, fkOrderModifyService, fkOrderService) {
    this.$scope = $scope;
    this.$element = $element;
    this.fkCartService = fkCartService;
    this.fkAddressService = fkAddressService;
    this.fkDeliveryTimeslotService = fkDeliveryTimeslotService;
    this.fkUserService = fkUserService;
    this.fkPaymentMethodService = fkPaymentMethodService;
    this.fkHttp = fkHttp;
    this.fkUtils = fkUtils;
    this.API = API;
    this.ngDialog = ngDialog;
    this.$q = $q;
    this.$log = $log;
    this.$timeout = $timeout;
    this.$rootScope = $rootScope;
    this.$state = $state;
    this.fkBoldChatService = fkBoldChatService;
    this.fkOrderModifyService = fkOrderModifyService;
    this.fkOrderService = fkOrderService;
    this.submitText = 'PAY';
    this.modifySubmitText = 'SAVE CHANGES';
    $scope.avoidMultipleClick = false;
    this.dialog = null;
    this.updateDialog = null;

    $scope.triggerChat = () => fkBoldChatService.triggerChat();

    //FKW-203. Ability to add bank accounts should only be restricted to those with a completed order and a credit card already on file

    $scope.isModify = () => fkOrderModifyService.getModifyState();
    $scope.selectedPaymentMethod = () => {
      return fkPaymentMethodService.selectedPaymentMethod;
    };

    $scope.phoneNumberUpdate = () => {
      if (!this.updateDialog) {
        this.updateDialog = ngDialog.open({
          templateUrl: 'templates/fkDeliveryPhonePopup.html',
          appendClassName: 'fk-general-notifications narrow',
          showClose: false,
          ariaRole: 'dialog',
          scope: $scope,
          preCloseCallback: () => {
            this.updateDialog = null;
          }
        });

        this.$scope.$emit('fk-popup-opened', {
          name: 'fkDeliveryPhoneUpdate',
          type: 'Info Page'
        });
      }
    };

    $scope.addDeliveryPass = () => {
      if (!this.updateDialog) {
        this.updateDialog = ngDialog.open({
          templateUrl: 'templates/fkDeliveryPassCheckout.html',
          appendClassName: 'fk-deliverypass-checkout',
          showClose: false,
          ariaRole: 'dialog',
          scope: $scope,
          preCloseCallback: () => {
            this.updateDialog = null;
          }
        });

        this.$scope.$emit('fk-deliverypass-click', {type: 'free'});

        this.$scope.$emit('fk-popup-opened', {
          name: 'fkCheckoutDeliveryPass',
          type: 'Info Page'
        });
      }
    };

    $rootScope.$on('fk-cart-dpItem', (ev, data) => {
      $scope.dpcartLineItem = data.lineItem;
    });

    $scope.removeDeliveryPass = (dpcartLineItem) => {
      $rootScope.$broadcast('fk-cart-change', {lineItem: dpcartLineItem, method: 'delete'});
      fkCartService.getOrderDetail(false);
      $scope.dpcartLineItem = {};
    };

    $rootScope.$on('fk-close-dpdialog', () => {
      if (this.updateDialog){
        this.updateDialog.close();
      }
    });

    $scope.bankFormOn = () => fkUserService.user && fkUserService.user.totalOrderCount > 0;

    fkPaymentMethodService.refreshPaymentMethodsCache().then((response) => {
      $rootScope.$emit('fk-costep-payment', response);
    });
    // this.smsPopup = null;
    // this.askedMobileNumber = false;
    const hideErrors = ['ERR_AGE_VERIFICATION', 'ERR_ATP_FAILED', 'didnot_agree'];
    const filterErrors = (errors) => Object.keys(errors).filter((k) => hideErrors.indexOf(k) === -1).reduce((p, c) => {
      p[c] = errors[c];
      return p;
    }, {});

    $scope.fkDeliveryTimeslotService = fkDeliveryTimeslotService;
    $scope.fkCartService = fkCartService;
    $scope.fkAddressService = fkAddressService;

    $scope.selectedTimeslot = null;
    $scope.selectedTip = null;
    $scope.show = null;
    $scope.tip = false;
    $scope.expired = null;
    $scope.errors = {};

    $scope.error = () => Object.keys($scope.errors).length ? true : false;

    $scope.isHidden = type => $scope.show !== null && $scope.show !== type ? 'hidden' : '';

    $scope.isError = variable => variable && $scope.error() ? 'error' : '';

    $scope.isSelected = type => $scope.show === type ? 'selected' : '';

    $scope.isSelectedDone = type => $scope.show === type ? 'selected-done' : '';

    $scope.isSelectedElem = type => $scope.show === type ? 'done' : 'hidden';

    $scope.elemSelector = type => $scope.show === type ? '' : 'hidden';

    $scope.hideElement = type => $scope.show === type ? 'hidden' : '';

    $scope.removeAlcohol = () => {
      fkCartService.removeAllAlcohol();
      $scope.hideCheckout();
    };

    $scope.learnMore = () => {
      this.dialog = ngDialog.open({
        templateUrl: 'templates/fkDeliveryRestrictionAlert.html',
        appendClassName: 'fk-delivery-time-warning narrow',
        showClose: false,
        ariaRole: 'dialog',
        scope: $scope,
        preCloseCallback: () => {
          this.dialog = null;
        }
      });
    };

    $scope.verifyAge = () => {
      fkCartService.verifyAge().then(() => {
        $scope.errors = {};
        $scope.show = null;
        $scope.submit();
      });
    };

    // if (fkAddressService.addresses.length !== 0) {
    //   this.askedMobileNumber = true;
    // }
    //
    if (fkAddressService.selectedAddress) {
      $rootScope.$emit('fk-costep-address', fkAddressService.selectedAddress);
      if (!this.fkAddressService.selectedAddress.contactPhoneNumber.phone) {
        $scope.phoneNumberUpdate();
      }
      fkDeliveryTimeslotService.getTimeslots().then((responsData) => {
        if (responsData.selectedTimeslot && responsData.selectedTimeslot.id) {
          $rootScope.$emit('fk-costep-timeslot', responsData.selectedTimeslot);
        }
        $scope.selectedTimeslot = responsData.selectedTimeslot;
        $scope.timeSlotsAlert = [];
        responsData.deliveryRestrictions.forEach(function(item) {
          $scope.timeSlotsAlert.push(item.message);
        });
      });
    }

    fkDeliveryTimeslotService.refreshTimeslotsCache();

    $scope.hideCheckout = () => {
      $scope.errors = {};
      $scope.show = null;
      $scope.$emit('fk-hide-checkout');
      $element[0].removeAttribute('fk-atp');
    };

    $scope.orderConfirm = (orderNumber, wasModify) => $rootScope.$emit('fk-order-confirm', {
      orderNumber: orderNumber,
      wasModify: wasModify
    });

    $scope.open = (type) => {
      if (type !== $scope.show) {
        $scope.$emit('fk-show-checkout-option', { type });
      }
      if (type !== 'tip') {
        $scope.show = type;
        $scope.tip = false;
      } else {
        $scope.tip = true;
      }
    };

    $scope.done = (ev) => {
      if (ev && ev.stopPropagation) {
        ev.stopPropagation();
      }
      $rootScope.$broadcast('fk-costep-done', { step: $scope.show });
      $scope.show = null;
      $scope.tip = false;
    };

    $scope.submit = () => {
      // something is not set
      if (!fkDeliveryTimeslotService.timeslot.selectedTimeslot.startDate || !fkAddressService.selectedAddress || !$scope.selectedPaymentMethod()) {
        return $q(r => {
          let checkoutEl = $element[0].querySelector('.checkout'),
            addbuttons = Array.from($element[0].querySelectorAll('.checkout-top > div > .add') || []);

          checkoutEl.scrollTop = 0;
          addbuttons.forEach(addbutton => {
            addbutton.classList.add('vert-wobble');
          });

          $timeout(() => {
            addbuttons.forEach(addbutton => {
              addbutton.classList.remove('vert-wobble');
            });
          }, 1000);

          $log.info('cannot checkout yet');
          r();
        });
      }

      if (!$scope.expired) {

        if (fkUserService.user && fkUserService.user.tcAcknowledge === false) {
          $rootScope.$broadcast('fk-checkout-notc');

          return $q(r => {
            $log.info('Terms and Conditions has been updated.');
            r();
          });
        }

        $scope.avoidMultipleClick = true;
        this.submitText = 'PROCESSING...';
        this.modifySubmitText = 'PROCESSING...';

        return fkHttp({
          spinner: 'checkout',
          method: 'GET',
          url: fkUtils.replaceURLParams(API.checkoutSubmit, { username: "username" })
        }).then(response => {
          $scope.avoidMultipleClick = false;
          this.submitText = 'PAY';
          this.modifySubmitText = 'SAVE CHANGES';
          if (response.data.status === 'FAILED') {
            $scope.show = 'ERROR';
            $rootScope.$broadcast('fk-checkout-failed', response.data);
            $scope.errors = filterErrors(response.data.errors);
            if (response.data.errors.invalid_reservation) {
              $scope.timeslot = true;
              $scope.show = 'timeslot';
            }
            if (response.data.errors.ERR_ORDER_MINIMUM) {
              $scope.subTotal = true;
            }
            if (response.data.errors.didnot_agree) {
              $scope.errors.age = 'Alcohol Age Verification';
              $scope.show = 'age';
            }
            if (response.data.errors.ERR_TSLOT_ALC_RESTRICTED) {
              $scope.show = 'alcohol-timeslot';
            }
            // TODO alcohol-address and alcohol-timeslot warnings
          } else if (response.data.status === 'Submitted' || 'Processing' || response.data.orderNumber) { //TODO should cover all cases
            fkCartService.viewCartlines();
            fkOrderService.loadOrder(response.data.orderNumber).then(orderData => {
              $rootScope.$broadcast('fk-checkout', {
                data: response.data,
                orderData: orderData,
                cartDetail: fkCartService.cartDetail,
                deliveryFee: $scope.fkDeliveryTimeslotService.timeslot.selectedTimeslot.deliveryFee,
                modifyState: fkOrderModifyService.getModifyState()
              });
            });
            this.onPlaceOrder();
            $scope.orderConfirm(response.data.orderNumber, !!fkOrderModifyService.getModifyState());
            fkOrderModifyService.cancelModifyState();
          }
        });
      }
      return $q(r => {
        r();
        //TODO timeslot expired handling
      });
    };

    $scope.$on('fk-cart-changed', (e, data) => {
      $scope.show = null;
      $scope.tip = false;
      $scope.selectedTip = data.tip;
      $scope.subTotal = false;
    });

    $scope.$on('fk-selected-address-set', () => {
      fkDeliveryTimeslotService.refreshTimeslotsCache();
    });

    $scope.setSelected = (type, data, errors) => {
      fkCartService.getOrderDetail();
      $scope.show = null;
      $scope.errors = filterErrors(errors);
      if (type === 'payment') {
        fkPaymentMethodService.paymentMethodsRefresh().then(pdata => {
          $rootScope.$emit('fk-costep-payment', pdata);
        });
      }
      if (type === 'timeslot') {
        $scope.selectedTimeslot = data;
        $scope.timeslot = false;
        $scope.expired = null;
        $rootScope.$emit('fk-costep-timeslot', data);
      }
      if (type === 'address') {
        $rootScope.$emit('fk-costep-address', data);
        fkDeliveryTimeslotService.refreshTimeslotsCache();
        if (data && !data.contactPhoneNumber.phone) {
          $scope.phoneNumberUpdate();
        }
      }
    };

    // $scope.$on('fk-delivery-address-refreshed', () => {
    //   if (fkAddressService.addresses.length === 1 && !this.askedMobileNumber) {
    //     this.askedMobileNumber = true;
    //     this.smsPopup = ngDialog.open({
    //       templateUrl: 'templates/fkMobileNumber.html',
    //       appendClassName: 'fk-mobile-number narrow',
    //       showClose: false,
    //       ariaRole: 'dialog',
    //       scope: $scope
    //     });
    //   }
    // });
    //
    $scope.$on('fk-credit-card-change', () => {
      fkPaymentMethodService.refreshPaymentMethodsCache();
    });

    // $scope.$on('fk-mobile-number-add', () => {
    //   this.smsPopup.close();
    // });
    //
    $scope.$on('fk-atp', () => {
      $element[0].setAttribute('fk-atp', '');
    });

    $scope.$on('fk-atp-done', () => {
      $element[0].removeAttribute('fk-atp');
      $scope.hideCheckout();
    });

    $scope.$on('fk-error-ERR_ORDER_MINIMUM', () => {
      $scope.hideCheckout();
    });

    $scope.$on('fk-error-ERR_SESSION_EXPIRED', () => {
      $scope.hideCheckout();
    });

    $scope.goToHelp = () => {
      $state.go('help');
    };
  }

}

FkCheckoutCtrl.$inject = ['$scope', '$element', 'fkCartService', 'fkAddressService', 'fkDeliveryTimeslotService', 'fkUserService', 'fkPaymentMethodService', 'fkHttp', 'fkUtils', 'API', 'ngDialog', '$q', '$log', '$timeout', '$rootScope', '$state', 'fkBoldChatService', 'fkOrderModifyService', 'fkOrderService'];

export default FkCheckoutCtrl;
