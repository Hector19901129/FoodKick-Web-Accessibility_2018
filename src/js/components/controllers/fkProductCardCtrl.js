class FkProductCardCtrl {
  constructor($rootScope, $scope, $element, fkCartService, fkUtils) {
    this.$rootScope = $rootScope;
    this.$scope = $scope;
    this.$element = $element;
    this.fkCartService = fkCartService;
    this.fkUtils = fkUtils;
    $scope.fkCartService = fkCartService;
    this.ismobile = this.decideIsMobile(fkUtils.getActiveBreakpoint());


    $scope.pdpOpen = (ev, pdpFeedType) => {
      if (ev && ev.preventDefault) {
        ev.preventDefault();
        ev.stopPropagation();

        // report product click event
        $scope.$emit('fk-product-tile-clicked', {product: this.product});
      }

      $rootScope.$broadcast('fk-pdp-open',{
        product: this.product,
        pdpFeedType: pdpFeedType
      });
    };

    this.$postLink = () => this.product && this.product.productData ? this.setFake() : true;
  }

  setFake() {
    if (!this.product || this.product.fake) {
      this.$element.addClass('fake');
    } else {
      this.$element.removeClass('fake');
    }
  }

  productUrl(id) {
    return `/product/${id}`;
  }

  decideIsMobile (bp) {
    return bp === 'xs' || bp === 'sm';
  }

}

FkProductCardCtrl.$inject = ['$rootScope', '$scope', '$element', 'fkCartService', 'fkUtils'];

export default FkProductCardCtrl;
