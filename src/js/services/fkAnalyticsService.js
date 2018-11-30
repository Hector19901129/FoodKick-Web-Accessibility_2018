class FkAnalyticsService {
  constructor($rootScope, fkUserService, fkCartUtilsService, fkUtils, $location) {
    this.$rootScope = $rootScope;
    this.fkUserService = fkUserService;
    this.$location = $location;
    this.fkCartUtilsService = fkCartUtilsService;

    // routing events
    this.$rootScope.$on('$stateChangeSuccess', (ev, toState, toParams, fromState, fromParams) => {
      this.sendEvent('pageView', {toState, toParams, fromState, fromParams, path: $location.path()});
    });

    this.$rootScope.$on('$stateChangeError', (ev, toState, toParams, fromState, fromParams, error) => {
      this.sendEvent('pageViewError', {toState, toParams, fromState, fromParams, error});
    });

    this.$rootScope.$on('$stateNotFound', (ev, unfoundState, fromState, fromParams) => {
      this.sendEvent('pageNotFound', {unfoundState, fromState, fromParams});
    });

    // "virtual" page views
    this.$rootScope.$on('fk-pdp-opened', () => {
      this.sendEvent('softPageView', {
        pageName: 'fk-product-details',
        pageType: 'Product detail page'
      });
    });

    this.$rootScope.$on('fk-zip-popup-opened', () => {
      this.sendEvent('softPageView', {
        pageName: 'fkZipCheck',
        pageType: 'Zipcheck'
      });
    });

    this.$rootScope.$on('fk-section-more-opened', (ev, data) => {
      let title = data.section && (data.section.headlineText || data.section.imageBanner && data.section.imageBanner.description);

      this.sendEvent('modalClick',{
        type: data.type,
        label: title
      });
    });

    this.$rootScope.$on('fk-popup-opened', (ev, data) => {
      this.sendEvent('softPageView', {
        pageName: data.name,
        pageType: data.type
      });
    });

    // product click
    this.$rootScope.$on('fk-product-tile-clicked', (ev, data) => {
      this.sendEvent('productClicked', data);
    });

    // top menu click
    this.$rootScope.$on('fk-top-menu-clicked', (ev, data) => {
      this.sendEvent('topMenuClicked', data);
    });

    // left menu click
    this.$rootScope.$on('fk-left-menu-clicked', (ev, data) => {
      this.sendEvent('leftMenuClicked', data);
    });

    // sort changed
    this.$rootScope.$on('fk-sort-changed', (ev, data) => {
      this.sendEvent('sortChanged', data);
    });

    // zip entered
    this.$rootScope.$on('fk-zip-entered', (ev, data) => {
      this.sendEvent('zipEntered', data);
    });

    // zip popup closed with X
    this.$rootScope.$on('fk-zip-popup-closed-with-x', (ev, data) => {
      this.sendEvent('zipPopupClosedWithX', data);
    });

    // PDP
    this.$rootScope.$on('fk-view-pdp', (ev, data) => {
      this.sendEvent('viewPDP', data);
    });

    // search
    this.$rootScope.$on('fk-search', (ev, searchData) => {
      this.sendEvent('search', searchData);
    });

    this.$rootScope.$on('fk-search-result', (ev, searchData) => {
      this.sendEvent('searchResult', searchData);
    });

    // ATC related events
    this.$rootScope.$on('fk-cart-atc', (ev, atcData) => {
      this.sendEvent('addToCart', {atcData});
    });

    this.$rootScope.$on('fk-cart-atc-failed', (ev, atcData) => {
      this.sendEvent('addToCartFailed', {atcData});
    });

    this.$rootScope.$on('fk-cart-update', (ev, updateData) => {
      this.sendEvent('cartUpdate', {updateData});
    });

    this.$rootScope.$on('fk-cart-update-failed', (ev, updateData) => {
      this.sendEvent('cartUpdateFailed', {updateData});
    });

    this.$rootScope.$on('fk-cart-delete', (ev, deleteData) => {
      this.sendEvent('cartDelete', {deleteData});
    });

    this.$rootScope.$on('fk-cart-delete-failed', (ev, deleteData) => {
      this.sendEvent('cartDeleteFailed', {deleteData});
    });

    this.$rootScope.$on('fk-products-removed', (ev, data) => {
      this.sendEvent('productsRemoved', data);
    });

    // checkout
    this.$rootScope.$on('fk-show-cart', (ev, cartData) => {
      this.sendEvent('showCart', cartData);
    });

    this.$rootScope.$on('fk-show-checkout', () => {
      this.sendEvent('showCheckout', {});
    });

    this.$rootScope.$on('fk-show-checkout-option', (ev, data) => {
      this.sendEvent('showCheckoutOption', data);
    });

    this.$rootScope.$on('fk-show-delivery-option', (ev, data) => {
      this.sendEvent('showDeliveryOption', data);
    });

    this.$rootScope.$on('fk-costep-address', (ev, data) => {
      this.sendEvent('coStepAddress', data);
    });

    this.$rootScope.$on('fk-costep-timeslot', (ev, data) => {
      this.sendEvent('coStepTimeslot', data);
    });

    this.$rootScope.$on('fk-costep-payment', (ev, data) => {
      this.sendEvent('coStepPayment', data);
    });

    this.$rootScope.$on('fk-costep-done', (ev, data) => {
      this.sendEvent('coStepDone', data);
    });

    this.$rootScope.$on('fk-checkout', (ev, checkoutData) => {
      let products = [].concat.apply([], this.fkCartUtilsService.flattenCart(checkoutData.cartDetail).affiliates.map((affiliate) => affiliate.lineItems)).filter(li => li.productConfiguration && li.productConfiguration.productPotato && li.productConfiguration.productPotato.productData).map((lineItem) => lineItem.productConfiguration.productPotato);
      this.sendEvent('checkout', {checkoutData, user: fkUserService.user, products: products});
    });

    this.$rootScope.$on('fk-checkout-failed', (ev, checkoutData) => {
      this.sendEvent('checkoutFailed', {checkoutData});
    });

    this.$rootScope.$on('fk-deliverypass-click', (ev, deliverypassData) => {
      this.sendEvent('deliverypassClick', {deliverypassData});
    });

    this.$rootScope.$on('fk-order-confirm-popup', (ev, orderData) => {
      this.sendEvent('orderConfirmPopup', orderData);
    });

    this.$rootScope.$on('fk-order-cancelled', (ev, orderData) => {
      this.sendEvent('orderCancelled', orderData);
    });

    // address add/edit
    this.$rootScope.$on('fk-address-add-opened', (ev, data) => {
      this.sendEvent('addAddressOpened', data);
    });

    this.$rootScope.$on('fk-address-edit-opened', (ev, data) => {
      this.sendEvent('editAddressOpened', data);
    });

    // payment add/edit
    this.$rootScope.$on('fk-payment-add-opened', (ev, data) => {
      this.sendEvent('addPaymentOpened', data);
    });

    this.$rootScope.$on('fk-payment-edit-opened', (ev, data) => {
      this.sendEvent('editPaymentOpened', data);
    });

    // ATP
    this.$rootScope.$on('fk-error-ATPERROR', (ev, data) => {
      this.sendEvent('ATP', data.responseData);
    });

    // login
    this.$rootScope.$on('fk-signin-popup', (ev, data) => {
      if (data.signup) {
        this.sendEvent('signUpPopup', data);
        // report soft pageView as well
        this.sendEvent('softPageView', {
          pageName: 'fk-create-account',
          pageType: 'Create Account'
        });
      } else {
        this.sendEvent('signInPopup', data);
        // report soft pageView as well
        this.sendEvent('softPageView', {
          pageName: 'fk-sign-in',
          pageType: 'Sign In'
        });
      }
    });

    this.$rootScope.$on('fk-user-login', (ev, data) => {
      if (data && data.status === 'SUCCESS') {
        if (data.method && data.method === 'register') {
          this.sendEvent('register', data);
        } else {
          this.sendEvent('login', data);
        }
      } else if (data) {
        if (data.method && data.method === 'register') {
          this.sendEvent('registerFailed', data);
        } else {
          this.sendEvent('loginFailed', data);
        }
      }
    });

    this.$rootScope.$on('fk-user-logout', (ev, data) => {
      this.sendEvent('logout', data);
    });

    this.$rootScope.$on('fk-user-change', (ev, data) => {
      this.sendEvent('userChange', data);
    });

    // account related
    this.$rootScope.$on('fk-forgot-password', (ev, data) => {
      this.sendEvent('forgotPassword', data);
    });

    this.$rootScope.$on('fk-email-changed', (ev, data) => {
      this.sendEvent('emailChanged', data);
    });

    this.$rootScope.$on('fk-product-impressions', (ev, data) => {
      this.sendEvent('productImpressions', data);
    });
  }

  sendEvent(eventName, data){
    this.$rootScope.$broadcast('fk-analytics', {event: eventName, data: data});
  }

}

FkAnalyticsService.$inject = ['$rootScope', 'fkUserService', 'fkCartUtilsService', 'fkUtils', '$location'];
export default FkAnalyticsService;
