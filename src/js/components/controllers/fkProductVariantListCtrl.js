class FkProductVariantListCtrl {
  constructor($rootScope, $timeout) {
    this.$rootScope = $rootScope;
    this.$timeout = $timeout;

    this.openVariant = -1;
    this.selectedValues = {};
  }

  closeHandler() {
    this.openVariant = -1;
  }

  openHandler(index) {
    this.openVariant = index;
    this.$timeout(() => { this.$rootScope.$emit('lazyImg:refresh'); }, 30);
  }

  isOpen(index) {
    return this.openVariant === index;
  }

  isShown(index) {
    return this.openVariant === -1 || this.isOpen(index);
  }

  selectHandler(name, value) {
    this.selectedValues[name] = value;
    this.onSelect({
      selectedVariantValues: this.selectedValues
    });
  }

  selectedValue(name) {
    return this.selectedValues[name];
  }

  isMissing(variantName) {
    return this.missingVariants.indexOf(variantName) > -1;
  }

}

FkProductVariantListCtrl.$inject = ['$rootScope', '$timeout'];

export default FkProductVariantListCtrl;
