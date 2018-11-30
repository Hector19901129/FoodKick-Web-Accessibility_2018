class FkGroupScaleDetailsCtrl {
  constructor($rootScope, $timeout, fkProductService, fkCartService, fkProductDetailService) {
    this.$rootScope = $rootScope;
    this.$timeout = $timeout;
    this.fkProductService = fkProductService;
    this.fkCartService = fkCartService;
    this.fkProductDetailService = fkProductDetailService;

    this.gsdpage = 'true';
    this.gsdProducts = [];
    this.gsdSavings = 0;
    this.gsdProductsFromGroup = 0;

    fkProductService.getProductsFromGroup(fkProductDetailService.getGroupScaleId(), fkProductDetailService.getGroupScaleVersion()).then((data) => {
      this.gsdProducts = data.products;
      this.gsdProducts = this.sortProductsByCart(this.gsdProducts);
      this.calculateSavings(fkCartService.productsInCart, fkProductDetailService.getGroupScaleId());
      $timeout(() => {
        $rootScope.$emit('lazyImg:refresh');
      }, 100);
    });

    $rootScope.$on('fk-cart-changed', () => {
      this.calculateSavings(fkCartService.productsInCart, fkProductDetailService.getGroupScaleId());
    });
  }

  sortProductsByCart(products) {
    return (products.filter(product => product.inCart && product.available).concat(products.filter(product => !product.inCart && product.available))).concat(products.filter(product => !product.available));
  }

  calculateSavings(cartItems, groupId) {
    let productsInCartAndGroup = [].concat.apply([],Object.keys(cartItems).filter(key => cartItems[key] && cartItems[key].lineItem && cartItems[key].lineItem.productConfiguration && cartItems[key].lineItem.productConfiguration.product && cartItems[key].lineItem.productConfiguration.product.sku && cartItems[key].lineItem.productConfiguration.product.sku.groupId && cartItems[key].lineItem.productConfiguration.product.sku.groupId === groupId));

    this.gsdProductsFromGroup = productsInCartAndGroup.map((key) => parseInt(cartItems[key].quantity, 10)).reduce((a, b) => a + b, 0);
    this.gsdSavings = productsInCartAndGroup.map((key) => cartItems[key].lineItem.groupScaleSavings).reduce((a, b) => a + b, 0);
  }

}

FkGroupScaleDetailsCtrl.$inject = ['$rootScope', '$timeout', 'fkProductService', 'fkCartService', 'fkProductDetailService'];

export default FkGroupScaleDetailsCtrl;
