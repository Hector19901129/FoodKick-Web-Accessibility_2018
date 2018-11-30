class FkPDPCtrl {
  constructor($scope, $state, fkMetaService, fkProductService, fkProductDetailService, Product) {
    this.$scope = $scope;
    this.$state = $state;
    this.fkMetaService = fkMetaService;
    this.fkProductService = fkProductService;
    this.fkProductDetailService = fkProductDetailService;
    this.Product = Product;

    this.productId = null;

    if (Product && Product.productData) {
      fkProductDetailService.product = Product;
      this.productId = Product.productData.productId;

      if (Product.productExtraData) {
        let extraData = Product.productExtraData;
        fkMetaService.setSeo(extraData.pageTitle || Product.productData.productName + ' | FoodKick', extraData.seoMetaDescription || 'Looking for ' + Product.productData.productName + '? Order from FoodKick now for same-day delivery.');
      }
    } else {
      if (!fkProductService.getPrerenderStatus()){
        $state.go('not-found');
      }

      document.getElementsByName('prerender-status-code')[0].setAttribute('content', '404');
      document.getElementsByName('description')[0].setAttribute('content', "Product not found");
    }

    $scope.$on('product-not-found', (ev, data) => {
      if (data.id === this.productId && (!data.response.errors || !data.response.errors.ERR_HEALTH_WARNING)) {
        $state.go('not-found');
      }
    });
  }

}

FkPDPCtrl.$inject = ['$scope', '$state', 'fkMetaService', 'fkProductService', 'fkProductDetailService', 'Product'];

export default FkPDPCtrl;
