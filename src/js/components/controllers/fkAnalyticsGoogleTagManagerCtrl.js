const PAGETYPEMAP = {
  browse: () => 'Category page',
  department: () => 'Department page',
  product: () => 'Product page',
  home: () => 'Homepage',
  search: () => 'Search results page',
  pastitems: () => 'Past items page',
  pastorders: () => 'Shop Past Orders page',
  orderhistory: () => 'Order History page',
  receipt: () => 'Receipt page',
  account: () => 'Settings pages',
  feed: () => 'Feed',
  "account.detail": () => 'Settings pages',
  help: () => 'Help',
  "help.detail": () => "Help"
};

class FkAnalyticsGoogleTagManagerCtrl {
  constructor ($scope, $window, $log, fkCartService, fkDeliveryTimeslotService, fkUtils, CONFIG) {
    this.$scope = $scope;
    this.$window = $window;
    this.$log = $log;
    this.fkDeliveryTimeslotService = fkDeliveryTimeslotService;

    this.GTMID = CONFIG.GTMID || 'GTM-MP8P6GM';
    this.GTM_AUTHID = CONFIG.GTM_AUTHID || 'ksfCb8fmL4Om878Vs6MSGw';
    this.GTM_PREVIEW = CONFIG.GTM_PREVIEW || 'env-63';

    this.EVENTMAPPING = {
      userChange: (evData, data) => {
        if (data && data.user) {
          evData.user = {};
          Object.keys(data.user).forEach((k) => {
            let forbiddenProperties = ['mobileNumber'];
            if (forbiddenProperties.indexOf(k) === -1) {
              evData.user[k] = data.user[k];
            }
          });

          // GA customer
          evData.customer = {
            zip_code: '' + data.user.zipCode,
            user_id: '' + data.user.erpCustomerPK,
            user_status: 'Signed in',
            user_type: data.user.fdxOrderCount === 0 ? 'new' : 'old',
            login_type: data.user.providers && data.user.providers[0] || 'FDUser',
            chef_table: data.user.chefTable ? 'yes' : 'no',
            deliverypass: '' + data.user.fdxDpEnabled,
            delivery_type: this.getDeliveryType(data.user.selectedServiceType),
            cohort: data.user.cohort
          };
          evData.user_id = '' + data.user.erpCustomerPK;
        } else {
          evData.customer = {
            zip_code: '',
            user_id: '',
            user_status: 'Signed out',
            user_type: 'anonymous',
            login_type: 'anonymous',
            chef_table: 'no',
            deliverypass: 'false',
            delivery_type: 'HOME',
            cohort: ''
          };
          evData.user_id = '';
        }

        return evData;
      },

      login: (evData, data = {}) => {
        data.user = data.user || {};

        $window.dataLayer.push({
          event: 'user-login-success',
          eventCategory: 'Login',
          eventAction: 'login-success',
          user_id: data.user.erpCustomerPK,
          user_status: 'Signed in',
          login_type: data.user.providers && data.user.providers[0] || 'FDUser',
          delivery_type: this.getDeliveryType(data.user.selectedServiceType)
        });

        return evData;
      },

      loginFailed: () => {
        $window.dataLayer.push({
          event: 'user-login-failure',
          eventCategory: 'Login',
          eventAction: 'login-failure',
          login_type: 'FDUser'
        });
      },

      register: (evData, data = {}) => {
        data.user = data.user || {};

        $window.dataLayer.push({
          event: 'user-signup-success',
          eventCategory: 'Signup',
          eventAction: 'signup-success',
          user_id: data.user.erpCustomerPK,
          user_status: 'Signed in',
          login_type: data.user.providers && data.user.providers[0] || 'FDUser'
        });

        return evData;
      },

      registerFailed: () => {
        $window.dataLayer.push({
          event: 'user-signup-failure',
          eventCategory: 'Signup',
          eventAction: 'signup-failure'
        });
      },

      zipEntered: (evData, data) => {
        $window.dataLayer.push({
          event: 'lightbox-zipcode',
          eventCategory: 'Lightbox Tracking',
          eventAction: 'zipcode-entered',
          zip_code: data.zipCode
        });
      },

      zipPopupClosedWithX: () => {
        $window.dataLayer.push({
          event: 'lightbox-zipcode',
          eventCategory: 'Lightbox Tracking',
          eventAction: 'lightbox-closed'
        });
      },

      click: (evData, data={}) => {
        if (data.params) {
          data.params.forEach(p => {
            if (p.indexOf('TAB:') === 0) {
              // tab click
              let tab = p.slice(4);
              if (tab === 'signup') {
                this.pageView('fk-create-account', 'Create Account');
              } else if (tab === 'signin') {
                this.pageView('fk-sign-in', 'Sign In');
              }
            }
          });
        }

        return evData;
      },

      showCart: evData => {
        this.pageView('fkPopupCartContent', 'View Cart');

        return evData;
      },

      deliverypassClick: (evData, data) => {
        let t = data.deliverypassData && data.deliverypassData.type && data.deliverypassData.type.toLowerCase();
        if (t === 'free') {
          $window.dataLayer.push({
            event: 'deliverypass-click',
            eventCategory: 'deliverypass',
            eventAction: 'free delivery',
            eventLabel: 'free'
          });
        } else if (t === 'confirm') {
          $window.dataLayer.push({
            event: 'deliverypass-click',
            eventCategory: 'deliverypass',
            eventAction: 'confirm',
            eventLabel: 'sign up'
          });
        }
      },

      pageView: (evData, data) => {
        if (data.toState) {
          this.pageView(document.title, this.resolvePageType(data.toState));
        }

        return evData;
      },

      productImpressions: (evData, data) => {
        let impressions = [];

        if (data.products && data.products.length) {
          this.resetImpressions();

          impressions = data.products.map((p, i) => {
            return this.transformProduct(p.productData, {
              position: i+1
            });
          });

          $window.dataLayer.push({
            ecommerce: {
              impressions: impressions
            },
            event: 'impressionsPushed'
          });
        }
      },

      productsRemoved: (evData, data) => {
        let products = data.removedProducts.map(p => {
          let product = this.transformProduct(p.productData, {nolist: true});

          product.quantity = p.productData.inCartAmount;

          return product;
        });

        if (products.length) {
          // reset ecommerce remove
          $window.dataLayer.push({
            ecommerce: {
              remove: null
            }
          });

          // remove event
          $window.dataLayer.push({
            event: 'removeFromCart',
            ecommerce: {
              remove: {
                products: products
              }
            }
          });
        }
      },

      cartDelete: (evData, data) => {
        if (data && data.deleteData && data.deleteData.response && data.deleteData.response.config && data.deleteData.response.config.products) {
          let products = data.deleteData.response.config.products.map(p => {
            let product = this.transformProduct(p, {nolist: true});

            product.quantity = p.inCartAmount;

            return product;
          });

          // reset ecommerce remove
          $window.dataLayer.push({
            ecommerce: {
              remove: null
            }
          });

          // remove event
          $window.dataLayer.push({
            event: 'removeFromCart',
            ecommerce: {
              remove: {
                products: products
              }
            }
          });
        }

        return evData;
      },

      cartUpdate: (evData, data) => {
        if (data && data.updateData && data.updateData.response && data.updateData.response.config && data.updateData.response.config.product) {
          let config = data.updateData.response.config,
              p = config.product,
              list = config.list === false ? false : (config.list || this.getProductList(config.product)),
              position = config.product.position,
              product = this.transformProduct(p, {nolist: true}),
              newQ = data.updateData.filteredPc.quantity,
              oldQ = p.inCartAmount,
              deltaQ = newQ - oldQ,
              event = deltaQ > 0 ? 'addToCart' : 'removeFromCart',
              ecomprop = deltaQ > 0 ? 'add' : 'remove',
              pushData = {
                event,
                ecommerce: {}
              };

          product.quantity = Math.abs(deltaQ);

          if (position) {
            product.position = position;
          }

          // reset
          $window.dataLayer.push({
            ecommerce: {
              add: null,
              remove: null
            }
          });

          pushData.ecommerce[ecomprop] = {
            products: [product]
          };

          if (list) {
            pushData.ecommerce[ecomprop].actionField = {
              list: list,
              action: ecomprop
            };
          }

          $window.dataLayer.push(pushData);
        }
        return evData;
      },

      addToCart: (evData, data) => {
        if (data && data.atcData && data.atcData.response && data.atcData.response.config && data.atcData.response.config.product) {
          let config = data.atcData.response.config,
              product = this.transformProduct(config.product, {nolist: true}),
              quantity = data.atcData.productConfiguration && data.atcData.productConfiguration.quantity,
              position = config.product.position,
              actionField = {},
              list = config.list === false ? false : (config.list || this.getProductList(config.product));

          product.quantity = quantity;

          if (position) {
            product.position = position;
          }

          // reset ecommerce add
          $window.dataLayer.push({
            ecommerce: {
              add: null
            }
          });

          if (list) {
            actionField.list = list;
            actionField.action = 'add';
          }

          // atc event
          $window.dataLayer.push({
            event: 'addToCart',
            ecommerce: {
              add: {
                actionField: actionField,
                products: [product]
              }
            }
          });
        }

        // don't return evData to prevent default addToCart event
      },

      productClicked: (evData, data) => {
        if (data && data.product) {
          let product = this.transformProduct(data.product.productData);

          $window.dataLayer.push({
            event: 'productClick',
            ecommerce: {
              click: {
                actionField: {
                  list: data.list || product.list
                },
                products: [product]
              }
            }
          });
        }
      },

      topMenuClicked: (evData, data) => {
        if (data && data.title) {
          $window.dataLayer.push({
            event: 'top-menu-clicked',
            eventCategory: 'top-menu',
            eventAction: 'click',
            eventLabel: data.title
          });
        }
      },

      leftMenuClicked: (evData, data) => {
        if (data && data.title) {
          $window.dataLayer.push({
            event: 'left-nav-clicked',
            eventCategory: 'left-nav',
            eventAction: 'click',
            eventLabel: data.title
          });
        }
      },

      sortChanged: (evData, data) => {
        if (data && data.sortOption) {
          $window.dataLayer.push({
            event: 'sort-menu-clicked',
            eventCategory: 'sort-menu',
            eventAction: 'sort-click',
            eventLabel: data.sortOption + ' ' + (data.orderAscending ? 'ascending' : 'descending')
          });
        }
      },

      softPageView: (evData, data) => {
        this.pageView(data.pageName, data.pageType);
      },

      viewPDP: (evData, data) => {
        let currentId = this.getValue('ecommerce.detail.products.0.id');

        if (data.product && data.product.productData && data.product.productData.skuCode !== currentId) {
          this.setValue('ecommerce.detail.products', null);
          $window.dataLayer.push({
            ecommerce: {
              detail: {
                products: [this.transformProduct(data.product.productData, {nolist: true})]
              }
            },
            event: 'detailPushed'
          });
        }

        return evData;
      },

      searchResult: (evData, data) => {
        if (data && data.searchKey) {
          $window.dataLayer.push({
            search_keyword: data.searchKey,
            search_results: data.searchResult && data.searchResult.products && data.searchResult.products.length
          });
        }

        return evData;
      },

      showCheckout: (evData) => {
        let products = Object.keys(fkCartService.productsInCart).map(pid => {
          let p = fkCartService.productsInCart[pid];
          return this.transformProduct(p && p.lineItem && p.lineItem.productConfiguration && p.lineItem.productConfiguration.productPotato && p.lineItem.productConfiguration.productPotato.productData, {nolist: true, quantity: p.lineItem.productConfiguration.quantity});
        });

        // reset product list
        $window.dataLayer.push({
          ecommerce: {
            checkout: {
              products: null
            }
          }
        });

        // set product list
        $window.dataLayer.push({
          ecommerce: {
            checkout: {
              products: products
            }
          }
        });

        // report checkout page view
        this.pageView('fkCheckout', 'Checkout');

        return evData;
      },

      showCheckoutOption: (evData, data={}) => {
        if (data.type === 'address') {
          this.pageView('fkCheckoutAddress', 'Delivery Address - Checkout');
        } else if (data.type === 'payment') {
          this.pageView('fkCheckoutPayment', 'Payment Method - Checkout');
        } else if (data.type === 'timeslot') {
          this.pageView('fkCheckoutTimeslot', 'Timeslot - Checkout');
          // send 'timeslot-unavailable' event
          this.sendTimeslotEvent();
        }

        return evData;
      },

      showDeliveryOption: (evData, data={}) => {
        if (data.type === 'address') {
          this.pageView('fkDeliveryAddress', 'Delivery Address - Delivery Icon');
        } else if (data.type === 'timeslot') {
          this.pageView('fkDeliveryTimeslot', 'Timeslot - Delivery Icon');
          this.sendTimeslotEvent();
        }

        return evData;
      },

      addAddressOpened: () => {
        let pageType = 'Delivery Address';

        if (document.querySelector('.ngdialog.show-checkout')) {
          pageType += ' - Checkout';
        } else if (document.querySelector('#account-details-page')) {
          pageType += ' - Settings';
        }

        this.pageView('fkAddressPopup', pageType);
      },

      editAddressOpened: () => {
        this.EVENTMAPPING.addAddressOpened();
      },

      addPaymentOpened: (evData, data) => {
        let pageType = 'Payment Method';

        if (document.querySelector('.ngdialog.show-checkout')) {
          pageType += ' - Checkout';
        } else if (document.querySelector('#account-details-page')) {
          pageType += ' - Settings';
        }

        this.pageView(data.paymentType && data.paymentType === 'creditCards' ? 'fkPaymentPopup' : 'fkPaymentPopupBank', pageType);
      },

      editPaymentOpened: (evData, data) => {
        this.EVENTMAPPING.addPaymentOpened(evData, data);
      },

      coStepAddress: (evData, data) => {
        let products = this.getValue('ecommerce.checkout.products');

        $window.dataLayer.push({
          event: 'checkoutStep',
          ecommerce: {
            checkout: {
              actionField: {
                step: 1
              },
              products: products,
              delivery_type: this.getDeliveryType(data.type)
            },
            delivery_type: this.getDeliveryType(data.type)
          }
        });
      },

      coStepPayment: (evData, data) => {
        let selectedPayment = [...data.creditCards, ...data.electronicChecks].filter(p => p.selected)[0];
        let products = this.getValue('ecommerce.checkout.products');

        $window.dataLayer.push({
          event: 'checkoutStep',
          ecommerce: {
            checkout: {
              actionField: {
                step: 3,
                option: selectedPayment && selectedPayment.cardType
              },
              products: products
            }
          }
        });
      },

      coStepTimeslot: (evData, data) => {
        let products = this.getValue('ecommerce.checkout.products');

        $window.dataLayer.push({
          event: 'checkoutStep',
          ecommerce: {
            checkout: {
              actionField: {
                step: 2
              },
              products: products,
              unavailable_timeslot_present: this.isUnavailableTimeslotPresent(),
              available_timeslot_value: data.start
            },
            unavailable_timeslot_present: this.isUnavailableTimeslotPresent(),
            available_timeslot_value: data.start
          }
        });
      },

      coStepDone: (evData, data={}) => {
        let stepNr = 0;

        if (data.step === 'address') {
          stepNr = 1;
        } else if (data.step === 'timeslot') {
          stepNr = 2;
        } else if (data.step === 'payment') {
          stepNr = 3;
        }

        if (stepNr) {
          $window.dataLayer.push({
            event: 'checkoutStep',
            ecommerce: {
              checkout: {
                actionField: {
                  step: stepNr
                }
              }
            }
          });
        }
      },

      orderCancelled: (evData, data) => {
        $window.dataLayer.push({
          event: 'order-cancellation',
          eventCategory: 'Orders',
          eventAction: 'cancelled-order',
          eventLabel: data.orderID
        });

        this.pageView('fkOrderCancelConfirmation', 'Order Cancel');
      },

      checkout: (evData, data) => {
        let coData = data.checkoutData || {},
            od = coData.orderData || {};

        evData.transactionId = coData.data.orderNumber;
        evData.transactionAffiliation = coData.cartDetail.affiliates.reduce((p, c) => { p.push(c.name); return p; }, []).join('|');
        evData.transactionTotal = coData.cartDetail.subtotal;
        evData.transactionShipping = coData.deliveryFee;
        evData.transactionTax = coData.cartDetail.affiliates.reduce((p, c) => p + c.tax, 0);
        evData.transactionProducts = coData.cartDetail.affiliates.reduce((p, c) => p.concat(c.lineItems), []).filter(p => p.productConfiguration).map(p => {
          let pc = p.productConfiguration;

          return {
            name: pc.product.fullName,
            sku: pc.skuCode,
            category: pc.categoryId,
            price: p.price,
            quantity: pc.quantity
          };
        });

        // GA specific
        // reset
        $window.dataLayer.push({
          ecommerce: {
            purchase: null
          }
        });

        // tax + shipping
        let tax = od.orderData.cartDetail.summaryLineCharges.filter(lc => lc.label === 'Total Tax')[0];
        let shipping = od.orderData.cartDetail.summaryLineCharges.filter(lc => lc.label === 'Delivery Charge')[0];
        let products = od.products.map(p => {
          let coP = this.transformProduct(p.productData, {quantity: p.quantity, nolist: true});
          coP.lineItemTotal = p.lineItemTotal.toFixed(2);
          return coP;
        });

        const redemtionPromotions = od.orderData.cartDetail && od.orderData.cartDetail.redemptionPromotions || [];
        const discounts = ((od.orderData.cartDetail && od.orderData.cartDetail.discounts) || []).map(discount => discount.redemptionCode);

        let couponList = new Set(redemtionPromotions.concat(discounts));

        let coupon = Array.from(couponList).join(',').toUpperCase();

        // report CO data
        $window.dataLayer.push({
          event: 'purchase',
          ecommerce: {
            purchase: {
              actionField: {
                id: od.orderId + (od.orderData.modifycount ? '-' + od.orderData.modifycount : ''),
                payment_type: od.payment.cardType,
                revenue: od.total,
                tax: tax && tax.amount || 0,
                shipping: shipping && shipping.amount || 0,
                coupon: coupon,
                redemption_code: od.orderData.cartDetail.redemptionPromotions && od.orderData.cartDetail.redemptionPromotions.join(',').toUpperCase(),
                etipping: od.orderData.cartDetail.tip
              },
              products: products
            },
            available_timeslot_value: od.orderData.reservationDateTime,
            unavailable_timeslot_present: this.isUnavailableTimeslotPresent()
          }
        });

        // report pageView
        this.pageView('fkOrderConfirm', 'Order Confirm');

        return evData;
      },

      modalClick: (evData, data) => {
        $window.dataLayer.push({
          event: 'modal-click',
          eventCategory: 'modal',
          eventAction: data.type === 'feed' ? 'feed' : 'picks',
          eventLabel: data.label
        });
      }
    };

    $window.dataLayer = $window.dataLayer || [];

    $scope.$on('fk-analytics', (ev, data) => {
      let eventData = {
        event: data.event
      };

      if (this.EVENTMAPPING[data.event]) {
        eventData = this.EVENTMAPPING[data.event](eventData, data.data, data.event);
      }

      if (eventData) {
        eventData[data.event+'-data'] = data.data;
        $window.dataLayer.push(eventData);
      }
    });

    this.$postLink = () => {
      this.loadGTM();
    };

    // provide access for developers
    if (fkUtils.isDeveloper()) {
      $window.FoodKick = $window.FoodKick || {};
      $window.FoodKick.GTM = this;
    }
  }

  sendTimeslotEvent() {
    let unavts = this.isUnavailableTimeslotPresent();

    this.$window.dataLayer.push({
      event: 'timeslot-unavailable',
      eventCategory: 'timeslot',
      eventAction: 'click',
      eventLabel: unavts,
      unavailable_timeslot_present: unavts
    });
  }

  isUnavailableTimeslotPresent() {
    return this.fkDeliveryTimeslotService.unavailableTimeslotPresent();
  }

  resetImpressions() {
    this.setValue('ecommerce.impressions', null);
    this.setValue('ecommerce.impressions', []);
  }

  resolvePageType(state) {
    if (state.name && PAGETYPEMAP[state.name]) {
      return PAGETYPEMAP[state.name](state);
    }

    return state.name || 'unknown';
  }

  pageView(name, type) {
    this.$window.dataLayer.push({
      event: 'virtual-pageview',
      page_name: name,
      page_type: type,
      page_language: 'english'
    });
  }

  getDeliveryType(dtype) {
    dtype = '' + dtype;
    dtype = dtype.toUpperCase();

    if (dtype === 'CORP') {
      dtype = 'CORPORATE';
    }

    if (dtype !== 'CORPORATE') {
      dtype = 'HOME';
    }

    return dtype;
  }

  getProductList(product) {
    let list = [];

    // channel
    if (product.variantId) {
      list.push('channel_'+product.variantId);
    } else if (product.list && product.list.channel) {
      list.push('channel_'+product.list.channel);
    } else {
      list.push('channel_unknown');
    }

    // location
    if (product.list && product.list.location) {
      list.push('loc_'+product.list.location);
    } else {
      list.push('loc_unknown');
    }

    // title
    if (product.list && product.list.title) {
      list.push('title_'+product.list.title);
    }

    return list.join('-').toLowerCase();
  }

  transformProduct(product, config={}) {
    let p = {
      name: product.productNameNoBrand || product.productName,
      product_id: product.productId,
      id: product.skuCode,
      price: product.price,
      brand: product.brandName,
      category: product.catId,
      variant: product.variantId,
      dimension3: product.newProduct ? 'yes' : 'no', // new product
      dimension6: product.available ? 'yes' : 'no' // in stock
    };

    if (config.quantity) {
      p.quantity = config.quantity;
    }

    if (!config.nolist) {
      p.list = config.list || this.getProductList(product);
      p.position = config.position || product.position || 1;
    }

    return p;
  }

  check() {
    return this.$window.google_tag_manager && this.$window.google_tag_manager[this.GTMID];
  }

  getValue(query) {
    return this.check() && this.$window.google_tag_manager[this.GTMID].dataLayer.get(query);
  }

  setValue(prop, value) {
    return this.check() && this.$window.google_tag_manager[this.GTMID].dataLayer.set(prop, value);
  }

  loadGTM() {
    if (document.getElementById('gtm-js')) {
      this.$log.warn('GTM already loaded.');
    } else {
      (function(w, d, s, l, i, a, p) {
        w[l] = w[l] || [];
        w[l].push({
          'gtm.start': new Date().getTime(),
          event: 'gtm.js'
        });

        var f = d.getElementsByTagName(s)[0],
          j = d.createElement(s),
          dl = l !== 'dataLayer' ? '&l=' + l : '';

        j.async = true;
        j.id = 'gtm-js';
        j.src = 'https://www.googletagmanager.com/gtm.js?id=' + i + dl+'&gtm_auth=' + a + '&gtm_preview=' + p + '&gtm_cookies_win=x';
        f.parentNode.insertBefore(j, f);
      })(window, document, 'script', 'dataLayer', this.GTMID, this.GTM_AUTHID, this.GTM_PREVIEW);
    }
  }
}

FkAnalyticsGoogleTagManagerCtrl.$inject = ['$scope', '$window', '$log', 'fkCartService', 'fkDeliveryTimeslotService', 'fkUtils', 'CONFIG'];

export default FkAnalyticsGoogleTagManagerCtrl;
