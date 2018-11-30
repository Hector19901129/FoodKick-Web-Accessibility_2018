class FkReceiptService {
  constructor(fkOrderService) {
    this.fkOrderService = fkOrderService;

    this.receiptData = null;
  }

  getReceiptData(orderId) {
    return this.fkOrderService.loadOrder(orderId).then(() => {
      return this.makeReceiptData(this.fkOrderService.order);
    });
  }

  isWine(affiliates) {
    let wineOrderNumber;
    for ( var i=0; i < affiliates.length; i++ ) {
      if (affiliates[i].name === "FD WINES") {
        wineOrderNumber = i;
      }
    }
    return wineOrderNumber;
  }

  makeReceiptData(order) {
    let promoCode;
    let wineTotal;
    let wineTax;

    if (order.cartInfo) {
      this.receiptData = {};
      this.receiptData.cartInfo = order.cartInfo;

      if (order.cartInfo.discount.length) {
        promoCode = order.cartInfo.discount[0].amount;
      }

      this.wineNumber = this.isWine(order.cartInfo.affiliates);

      if (this.wineNumber){
        wineTotal = order.cartInfo.affiliates[this.wineNumber].subtotal;
        wineTax = order.cartInfo.affiliates[this.wineNumber].tax;
      }

      if (order.details) {
        this.receiptData.deliveryDetails = {
          date: order.details.deliveryDate,
          name: order.address.firstName,
          address: {
            street : order.address.street1,
            apartment : order.address.apartment,
            state: order.address.state,
            city: order.address.city,
            zip: order.address.postalCode
          },
          phone: order.phone,
          paymentMethod: order.details.paymentMethod,
          status: order.details.deliveryStatus,
          number: order.orderId,
          deliveryInstruction: order.address.deliveryInstruction,
          modifiable: order.modifiable,
          dpCart: order.deliveryPassCart
        };
      }

      this.receiptData.cartDetails = {
        wineNumber : this.wineNumber,
        wineTotal: wineTotal,
        wineTax: wineTax,
        orderSubtotal: order.cartInfo.subtotal,
        charges: order.cartInfo.charges,
        estimatedTotal: order.cartInfo.estimatedTotal,
        promoCode: promoCode,
        deliveryPassCharge: order.dpInRegularCart
      };
    }

    return this.receiptData;
  }
}

FkReceiptService.$inject = ['fkOrderService'];

export default FkReceiptService;
