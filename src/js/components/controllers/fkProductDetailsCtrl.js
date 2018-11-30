class FkProductDetailsCtrl {
  constructor($rootScope, $scope, $element, $timeout, fkProductService, fkCartService, fkProductDetailService) {
    this.$rootScope = $rootScope;
    this.$scope = $scope;
    this.$element = $element;
    this.$timeout = $timeout;
    this.fkProductService = fkProductService;
    this.fkCartService = fkCartService;
    this.fkProductDetailService = fkProductDetailService;
    this.selectedVariantValues = {};
    this.selectedSaleUnit = '';
    this.missingVariants = [];
    this.salesUnits = [];
    this.calculatedSubTotal = 0;
    this.prodQuantity = this.getProduct().productData.quantity.qMin || 0;
    this.fixedDiscount = false;
    this.showAvailQty = false;

    this.$postLink = () => {
      if (this.getProduct() && this.getProduct().productData && fkCartService.productsInCart[this.getProduct().productData.productId]) {
        this.prodQuantity = fkCartService.productsInCart[this.getProduct().productData.productId].quantity;
      }
    };

    $rootScope.$on('show-availableQty-text', (ev, data) => {
      $scope.selectedQty = data.selectedQty;
      this.showAvailQty = true;
    });

    $rootScope.$on('hide-availableQty-text', (ev, data) => {
      $scope.selectedQty = data.selectedQty;
      this.showAvailQty = false;
    });

    $timeout(() => {
      $rootScope.$emit('lazyImg:refresh');
      this.updateCalculatedPrice();
    }, 30);

    $scope.$on('product-atc-removing', e => {
      e.stopPropagation();
      $element.addClass('removing');
    });

    $scope.$on('product-atc-removing-done', e => {
      e.stopPropagation();
      $element.removeClass('removing');
    });

    $scope.$on('fk-quantity-selector-change', e => {
      e.stopPropagation();
      this.prodQuantity = e.targetScope.$ctrl.quantity;
      this.updateCalculatedPrice();
    });

    $rootScope.$on('fk-check-missing-variants', ()=> {
      this.missingVariants = this.getMissingVariants();
    });

    // TODO Refactor, remove getproduct and service fkProductDetailService
    $scope.$watch(() => this.getProduct(), newValue => {
      if (newValue) {
        let productId = newValue.productData.productId;

        if (!newValue.productExtraData) {
          fkProductService.getProduct(productId, {force: true, async: true}).then(product => {
            fkProductDetailService.product = product;
          });
        } else {
          $scope.$emit('fk-view-pdp', {product: newValue});
        }

        if (newValue.productData) {
          $scope.imageSize = newValue.productData.productJumboImage ? "jumboImagePdp":"zoomImagePdp";
          $scope.images = [{source: newValue.productData.productJumboImage || newValue.productData.productZoomImage,type: $scope.imageSize}];
          if (newValue.productData.productImagePackage) {
            $scope.images.push({source: newValue.productData.productImagePackage,type: $scope.imageSize});
          }
          if (newValue.productData.productAlternateImage) {
            $scope.images.push({source: newValue.productData.productAlternateImage,type: $scope.imageSize});
          }
        }

        this.setSalesUnits();
      }
    });
  }

  getProduct() {
    return this.fkProductDetailService.product;
  }

  setSalesUnits() {
    let productData = this.getProduct().productData;
    if (productData.salesUnit && productData.salesUnit.length) {
      let salesUnit = {values: productData.salesUnit};
      salesUnit.values.map(unit => {
        let suRatio = productData.suRatios.filter(e => e.alternateUnit === unit.id)[0].ratio;
        unit.label = unit.name;
        unit.name = unit.id;
        unit.suPrice = suRatio * productData.price;
      });
      salesUnit.label = productData.salesUnitLabel;
      salesUnit.name = "salesUnit";
      this.salesUnits[0] = salesUnit;
    }
  }

  updateCalculatedPrice() {
    let productData = this.getProduct().productData;

    this.calculatedSubTotal = productData.configuredPrice || 0;

    // Modify price according to available material price
    if (productData.availMatPrices && productData.availMatPrices.length > 1) {
      productData.availMatPrices.map(availMatPrice => {
        if (availMatPrice.scaleLowerBound <= this.prodQuantity && (availMatPrice.scaleUpperBound === "Infinity" || availMatPrice.scaleUpperBound > this.prodQuantity)) {
          this.calculatedSubTotal = availMatPrice.price;
          this.fixedDiscount = true;
          this.estimatedWeight = productData.suRatios[0].ratio * this.prodQuantity;
        }
      });
    }

    // calculated price * selected unit
    if (this.selectedSaleUnit && productData.suRatios && productData.suRatios.length) {
      let suRatio = productData.suRatios.filter(e => e.alternateUnit === this.selectedSaleUnit)[0].ratio;
      this.calculatedSubTotal = suRatio * this.calculatedSubTotal;
    }

    // calculate price * quantity(atc dropdown selector) TODO move to the end if variants costs calculate on each quantity
   if (productData.quantity.qMin === 1){
    this.calculatedSubTotal = this.calculatedSubTotal * this.prodQuantity;
    this.estimatedWeight = productData.suRatios[0].ratio * this.prodQuantity;
   }

   //calculate price * quantity (atc dropdown selector, qmin>1 & 4 for $4 scenerio)
   //for qmin of 2 and with availMatPrices.length
   if (productData.quantity.qMin > 1 && !this.fixedDiscount) {
      this.estimatedWeight = productData.suRatios[0].ratio * this.prodQuantity;
      this.calculatedSubTotal = productData.price * this.estimatedWeight;
   } else if (productData.quantity.qMin > 1 && this.fixedDiscount) {
    this.estimatedWeight = productData.suRatios[0].ratio * this.prodQuantity;
    this.calculatedSubTotal = this.calculatedSubTotal * this.estimatedWeight;
   }


    // add costs of selected variants
    if (this.selectedVariantValues && Object.keys(this.selectedVariantValues).length) {
      let selectedVariationsCvp = Object.keys(this.selectedVariantValues).map(selectedVariantKey => {
        return productData.variations.map(variation => {
          let variationCvps = 0;
          if (variation.name === selectedVariantKey) {
            variationCvps = variation.values.map(variationValue => {
              let cvp = 0;
              if (variationValue.name === this.selectedVariantValues[selectedVariantKey]) {
                cvp = parseFloat(variationValue.cvp.replace('$', ''));
              }
              return cvp;
            }).reduce( (prev, curr) => prev + curr );
          }
          return variationCvps;
        }).reduce( (prev, curr) => prev + curr );
      }).reduce( (prev, curr) => prev + curr );
      this.calculatedSubTotal += selectedVariationsCvp;
    }

    return this.calculatedSubTotal;
  }

  salesUnitSelectHandler(selectedSalesUnit) {
    this.selectedSaleUnit = selectedSalesUnit.salesUnit;
    this.updateCalculatedPrice();
  }

  isMealkits() {
    return this.fkProductDetailService.product && this.fkProductDetailService.product.productExtraData && this.fkProductDetailService.product.productExtraData.productAboutMediaPath;
  }

  showBuyMore() {
    return this.fkProductDetailService.pdpFeedType === 'buyMoreAndSave';
  }

  changePdpFeed(selectedPdpFeed) {
    this.fkProductDetailService.pdpFeedType = selectedPdpFeed;
  }

  variantSelectHandler(selectedVariantValues) {
    this.selectedVariantValues = selectedVariantValues;
    this.updateCalculatedPrice();
  }

  getMissingVariants() {
    return (this.getProduct().productData.variations || [])
    .filter(varitation => !varitation.optional)
    .map(variation => variation.name)
    .filter(variationName => !this.selectedVariantValues.hasOwnProperty(variationName));
  }

  notifyAtcDone(data) {
    this.$scope.$broadcast('product-atc-adding-done', data);
    this.$scope.$emit('product-atc-adding-done', data);
  }

  updateHandler(quantity) {
    this.missingVariants = this.getMissingVariants();
    if (this.missingVariants.length === 0) {
      this.$element.addClass('adding');
      this.fkCartService.setQtyInCart(this.getProduct(), quantity, {list: false}, this.selectedVariantValues, this.selectedSaleUnit)
        .then((data) => {
          this.$element.removeClass('adding');
          this.notifyAtcDone(data);
          this.$rootScope.$emit('fk-pdp-close');
        });
    } else {
      this.notifyAtcDone({
        status: 'ERROR'
      });
    }
  }

  openDescriptionPopup(ev) {
    let acceptedTitles = {
      'Care Instructions' : 'fk-open-flower-care-popup',
      'About our microwave-only, BPA-free container' : 'fk-open-microwave-popup'
    };

    if (ev.target && acceptedTitles[ev.target.title]) {
      this.$rootScope.$emit(acceptedTitles[ev.target.title]);
    }
  }

  openGuaranteedFreshPopup() {
   this.$rootScope.$emit('open-guaranteed-fresh-popup');
  }

  openFreshFactorHelps() {
    this.$rootScope.$emit('fk-open-fresh-factor-help');
  }

  hasWineData(wineData) {
    return Object.keys(wineData).some(key => wineData[key].length);
  }
}

FkProductDetailsCtrl.$inject = ['$rootScope', '$scope', '$element', '$timeout', 'fkProductService', 'fkCartService', 'fkProductDetailService'];

export default FkProductDetailsCtrl;
