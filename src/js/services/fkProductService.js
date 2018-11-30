class FkProductService {
  constructor (fkHttp, $rootScope, $log, fkUtils, API) {
    this.fkHttp = fkHttp;
    this.$rootScope = $rootScope;
    this.$log = $log;
    this.fkUtils = fkUtils;
    this.API = API;

    this.prerenderStatus = null;
  }

  // product cache removed due to lack of API support
  update() {}
  updateAll() {}

  setPrerenderStatus(status) {
     this.prerenderStatus = status;
  }

  getPrerenderStatus() {
    return this.prerenderStatus;
  }

  getProductFromAPI(productId, config = {}) {
    let httpPromise = this.fkHttp({
      spinner: 'product',
      method: 'GET',
      url: this.fkUtils.replaceURLParams(this.API.getProductDetail, {
        catID: config.categoryId || 'category',
        productID: productId
      })
    }).then((response) => {
      if (response.data.status === 'FAILED') {
        if (!response.data.errors.ERR_HEALTH_WARNING) {
          this.$log.warn('Error retrieving product: ' + productId, response.data.errors);
          this.$rootScope.$broadcast('product-not-found', {
            id: productId,
            response: response.data
          });
        }
      }

      return response.data.product;
    }).catch((error) => {
      this.$log.error(error);
      return {error: error};
    });

    return httpPromise;
  }

  getProduct(productId, config = {}) {
    return this.getProductFromAPI(productId, config);
  }

  getProductsFromAPI(productIds, config = {}) {
    let products = config.products || {},
      httpPromise = this.fkHttp({
        spinner: 'product',
        method: 'POST',
        url: this.API.getMultiProductDetail,
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        data: config.data || this.fkUtils.postData({
          ids: productIds
        })
      }).then((result) => {
        if (result.data && result.data.products) {
          result.data.products.filter(p => p.productData && p.productData.productId).forEach(p => {
            products[p.productData.productId] = p;
          });
        }

        return products;
      }).catch((error) => {
        this.$log.error(error);
        return {error: error};
      });

    return httpPromise;
  }

  getProducts(productIds, config = {}) {
    productIds = Array.isArray(productIds) ? productIds : [productIds];

    return this.getProductsFromAPI(productIds, config);
  }

  getProductsFromGroup(groupId, groupVersion) {
    return this.fkHttp({
      spinner: 'product',
      method: 'POST',
      headers: {'Content-Type': 'application/x-www-form-urlencoded'},
      data: this.fkUtils.postData({
        groupId: groupId,
        groupVersion: groupVersion
      }),
      url: this.API.getGroupProducts
    }).then((response) => {
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

}

FkProductService.$inject = ['fkHttp', '$rootScope', '$log', 'fkUtils', 'API'];

export default FkProductService;
