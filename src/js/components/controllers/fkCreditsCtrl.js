class FkCreditsCtrl {
  constructor(fkOrderService, fkUserService, $rootScope) {
    this.fkOrderService = fkOrderService;
    this.fkUserService = fkUserService;
    this.$rootScope = $rootScope;
    this.orders = [];
    this.credit = '';

    this.$postLink = () => {
      this.getOrders();
    };
  }

  getOrders() {
    this.fkOrderService.getCreditedOrders().then((data) => {
      this.orders = data.approvedCredits;
      this.availableAmt = data.totalAmount;
    });
  }

  seeReceipt(id) {
    this.$rootScope.$emit('fk-open-receipt-popup', {orderId: id});
  }
}

FkCreditsCtrl.$inject = ['fkOrderService', 'fkUserService', '$rootScope'];

export default FkCreditsCtrl;
