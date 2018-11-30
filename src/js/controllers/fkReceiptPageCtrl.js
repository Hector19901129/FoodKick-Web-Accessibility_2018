class FkReceiptPageCtrl {
  constructor($scope, $state) {
    this.$scope = $scope;
    this.$state = $state;

    $scope.orderId = $state.params.orderId;
  }
}

FkReceiptPageCtrl.$inject = ['$scope', '$state'];

export default FkReceiptPageCtrl;
