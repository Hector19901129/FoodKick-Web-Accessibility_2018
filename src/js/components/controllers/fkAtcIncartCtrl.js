class FkAtcIncartCtrl {
  constructor($scope, $element, fkCartService) {
    this.$scope = $scope;
    this.$element = $element;
    this.fkCartService = fkCartService;

    $scope.fkCartService = fkCartService;

    $scope.increase = () => {
       if (!($scope.fkCartService.productsInCart[$scope.$ctrl.product.productData.productId] && $scope.fkCartService.productsInCart[$scope.$ctrl.product.productData.productId].quantity) && $scope.$ctrl.product.productData.msgEarliestAvailability && !$scope.$ctrl.product.productData.showEarlyMsg && $scope.$ctrl.product.productData.availableQty > 0){
        $scope.$emit('fk-show-earliest-msg');
        return;
      }
      $scope.$emit('fk-hide-earliest-msg');
      $scope.$emit('product-atc-adding');
      fkCartService.increaseInCart($scope.$ctrl.product).then(() => {
        $scope.$emit('product-atc-adding-done');
        $scope.$emit('fk-hide-atp-alert');
      });
    };
  }
}

FkAtcIncartCtrl.$inject = ['$scope', '$element', 'fkCartService'];

export default FkAtcIncartCtrl;
