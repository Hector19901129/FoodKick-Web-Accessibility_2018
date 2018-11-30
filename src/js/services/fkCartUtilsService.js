class FkCartUtilsService {
  constructor(fkHttp, fkUtils, API, $log) {
    this.fkHttp = fkHttp;
    this.fkUtils = fkUtils;
    this.API = API;
    this.$log = $log;
  }

  flattenLineItem(prev, rawLineItem) {
    prev.push(rawLineItem);
    if (rawLineItem.lineItems && rawLineItem.lineItems.length) {
      let lineItems = rawLineItem.lineItems;
      delete rawLineItem.lineItems;
      lineItems.reduce(this.flattenLineItem, prev);
    }

    return prev;
  }

  markAsInvalid(rawCartData) {
    let invalidIds = [];

    if (rawCartData.unavailability && rawCartData.unavailability.invalidLines && rawCartData.unavailability.invalidLines.length) {
      invalidIds = rawCartData.unavailability.invalidLines.map(invLine => invLine.cartLineId);
    }

    return li => {
      if (invalidIds.indexOf(li.cartLineId) !== -1) {
        li.invalid = true;
      }

      return li;
    };
  }

  flattenCart(rawCartData) {
    let affiliates = [];
    let charges =[];
    let discounts =[];
    let couponCodes = [];

    if (rawCartData && rawCartData.affiliates) {
      affiliates = rawCartData.affiliates.map(affiliate => ( {
        name: affiliate.name,
        estimatedPrice: affiliate.estimatedPrice,
        subtotal: affiliate.subtotal,
        tax: affiliate.tax,
        lineItems: affiliate.lineItems.reduce(this.flattenLineItem.bind(this), []).map(this.markAsInvalid(rawCartData))
      } ));
    }

    if (rawCartData && rawCartData.summaryLineCharges){
      charges = rawCartData.summaryLineCharges;
    }

    if (rawCartData && rawCartData.discounts) {
      discounts = rawCartData.discounts;
      couponCodes = rawCartData.discounts.map(discount => discount.code);
    }


    return {
      affiliates: affiliates,
      couponCodes: couponCodes,
      subtotal: rawCartData.subtotal,
      estimatedTotal: rawCartData.estimatedTotal,
      tip: rawCartData.tip,
      charges: charges,
      discount: discounts,
      deliveryPassCharge: rawCartData.dlvPassCharge
    };
  }

  viewCartlines() {
    return this.fkHttp({
      spinner: 'viewCartlines',
      method: 'GET',
      dispatch: true,
      url: this.fkUtils.replaceURLParams(this.API.viewCartlines, {
        username: "username"
      }),
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }).catch((error) => {
      this.$log.error(error);
      return {
        errors: {
          CLIENT_ERROR: error
        }
      };
    });
  }

}

FkCartUtilsService.$inject = ['fkHttp', 'fkUtils', 'API', '$log'];

export default FkCartUtilsService;
