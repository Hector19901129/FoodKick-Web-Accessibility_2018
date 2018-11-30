class FkAtcPdpCtrl {
  constructor($scope, $element, fkCartService, fkUtils, $rootScope) {
    this.$scope = $scope;
    this.$element = $element;
    this.fkCartService = fkCartService;
    this.fkUtils = fkUtils;
    this.$rootScope = $rootScope;
    this.ismobile = this.decideIsMobile(fkUtils.getActiveBreakpoint());

    $scope.quantity = 0;
    $scope.showAvailability = false;

    const initButton = () => {
      this.pcInC = fkCartService.productsInCart && this.product && this.product.productData && fkCartService.productsInCart[this.product.productData.productId];
      $scope.buttonText = this.pcInC ? 'Update bag' : 'Add to Bag';
    };

    this.$postLink = () => {
      this.pcInC = fkCartService.productsInCart && this.product && this.product.productData && fkCartService.productsInCart[this.product.productData.productId];
      this.qty = this.product && this.product.productData && this.product.productData.quantity || {
        qMin: 1,
        qMax: 99,
        qInc: 1
      };

      $scope.quantity = Math.max(this.pcInC ? this.pcInC.quantity : 0, this.qty.qMin);

      initButton();
    };

    const focusInput = () => {
      let qtyInput = $element[0].querySelector('.quantity-select, .quantity-input');

      if (qtyInput) {
        qtyInput.focus();
      }
    };

    const qtyChanged = () => {
      initButton();
      focusInput();
    };

    $scope.fkCartService = fkCartService;
    $scope.updateBag = () => {

      if ($scope.quantity >= this.available && this.available > 0) {
        $scope.quantity = this.available;
        $scope.showAvailability = true;
        $rootScope.$broadcast('show-availableQty-text', {selectedQty:$scope.quantity});
      }
      else {
        $rootScope.$broadcast('hide-availableQty-text', {selectedQty:$scope.quantity});
      }

      if (+$scope.quantity < this.qty.qMin) {
        $scope.quantity = this.qty.qMin;
      } else if (+$scope.quantity % this.qty.qInc !== 0) {
        $scope.quantity = Math.max($scope.quantity - +$scope.quantity % this.qty.qInc, this.qty.qMin);
      } else {

        if (+$scope.quantity > this.qty.qMax) {
          $scope.quantity = Math.floor(this.qty.qMax);
        }

        $scope.buttonText = 'Updating ...';
        $scope.$emit('product-atc-adding');
        $scope.$emit('fk-hide-atp-alert');
        this.onUpdate({quantity: $scope.quantity});
      }
    };

    $scope.$on('product-atc-adding-done', (data) => {
      if (data.status === 'SUCCESS') {
        $scope.buttonText = 'Bag updated';
        focusInput();
      } else {
        // TODO display error somewhere
        // - e.g. ERR_HEALTH_WARNING should be handled by health warning popup
        initButton();
        focusInput();
      }
    });

    $scope.$watch('quantity', qtyChanged);
    $scope.$on('fk-quantity-change', $scope.updateBag);
  }

  decideIsMobile (bp) {
    return bp === 'xs' || bp === 'sm';
  }

}

FkAtcPdpCtrl.$inject = ['$scope', '$element', 'fkCartService', 'fkUtils', '$rootScope'];

export default FkAtcPdpCtrl;
