class FkQuantityDropDownSelectorCtrl {
  constructor($scope, fkCartService) {
    this.$scope = $scope;
    this.fkCartService = fkCartService;

    const checkQuantity = (q) => q < 10;

    this.$postLink = () => {
      let qty = this.product && this.product.productData && this.product.productData.quantity,
          min = this.min || qty && qty.qMin || 1.0,
          max = this.max || qty && Math.floor(qty.qMax) || 99.0,
          inc = this.inc || qty && qty.qInc || 1.0;

          if (this.available > 0 && this.available < 99){
            max = this.available || this.max || qty && Math.floor(qty.qMax) || 99.0;
          }

      $scope.dropDownValues = [];

      for (let i = min; i < 10; i += inc) {
        $scope.dropDownValues.push({label: i, value: i});
      }

      $scope.dropDownValues.push({label: 'MORE', value: 10});

      $scope.showSelect = checkQuantity(fkCartService.productsInCart[this.product.productData.productId] && fkCartService.productsInCart[this.product.productData.productId].quantity || this.quantity);

      $scope.emitEvent = (force) => {

        this.quantity = this.quantity - this.quantity % inc;
        this.quantity = Math.max(Math.min(this.quantity, max), min);
        if (this.emitEvent || force) {
          $scope.$emit('fk-quantity-change', {quantity: this.quantity});
        }
        $scope.showSelect = checkQuantity(this.quantity);
        $scope.$emit('fk-quantity-selector-change', {quantity: this.quantity});
        $scope.$emit('fk-hide-atp-alert');
      };

    };
  }

}

FkQuantityDropDownSelectorCtrl.$inject = ['$scope', 'fkCartService'];

export default FkQuantityDropDownSelectorCtrl;
