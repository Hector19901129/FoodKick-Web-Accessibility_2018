class FkProductDetailService {
  constructor() {
    this.product = null;
    this.pdpFeedType = 'details';
  }

  getGroupScaleId() {
    return this.product && this.product.productData && this.product.productData.grpId ? this.product.productData.grpId : null;
  }

  getGroupScaleVersion() {
    return this.product && this.product.productData && this.product.productData.grpVersion ? this.product.productData.grpVersion : null;
  }
}

export default FkProductDetailService;
