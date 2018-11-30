class FkAnalyticsCoremetricsCtrl {
  constructor($scope, $log, $q, $window, fkAnalyticsService, fkUtils) {
    this.$scope = $scope;
    this.$log = $log;
    this.$q = $q;
    this.$window = $window;
    this.fkAnalyticsService = fkAnalyticsService;
    this.fkUtils = fkUtils;

    this.EVENTMAPPING = {
      pageView: (data) => {
        let page, cat;

        if (data && data.toState) {
          if (data.toState.name === 'home') {
            page = 'HOME';
            cat = 'FK:HOME';
          }
          if (data.toState.name === 'not-found') {
            page = 'ERROR:404 PAGE NOT FOUND';
            cat = 'FK:ERROR';
          }
          if (data.toState.name.indexOf('department') === 0) {
            let id = data.toParams.id.toUpperCase();
            page = 'DEPARTMENT:' + id;
            cat = 'FK:' + id;
          }
          if (data.toState.name.indexOf('browse') === 0) {
            let id = data.toParams.id.toUpperCase();
            page = 'CATEGORY:' + id;
            cat = 'FK:' + id;
          }
          if (data.toState.name.indexOf('help') === 0) {
            page = (data.toParams.partial ? data.toParams.partial.toUpperCase() : 'HELP:HELP') + (data.toParams.subpartial ? ':'+data.toParams.subpartial.toUpperCase() : '');
            cat = 'FK:HELP';
          }
          if (data.toState.name.indexOf('account') === 0) {
            page = 'ACCOUNT:' + (data.toParams.partial ? data.toParams.partial.toUpperCase() : 'MYACCOUNT');
            cat = 'FK:ACCOUNT';
          }
          if (data.toState.name === 'pastitems') {
            page = 'ACCOUNT:PASTITEMS';
            cat = 'FK:ACCOUNT';
          }
          if (data.toState.name === 'pastorders') {
            page = 'ACCOUNT:PASTORDERS';
            cat = 'FK:ACCOUNT';
          }
        }

        if (page) {
          return [['cmCreatePageviewTag', page, cat]];
        }

        return null;
      },
      searchResult: (data) => {
        if (data.searchResult && data.searchResult.searchParams && data.searchResult.searchParams.searchTerm) {
          return [['cmCreatePageviewTag', 'SEARCH SUCCESSFUL>'+data.searchResult.searchParams.searchTerm, 'FK:SEARCH', data.searchKey, data.searchResult && data.searchResult.products && data.searchResult.products.length]];
        }

        if (data.searchResult && data.searchResult.products && data.searchResult.products.length === 0) {
          return [['cmCreatePageviewTag', 'SEARCH UNSUCCESSFUL', data.searchKey, 0]];
        }

        return [['cmCreatePageviewTag', 'SEARCH SUCCESSFUL', 'FK:SEARCH', data.searchKey, data.searchResult && data.searchResult.products && data.searchResult.products.length]];
      },
      viewPDP: (data) => {
        if (data.product && data.product.productData && data.product.productData.catId) {
          return [
            ['cmCreatePageviewTag', 'PRODUCT:' + data.product.productData.productName + ' (' + data.product.productData.productId + ')', 'FK:' + data.product.productData.catId.toUpperCase()],
            ['cmCreateProductviewTag', data.product.productData.productId, data.product.productData.productName, "FK:" + data.product.productData.catId.toUpperCase(), data.product.productData.skuCode + '-_--_-normal']
          ];
        }

        return null;
      },
      signInPopup: () => [
        ['cmCreatePageviewTag', 'ACCOUNT:SIGNIN', 'FK:ACCOUNT'],
        ['cmCreateConversionEventTag', 'SIGN IN', '1', 'FK:ACCOUNT']
      ],
      signUpPopup: () => [['cmCreatePageviewTag', 'ACCOUNT:CREATEACCOUNT', 'FK:ACCOUNT']],
      forgotPassword: () => [['cmCreatePageviewTag', 'ACCOUNT:FORGOTPASSWORD', 'FK:ACCOUNT']],
      showCart: () => [['cmCreatePageviewTag', 'CHECKOUT:BAG', 'FK:CHECKOUT']],
      showCheckout: () => [['cmCreatePageviewTag', 'CHECKOUT:DEFAULT', 'FK:CHECKOUT']],
      showCheckoutOption: (data) => [['cmCreatePageviewTag', 'CHECKOUT:' + (data.type ? data.type.toUpperCase() : 'UNKNOWN'), 'FK:CHECKOUT']],
      orderConfirmPopup: () => [['cmCreatePageviewTag', 'CHECKOUT:CONFIRMATION', 'FK:CHECKOUT']],
      addToCart: (data) => this.shop5(data && data.atcData && data.atcData.productConfiguration),
      cartUpdate: (data) => this.shop5(data && data.updateData && data.updateData.filteredPc),
      login: data => [
        ['cmCreateConversionEventTag', 'SIGN IN', '2', 'FK:ACCOUNT'],
        ['cmCreateRegistrationTag', ''+data.user.fdUserId, data.user.username, null, null, null, null, '-_--_-'+data.user.orderCount+'-_-'+data.user.cohort]
      ],
      click: data => [['cmCreateElementTag', data.params && data.params[0] ? data.params[0] : '?', data.params && data.params[1] ? 'FK:'+data.params[1] : 'FK:UNKNOWN']],
      register: data => [['cmCreateRegistrationTag', ''+data.user.fdUserId, data.user.username, null, null, null, null, '-_--_-'+data.user.orderCount+'-_-'+data.user.cohort]],
      emailChanged: data => [['cmCreateRegistrationTag', ''+data.login.fdUserId, data.login.username, null, null, null, null, '-_--_-'+data.login.orderCount+'-_-'+data.login.cohort]],
      ATP: () => [['cmCreateElementTag', 'ATP:OUT OF STOCK', 'FK:ATP']],
      checkout: data => this.shop9(data)
    };

    $scope.$on('fk-analytics', (ev, data = {}) => {
      if (data.event && this.EVENTMAPPING[data.event]) {
        this.sendEvents(this.EVENTMAPPING[data.event](data.data));
      }
    });

    this.$postLink = () => {
      this.loadCM();
    };
  }

  shop5(pc) {
    return [
      ['cmCreateShopAction5Tag', pc.product.id, pc.product.fullName, pc.quantity, pc.product.utPrice, 'FK:' + pc.product.categoryId.toUpperCase(), pc.product.sku.code + '-_--_--_-regular-_-0-_--_-0.0'],
      ['cmDisplayShops']
    ];
  }

  getLineItems(cd) {
    let lis = [];

    const processLi = li => {
      let plis = [];

      if (li.lineItems) {
        li.lineItems.forEach(sli => {
          plis = plis.concat(processLi(sli));
        });
      }

      if (li.productConfiguration) {
        plis.push({
          id: li.productConfiguration.productId,
          name: li.productConfiguration.productPotato.productData.productName,
          qty: li.productConfiguration.quantity,
          category: li.productConfiguration.productPotato.productData.catId,
          price: li.productConfiguration.productPotato.productData.price,
          sku: li.productConfiguration.skuCode
        });
      }

      return plis;
    };

    cd.affiliates.forEach(aff => {
      lis = lis.concat(processLi(aff));
    });

    return lis;
  }

  shop9(data) {
    let events = [],
        lineItems = this.getLineItems(data.checkoutData.cartDetail);

    lineItems.forEach(li => {
      events.push(['cmCreateShopAction9Tag', li.id, li.name, li.qty, li.price, data.user.fdUserId, data.checkoutData.data.orderNumber, data.checkoutData.cartDetail.subtotal, 'FK:'+li.category.toUpperCase(), li.sku+'-_--_--_-regular-_-0-_--_-0.0']);
    });

    events.push(['cmDisplayShops']);

    return events;
  }

  sendEvent(event) {
    if (event && event[0]) {
      let funName = event.shift(),
          fun = this.$window[funName];

      if (fun) {
        fun(...event);
      }

      if (this.fkUtils.isDeveloper()) {
        this.$log.info('[cm]', funName, event);
      }
    }
  }

  sendEvents(events) {
    if (Array.isArray(events)) {
      events.forEach(ev => this.sendEvent(ev));
    }
  }

  loadCM() {
    if (document.getElementById('cm-js')) {
      this.$log.warn('Coremetrics already loaded.');
    } else {
      let script = document.createElement('script');
      script.type = 'text/javascript';
      script.id = 'cm-js';
      script.async = true;

      script.onload = () => {
        if (this.$window.cmSetClientID) {
          if (this.fkUtils.isDeveloper()) {
            this.$log.info('Coremetrics loaded');
          }
          this.$window.cmSetClientID("51640000|33000004", true, "data.coremetrics.com", "freshdirect.com"); // TODO testdata?
        }
      };

      script.src = '//libs.coremetrics.com/eluminate.js';

      let first = document.getElementsByTagName('script')[0];
      first.parentNode.insertBefore(script, first);
    }
  }

}

FkAnalyticsCoremetricsCtrl.$inject = ['$scope', '$log', '$q', '$window', 'fkAnalyticsService', 'fkUtils'];

export default FkAnalyticsCoremetricsCtrl;
