class FkProductTileListCtrl {
  constructor($scope) {
    this.$scope = $scope;
  }

  set products(products) {
    this._products = products || [];

    // delay event to wait for other properties
    setTimeout(() => {
      this.$scope.$emit('fk-product-impressions', {
        products: this.products,
        channel: this.channel,
        location: this.location,
        title: this.listTitle
      });
    }, 10);
  }

  get products() {
    let products = this._products || [];

    return products.map && products.map((p, i) => {
      if (p.productData) {
        p.productData.list = {
          channel: this.channel,
          location: this.location,
          title: this.listTitle
        };
        p.productData.position = i+1;
      }

      return p;
    }) || products;
  }
}

FkProductTileListCtrl.$inject = ['$scope'];

export default FkProductTileListCtrl;
