class FkAtcIncDecCtrl {
  constructor($scope, $element, fkCartService) {
    this.$scope = $scope;
    this.$element = $element;
    this.fkCartService = fkCartService;

    $scope.fkCartService = fkCartService;

    $scope.$on('add_to_bag_clicked', () => {
       $scope.increase();
    });

    $scope.increase = () => {
      if (!($scope.fkCartService.productsInCart[$scope.$ctrl.product.productData.productId] && $scope.fkCartService.productsInCart[$scope.$ctrl.product.productData.productId].quantity) && $scope.$ctrl.product.productData.msgEarliestAvailability && !$scope.$ctrl.product.productData.showEarlyMsg && $scope.$ctrl.product.productData.availableQty > 0){
        $scope.$emit('fk-show-earliest-msg');
        return;
      }
      $scope.$emit('fk-hide-earliest-msg');
      $scope.$emit('product-atc-adding');
      fkCartService.increaseInCart($scope.$ctrl.product, {position: this.position}).then(() => {
        $scope.$emit('product-atc-adding-done');
        $scope.$emit('fk-hide-atp-alert');
      });
    };

    $scope.decrease = () => {
      $scope.$emit('product-atc-removing');

      fkCartService.decreaseInCart($scope.$ctrl.product, {position: this.position}).then(() => {
        $scope.$emit('product-atc-removing-done');
        $scope.$emit('fk-hide-atp-alert');
      });
    };
  }

}

FkAtcIncDecCtrl.$inject = ['$scope', '$element', 'fkCartService'];

export default FkAtcIncDecCtrl;
