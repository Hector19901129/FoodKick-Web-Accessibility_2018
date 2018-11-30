class FkProductTileCtrl {
  constructor($rootScope, $scope, $element, fkCartService, fkUtils) {
    this.$rootScope = $rootScope;
    this.$scope = $scope;
    this.$element = $element;
    this.fkCartService = fkCartService;
    this.fkUtils = fkUtils;
    $scope.fkCartService = fkCartService;
    this.ismobile = this.decideIsMobile(fkUtils.getActiveBreakpoint());


    $scope.increase = () => {
      $scope.$broadcast('add_to_bag_clicked');
    };

    $scope.close = () => {
      $scope.$broadcast('fk-hide-earliest-msg');
    };

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

    $scope.$on('fk-show-earliest-msg' , () => {
      this.setShowEarlyMsg(true);
    });

    $scope.$on('fk-hide-earliest-msg' , () => {
      this.setShowEarlyMsg(false);
    });

    $scope.$on('product-atc-adding', e => this.stopEventChangeClass(e, true, 'adding'));

    $scope.$on('product-atc-adding-done', e => this.stopEventChangeClass(e, false, 'adding'));

    $scope.$on('product-atc-removing', e => this.stopEventChangeClass(e, true, 'removing'));

    $scope.$on('product-atc-removing-done', e => this.stopEventChangeClass(e, false, 'removing'));

    this.$postLink = () => this.product && this.product.productData ? this.setFake() : true;
  }

  setFake() {
    if (!this.product || this.product.fake) {
      this.$element.addClass('fake');
    } else {
      this.$element.removeClass('fake');
    }
  }

  stopEventChangeClass(e, add, css) {
    e.stopPropagation();
    if (add) {
      this.$element.addClass(css);
    } else {
      this.$element.removeClass(css);
    }
  }

  productUrl(id) {
    return `/product/${id}`;
  }

  isSimpleProduct() {
    return !this.product.productData.alcoholic && !(this.product.productData.variations && this.product.productData.variations.length > 0);
  }

  setShowEarlyMsg(flag) {
    this.product.productData.showEarlyMsg = flag;
  }

  decideIsMobile (bp) {
    return bp === 'xs' || bp === 'sm';
  }

}

FkProductTileCtrl.$inject = ['$rootScope', '$scope', '$element', 'fkCartService', 'fkUtils'];

export default FkProductTileCtrl;
