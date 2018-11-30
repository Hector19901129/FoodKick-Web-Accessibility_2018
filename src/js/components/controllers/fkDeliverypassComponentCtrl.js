class FkDeliverypassComponentCtrl {
  constructor($scope, fkUserService, fkHttp, fkUtils, ngDialog, $rootScope, $state, fkOrderService, fkPaymentMethodService, fkDeliveryPassService, fkCartService, API, $q, fkProductService, $log) {

    this.ngDialog = ngDialog;
    this.$scope = $scope;
    this.fkUserService = fkUserService;
    this.$rootScope = $rootScope;
    this.$state = $state;
    this.fkCartService = fkCartService;
    this.fkPaymentMethodService = fkPaymentMethodService;
    this.fkDeliveryPassService = fkDeliveryPassService;
    this.fkOrderService = fkOrderService;
    this.fkProductService = fkProductService;
    this.API = API;
    this.fkUtils = fkUtils;
    this.$q = $q;
    this.promotionalDialog = null;
    this.cartDialog = null;
    this.dpActiveDialog = null;
    this.$log = $log;
    this.submitText = 'PURCHASE PLAN';
    $scope.avoidMultipleClick = false;
    $scope.expired = null;
    $scope.fkCartService = fkCartService;
    $scope.show = null;
    $scope.isDeliverypass = true;
    $scope.position = 1;

    this.$postLink = () => {
      this.fkDeliveryPassService.getDpPlans().then((response) => {
        $scope.dpPlans = response.data.dpProductlist;
      });
    };

    $scope.signup = (plan) => {

      //if not logged-in
      if (this.fkUserService && !this.fkUserService.user) {
        this.$rootScope.$broadcast( 'fk-account-signIn', {} );
        return;
      }

      this.$rootScope.$broadcast('fk-deliverypass-click', {type: 'confirm'});

      //to check purchasing dp from checkout/landing page
      if (this.source === 'checkout') {
        $scope.addDpFromCheckout(plan);
      } else {
        $scope.buyPlan(plan);
      }

    };

    $scope.buyPlan = (plan) => {
      //to check if user eligible to purchase dp or not
      if (this.fkUserService.user && !this.fkUserService.user.purchaseDlvPassEligible) {
        $scope.promotionalNotify();
        return;
      }

      //to check if user already contains dp
      if (this.fkUserService.user.dpActive) {
        $scope.dpActiveAlert();
      } else if (this.fkUserService.user.dpFreeDeliveryPromoWarning1){
        $scope.planCarry = plan;
        $scope.fdDpPromotion();
      } else {
        $scope.addToCart(plan);
      }
    };

    $scope.addToCart = (plan) => {
      if (this.promotionalDialog) {
        this.promotionalDialog.close();
      }
      fkPaymentMethodService.getPaymentMethods();
      fkCartService.addDpInCart(plan, { position: $scope.position }, $scope.isDeliverypass).then((response) => {
        if (response.data.status !== 'FAILED') {
          fkCartService.getDpCartlines();
          $scope.openCart();
        }
      });
    };

    $scope.addDpFromCheckout = (plan) => {
      fkCartService.addDpInCart(plan, {position: $scope.position}).then(() => {
        fkCartService.getOrderDetail(false);
      });
      $rootScope.$broadcast('fk-close-dpdialog');
    };

    $scope.openCart = () => {
      if (!this.cartDialog) {
        this.cartDialog = ngDialog.open({
          templateUrl: 'templates/fkDeliveryPassCart.html',
          appendClassName: 'fk-dp-cart narrow',
          showClose: false,
          ariaRole: 'dialog',
          scope: $scope,
          preCloseCallback: () => {
            this.cartDialog = null;
          }
        });
      }
    };

    $scope.dpActiveAlert = () => {
      if (!this.dpActiveDialog) {
        this.dpActiveDialog = ngDialog.open({
          templateUrl: 'templates/fkDeliveryPassActiveAlert.html',
          appendClassName: 'fk-delivery-pass-confirm narrow',
          showClose: false,
          ariaRole: 'dialog',
          scope: $scope,
          preCloseCallback: () => {
            this.dpActiveDialog = null;
          }
        });
      }
    };

    $scope.promotionalNotify = () => {
      let template = "";

      if (!this.fkUserService.user.fdxDpEnabled) {
        template = 'templates/fkDeliveryPassDisabled.html';
      } else {
        template = this.fkUserService.user.fdxOrderCount > 0 ? 'templates/fkDeliveryPassPromotionActive.html' : 'templates/fkDeliveryPassPromoOffer.html';
      }

      if (!this.promotionalDialog) {
        this.promotionalDialog = ngDialog.open({
          templateUrl: template,
          appendClassName: 'fk-delivery-pass-confirm narrow',
          showClose: false,
          scope: $scope,
          ariaRole: 'dialog',
          preCloseCallback: () => {
            this.promotionalDialog = null;
          }
        });
      }
    };

    $scope.fdDpPromotion = () => {
      if (!this.promotionalDialog) {
        this.promotionalDialog = ngDialog.open({
          templateUrl: 'templates/fkdeliveryPassPromotionPopup.html',
          appendClassName: 'fk-delivery-pass-confirm narrow',
          showClose: false,
          ariaRole: 'dialog',
          scope: $scope,
          preCloseCallback: () => {
            this.promotionalDialog = null;
          }
        });
      }
    };

    $scope.purchase = () => {

      $scope.avoidMultipleClick = true;
      this.submitText = 'PROCESSING...';
      if (!$scope.expired) {

        return fkHttp({
          spinner: 'checkout',
          method: 'POST',
          url: fkUtils.replaceURLParams(API.checkoutSubmit, { username: "username" }),
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          data: fkUtils.postData({ dlvPassCart: 'true' })
        }).then(response => {

          if (response.data.status === 'FAILED') {
            $rootScope.$broadcast('close-delivery-pass-payment', {});
            $rootScope.$broadcast('delivery-pass-failure', {
              error: response.data
            });
            $scope.enableSubmit();
          } else if (response.data.status === 'Processing') { //TODO should cover all cases
            $scope.enableSubmit();
            $rootScope.$broadcast('close-delivery-pass-payment', {});
            fkOrderService.loadOrder(response.data.orderNumber).then(orderData => {
              $rootScope.$broadcast('delivery-pass-confirmation', {
                cartDetail: orderData.orderData.cartDetail
              });
            });
          }
        });

      }
      return $q(r => {
        r();

      });
    };

    $rootScope.$on('close-delivery-pass-payment', () => {
      if (this.cartDialog) {
        this.cartDialog.close();
      }
    });

    $scope.bankFormOn = () => fkUserService.user && fkUserService.user.totalOrderCount > 0;

    $scope.isSelectedDone = type => $scope.show === type ? 'selected-done' : '';

    $scope.open = (type) => {
      $scope.show = type;
    };

    $scope.selectedPaymentMethod = () => {
      return fkPaymentMethodService.selectedPaymentMethod;
    };

    $scope.done = (ev) => {
      if (ev && ev.stopPropagation) {
        ev.stopPropagation();
      }
      $scope.show = null;
    };

    $scope.isSelected = type => $scope.show === type ? 'selected' : '';

    $scope.isHidden = type => $scope.show !== null && $scope.show !== type ? 'hidden' : '';

    $scope.isSelectedElem = type => $scope.show === type ? 'done' : 'hidden';

    $scope.hideElement = type => $scope.show === type ? 'hidden' : '';

    $scope.elemSelector = type => $scope.show === type ? '' : 'hidden';

    $scope.bankFormOn = () => fkUserService.user && fkUserService.user.totalOrderCount > 0;

    $scope.setSelected = () => {
      fkCartService.getDpCartlines();
      $scope.show = null;
    };

    $scope.enableSubmit = () => {
      $scope.avoidMultipleClick = false;
      this.submitText = 'PURCHASE PLAN';
    };

  }

  deliverySettings() {
    if (this.dpActiveDialog) {
      this.dpActiveDialog.close();
    }
    this.$state.go('account.detail', { partial: 'deliveryPass' });
    this.fkUtils.goToTop();
  }

  goToHome() {
    this.$state.go('home');
    this.fkUtils.goToTop();
  }

}

FkDeliverypassComponentCtrl.$inject = ['$scope', 'fkUserService', 'fkHttp', 'fkUtils', 'ngDialog', '$rootScope', '$state', 'fkOrderService', 'fkPaymentMethodService', 'fkDeliveryPassService', 'fkCartService', 'API', '$q', 'fkProductService', '$log'];

export default FkDeliverypassComponentCtrl;
