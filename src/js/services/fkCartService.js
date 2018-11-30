class FkCartService {
  constructor(fkHttp, fkUserService, fkProductService, $rootScope, $log, $q, API, fkUtils, fkOrderModifyService, fkCartUtilsService) {
    this.fkHttp = fkHttp;
    this.fkUserService = fkUserService;
    this.fkProductService = fkProductService;
    this.$rootScope = $rootScope;
    this.$log = $log;
    this.$q = $q;
    this.API = API;
    this.fkUtils = fkUtils;
    this.fkOrderModifyService = fkOrderModifyService;
    this.fkCartUtilsService = fkCartUtilsService;

    this.cartDialog = null;
    this.cartDetail = null;
    this.orderDetail = null;
    this.nrItemsInCart = null;
    this.dpCartDetail = null;
    this.productsInCart = {};
    this.cartLines = {};

    this.flattenCart = this.fkCartUtilsService.flattenCart;
    this.viewCartlines = this.fkCartUtilsService.viewCartlines;

    this.$rootScope.$on('products-updated', (ev, data) => {
      if (this.cartDetail) {
        this.cartDetail.affiliates.forEach(aff => {
          aff.lineItems.forEach(li => {
            if (li.productConfiguration && li.productConfiguration.productPotato) {
              if (data[li.productConfiguration.productPotato.productData.productId]) {
                li.productConfiguration.productPotato = data[li.productConfiguration.productPotato.productData.productId];
              }
            }
          });
        });
      }
    });

    this.$rootScope.$on('fk-open-cart', (ev, data) => {
      if (data && data.cartDetail) {
        this.updateCart({
          cartDetail: data.cartDetail
        });
      }
    });

    this.$rootScope.$on('fk-dispatch-cartDetail', (ev, data) => {
      this.updateCart({
        cartDetail: data
      });
      if (!data.orderNumber) {
        this.fkOrderModifyService.cancelModifyState();
      } else {
        this.fkOrderModifyService.loadModifiedOrder(data.orderNumber);
      }
    });

    this.$rootScope.$on('fk-dispatch-removedProducts', (ev, data) => {
      // products removed on darkstore change
      this.$rootScope.$broadcast('fk-products-removed', {
        removedProducts: data
      });
    });

    this.$rootScope.$on('fk-user-change', (ev, data) => {
      if (!data.user) {
        this.clearCart();
      }
    });
  }

  generateOptionHash(opt) {
    let hash = '';
    if (opt) {
      hash = Object.keys(opt).sort().reduce((prev, current) => prev + (prev.length ? '|' : '') + current + '-' + opt[current], hash);
    }
    return hash;
  }

  getCombinedProductIdSimple(productId, opt) {
    return productId + this.generateOptionHash(opt);
  }

  getCombinedProductId(productConfig) {
    return this.getCombinedProductIdSimple(productConfig.productId, productConfig.options);
  }

  processLineItems(lineItems) {
    var nr = 0;

    lineItems.forEach((lineItem) => {


      if (lineItem.productConfiguration && lineItem.productConfiguration.quantity) {
        let pc = lineItem.productConfiguration;
        let cPid = this.getCombinedProductId(pc);
        nr += pc.quantity;


        this.productsInCart[cPid] = this.productsInCart[cPid] || {
            quantity: 0,
            subtotal: 0
          };
        let pcInC = this.productsInCart[cPid];

        pcInC.quantity += pc.quantity;
        pcInC.subtotal += lineItem.price;
        pcInC.lineItem = lineItem;

        this.cartLines[lineItem.cartLineId] = lineItem;
      }

      if (lineItem.lineItems) {
        nr += this.processLineItems(lineItem.lineItems);
      }

    });

    return nr;
  }

  constructProductConfiguration(productId, skucode, quantity, categoryId, salesUnit, options, productName, utPrice) {
    salesUnit = salesUnit || {};
    options = options || {};
    categoryId = categoryId || {};

    var productConfig = {};
    productConfig.product = {};
    productConfig.product.id = productId;
    productConfig.product.categoryId = categoryId;
    productConfig.product.fullName = productName;
    productConfig.product.utPrice = utPrice;
    productConfig.product.sku = {};
    productConfig.product.sku.code = skucode;
    productConfig.quantity = quantity;
    productConfig.salesUnit = salesUnit;
    productConfig.options = options;

    return productConfig;
  }

  calculateItemsInCart(cartData) {
    var nr = 0;

    this.productsInCart = {};
    this.cartLines = {};

    if (cartData && cartData.affiliates && cartData.affiliates.length) {
      cartData.affiliates.forEach((aff) => {
        if (aff.lineItems && aff.lineItems.length) {
          nr += this.processLineItems(aff.lineItems);
        }
      });
    }
    return nr;
  }

  clearCart() {
    this.updateCart({}, true);
  }

  updateCart(data, clearCart) {
    if (data && data.cartDetail) {
      this.nrItemsInCart = this.calculateItemsInCart(data.cartDetail);
      this.cartDetail = this.fkCartUtilsService.flattenCart(data.cartDetail);

      this.$rootScope.$broadcast('fk-cart-changed', this.cartDetail);
    } else if (clearCart) {
      this.cartDetail = null;
      this.nrItemsInCart = null;
      this.productsInCart = {};
      this.cartLines = {};

      this.$rootScope.$broadcast('fk-cart-changed', this.cartDetail);
    }
    return this.cartDetail;
  }

  addItem(productConfiguration, config = {}, dpFlag) {

    return this.fkHttp({
      spinner: 'ATC',
      method: 'POST',
      dispatch: true,
      url: this.fkUtils.replaceURLParams(this.API.addItemToCart, {
        username: this.fkUserService.user && this.fkUserService.user.username || "username"
      }),
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      list: config.list,
      product: config.product && config.product.productData,
      data: config.data || this.fkUtils.postData({
        productConfiguration: productConfiguration,
        dlvPassCart: dpFlag
      })
    }).then((response) => {
      this.$rootScope.$broadcast('fk-cart-atc', {productConfiguration, response});

      return response;
    }).catch((error) => {
      this.$log.error(error);
      this.$rootScope.$broadcast('fk-cart-atc-failed', {productConfiguration, error});
      return {
        errors: {
          CLIENT_ERROR: error
        }
      };
    });
  }

  addItems(productsConfiguration, config = {}) {

    return this.fkHttp({
      spinner: 'ATC',
      method: 'POST',
      dispatch: true,
      url: this.fkUtils.replaceURLParams(this.API.addItemsToCart, {
        username: this.fkUserService.user && this.fkUserService.user.username || "username"
      }),
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      list: config.list,
      products: config.products || [config.product],
      data: config.data || this.fkUtils.postData({
        productsConfiguration: productsConfiguration
      })
    }).then((response) => {
      this.$rootScope.$broadcast('fk-cart-atc', {productsConfiguration, response});

      return response;
    }).catch((error) => {
      this.$log.error(error);
      this.$rootScope.$broadcast('fk-cart-atc-failed', {productsConfiguration, error});
      return {
        errors: {
          CLIENT_ERROR: error
        }
      };
    });
  }

  setQtyInCart(product, qty, config, selectedVariantValues, selectedSalesUnit) {
    let pcInC = this.productsInCart[this.getCombinedProductIdSimple(product.productData && product.productData.productId, selectedVariantValues || {})],
      change = pcInC ? qty - pcInC.quantity : qty;

    if (selectedVariantValues && Object.keys(selectedVariantValues).length > 0) {
      change = qty;
    }
    return this.changeInCart(product, change, config, selectedVariantValues, selectedSalesUnit);
  }

  changeInCart(product, change, config = {}, selectedVariantValues, selectedSalesUnit) {
    let pcInC = this.productsInCart[this.getCombinedProductIdSimple(product.productData && product.productData.productId, selectedVariantValues || {})],
      max = product.productData && product.productData.quantity && product.productData.quantity.qMax && Math.floor(+product.productData.quantity.qMax) || 99,
      cartLine = pcInC && pcInC.lineItem;

    config.product = product;

    if (config.product.productData) {
      config.product.productData.position = config.position;
    }

    if (!cartLine && change > 0 && product.productData) {
      return this.addItem(
        this.constructProductConfiguration(
          product.productData.productId,
          product.productData.skuCode,
          Math.max(change, product.productData.quantity.qMin),
          product.productData.catId,
          selectedSalesUnit,
          selectedVariantValues,
          product.productData.productName,
          product.productData.price
        ),
        config
      );
    }

    if (cartLine && change !== 0 && max >= pcInC.quantity + change) {
      cartLine.productConfiguration.quantity += change;
      if (cartLine.productConfiguration.quantity >= (product.productData.quantity && product.productData.quantity.qMin || 1)) {
        return this.updateCartline(
          cartLine.cartLineId,
          cartLine.productConfiguration,
          config
        );
      }
      return this.deleteCartlines([cartLine.cartLineId], config);
    }

    return this.$q.resolve();
  }

  increaseInCart(product, config = {}) {
    return this.changeInCart(product, product.productData && product.productData.quantity && product.productData.quantity.qInc || 1, config);
  }

  decreaseInCart(product, config = {}) {
    return this.changeInCart(product, -(product.productData && product.productData.quantity && product.productData.quantity.qInc || 1), config);
  }

  changeCartlines(cartLineChanges, config = {}) {
    var pr_delete, pr_update;

    if (cartLineChanges.deleted && cartLineChanges.deleted.length) {
      pr_delete = this.deleteCartlines(
        cartLineChanges.deleted.map(cl => cl.cartLineId).filter(id => id),
        config
      );
    }
    if (cartLineChanges.updated && cartLineChanges.updated.length) {
      pr_update = this.updateCartlines(cartLineChanges.updated, config);
    }

    return this.$q.all([pr_delete, pr_update]).then(responseList => {
      return {
        responseList: responseList
      };
    });
  }

  updateCartlines(cartLines, config) {
    if (!(cartLines instanceof Array)) {
      cartLines = [cartLines];
    }

    return this.$q.all(cartLines.map(cartLine => this.updateCartline(cartLine.cartLineId, cartLine.productConfiguration, config)));
  }
    //delivery pass related

  dpConfiguration(productId, skucode, quantity, categoryId, salesUnit, productName) {

    var productConfig = {};
    productConfig.product = {};
    productConfig.product.id = productId;
    productConfig.product.categoryId = categoryId;
    productConfig.product.fullName = productName;
    productConfig.product.sku = {};
    productConfig.product.sku.code = skucode;
    productConfig.quantity = quantity;
    productConfig.salesUnit = "EA";

    return productConfig;
  }

  addDpToCart(product, change, config = {}, dpFlag, selectedSalesUnit) {

    config.product = product;

    let flag = dpFlag;

    if (config.product.productData) {
      config.product.productData.position = config.position;
    }

    if (change > 0 && product.productData) {
      return this.addItem(
        this.dpConfiguration(
          product.productData.productId,
          product.productData.skuCode,
          Math.max(change, product.productData.quantity.qMin),
          product.productData.catId,
          selectedSalesUnit,
          product.productData.productName
        ),
        config, flag
      );
    }

    return this.$q.resolve();
  }

  addDpInCart(product, config = {}, dpFlag) {
    return this.addDpToCart(product, product.productData && product.productData.quantity && product.productData.quantity.qInc || 1, config, dpFlag);
  }

  updateCartline(cartLineId, pc, config = {}) {
    let filteredPc,
        pd = pc.productPotato && pc.productPotato.productData;

    // ... inconsistent API ...
    filteredPc = {
      product: {
        id: pd && pd.productId || pc.product.id,
        categoryId: pd && pd.catId || pc.product.categoryId,
        fullName: pd && pd.productName,
        utPrice: pd && pd.price,
        sku: {
          code: pc.skuCode
        }
      },
      quantity: pc.quantity,
      salesUnit: pc.salesUnit,
      options: pc.options
    };

    if (config.product && config.product.productData) {
      config.product.productData.inCartAmount = pd.inCartAmount;
    }

    return this.fkHttp({
      spinner: 'cartline-update',
      method: 'POST',
      dispatch: true,
      url: this.fkUtils.replaceURLParams(this.API.updateCartline, {
        username: this.fkUserService.user && this.fkUserService.user.username || "username"
      }),
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      list: config.list,
      product: config.product && config.product.productData || pd,
      data: config.data || this.fkUtils.postData({
        cartLineId: cartLineId,
        productConfiguration: filteredPc
      })
    }).then((response) => {
      this.$rootScope.$broadcast('fk-cart-update', {filteredPc, cartLineId, response});

      return response;
    }).catch((error) => {
      this.$log.error(error);
      this.$rootScope.$broadcast('fk-cart-update-failed', {filteredPc, cartLineId, error});
      return {
        errors: {
          CLIENT_ERROR: error
        }
      };
    });
  }

  deleteCartlines(cartLineIds, config = {}) {
    if (!cartLineIds || !cartLineIds.length) {
      return null;
    }

    // resolve products
    let products = cartLineIds.map(clid => {
      let cl = this.cartLines[+clid],
          pc = cl && cl.productConfiguration,
          pd = pc && pc.product && pc.product.productData;
      return pd;
    });

    return this.fkHttp({
      spinner: 'cartline-update',
      method: 'POST',
      dispatch: true,
      url: this.fkUtils.replaceURLParams(this.API.removeCartlines, {
        username: this.fkUserService.user && this.fkUserService.user.username || "username"
      }),
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      list: config.list,
      products: products,
      data: config.data || this.fkUtils.postData({
        ids: cartLineIds
      })
    }).then((response) => {
      this.$rootScope.$broadcast('fk-cart-delete', {cartLineIds, response});

      return response;
    }).catch((error) => {
      this.$log.error(error);
      this.$rootScope.$broadcast('fk-cart-delete-failed', {cartLineIds, error});
      return {
        errors: {
          CLIENT_ERROR: error
        }
      };
    });
  }

  deleteAllCartlines() {
    let cartLineIds = Object.keys(this.cartLines);

    let products = cartLineIds.map(clid => {
      let cl = this.cartLines[+clid],
          pc = cl && cl.productConfiguration,
          pd = pc && pc.product && pc.product.productData;
      return pd;
    });

    return this.fkHttp({
      spinner: 'empty-bag',
      method: 'POST',
      dispatch: true,
      products: products,
      url: this.fkUtils.replaceURLParams(this.API.removeallitems, {
        username: this.fkUserService.user && this.fkUserService.user.username || "username"
      }),
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }).then((response) => {
      this.$rootScope.$broadcast('fk-cart-delete', {cartLineIds, response});

      return response;
    }).catch((error) => {
      this.$log.error(error);
      this.$rootScope.$broadcast('fk-cart-delete-failed', {cartLineIds, error});
      return {
        errors: {
          CLIENT_ERROR: error
        }
      };
    });
  }

  setTip(amount) {
    amount = amount ? "" + amount : "0";

    return this.fkHttp({
      spinner: 'set-tip',
      method: 'GET',
      dispatch: true,
      url: this.fkUtils.replaceURLParams(this.API.setTip, {
        username: this.fkUserService.user && this.fkUserService.user.username || "username",
        amount: amount
      })
    }).then((response) => {
      // update cart on success
      if (response.data && response.data.status === 'SUCCESS') {
        this.viewCartlines();
        this.getOrderDetail();
      }

      return response.data;
    }).catch((error) => {
      this.$log.error(error);
      return {
        errors: {
          CLIENT_ERROR: error
        }
      };
    });
  }

  removeAllAlcohol() {
    return this.fkHttp({
      spinner: 'remove-alcohol',
      method: 'POST',
      dispatch: true,
      url: this.API.removeAllAlcohol
    });
  }

  verifyAge() {
    return this.fkHttp({
      spinner: 'verify-age',
      method: 'POST',
      dispatch: true,
      url: this.API.verifyAge
    });
  }

  getOrderDetail(dispatch) {
    return this.fkHttp({
      spinner: 'get-order-details',
      method: 'GET',
      dispatch: dispatch !== false,
      url: this.fkUtils.replaceURLParams(this.API.getOrderDetail, {
        username: this.fkUserService.user && this.fkUserService.user.username || "username"
      })
    }).then((response) => {
      this.orderDetail = response.data && response.data.cartDetail;
      if (response.data && response.data.cartDetail && response.data.cartDetail.redemptionPromotions) {
        this.$rootScope.$broadcast('fk-promo-code-problem', response.data.cartDetail.redemptionPromotions[0]);
      }
      return response.data;
    }).catch((error) => {
      this.$log.error(error);
      return {
        errors: {
          CLIENT_ERROR: error
        }
      };
    });
  }

  getDpCartlines() {
    return this.fkHttp({
        spinner: 'get-order-details',
        method: 'POST',
        url: this.fkUtils.replaceURLParams(this.API.getOrderDetail, {username: "username"}),
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        data: this.fkUtils.postData({dlvPassCart: 'true'})
      }).then((response) => {
        this.dpCartDetail = response.data && response.data.cartDetail;
        if (response.data && response.data.cartDetail && response.data.cartDetail.redemptionPromotions) {
        this.$rootScope.$broadcast('fk-dp-promo-code-error', response.data.cartDetail.redemptionPromotions[0]);
      }
        return response;
      }).catch((error) => {
        this.$log.error(error);
        return {error: error};
      });
    }

}

FkCartService.$inject = ['fkHttp', 'fkUserService', 'fkProductService', '$rootScope', '$log', '$q', 'API', 'fkUtils', 'fkOrderModifyService', 'fkCartUtilsService'];

export default FkCartService;
