class FkQuantitySelectorCtrl {
  constructor($scope) {
    this.$scope = $scope;

    this.$postLink = () => {
      let qty = this.product && this.product.productData && this.product.productData.quantity,
          min = this.min || qty && qty.qMin || 1.0,
          max = this.max || qty && Math.floor(qty.qMax) || 99.0,
          inc = this.inc || qty && qty.qInc || 1.0;

      $scope.quantity = this.quantity || min;
      this.setLocalQuantity(this);

      $scope.addItem = () => {
        if ($scope.quantity < max) {
          $scope.quantity = +$scope.quantity + inc;
          this.setLocalQuantity(this);

          $scope.$emit('fk-quantity-change', {quantity: $scope.quantity});
        }
      };

      $scope.removeItem = () => {
        if ($scope.quantity > min) {
          $scope.quantity -= inc;
          this.setLocalQuantity(this);

          $scope.$emit('fk-quantity-change', {quantity: $scope.quantity});
        }
      };

      $scope.checkValue = () => {
        if ($scope.quantity >= max) {
          $scope.quantity = max;
          this.setLocalQuantity(this);
        }

        if ($scope.quantity < min) {
          $scope.quantity = min;
          this.setLocalQuantity(this);
        }

        if ($scope.quantity % inc === 0) {
          $scope.$emit('fk-quantity-change', {quantity: $scope.quantity});
          return;
        }

        let actualValue = isNaN(+$scope.quantity) ? min : +$scope.quantity;
        $scope.quantity = Math.floor(actualValue/inc)*inc;
        this.setLocalQuantity(this);

        $scope.$emit('fk-quantity-change', {quantity: $scope.quantity});
      };
    };
  }

  setLocalQuantity(_this) {
    _this.quantity = this.$scope.quantity;
  }

}

FkQuantitySelectorCtrl.$inject = ['$scope'];

export default FkQuantitySelectorCtrl;
