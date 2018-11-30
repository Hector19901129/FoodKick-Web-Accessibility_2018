class FkProductVariantCtrl {
  constructor($rootScope) {
    this.$rootScope = $rootScope;

    this.$postLink = () => {
      if (this.variant && this.variant.values && this.variant.values.length === 1 && !this.selected) {
        this.select(this.variant.values[0].name);
      }

      if (this.variant && this.variant.values && this.variant.values.map(value => value) && this.variant.values.map(value => value).length > 0 && this.variant.values.map(value => value).filter(li => li.selected) && this.variant.values.map(value => value).filter(li => li.selected).length > 0 && this.variant.values.map(value => value).filter(li => li.selected)[0].name && !this.selected) {
        this.select(this.variant.values.map(value => value).filter(li => li.selected)[0].name);
      }
    };
  }

  select(valueName, $event) {
    this.onSelect({
      name: this.variant.name,
      value: valueName
    });
    $event.stopPropagation();
    this.onClose();
    this.$rootScope.$emit('fk-check-missing-variants');
  }

  close($event) {
    $event.stopPropagation();
    this.onClose();
    this.$rootScope.$emit('fk-check-missing-variants');
  }

  valueSelectedIcon(valueName) {
    return this.selected === valueName ? '#done' : '#check';
  }

  getVariantLabel() {
    return this.variant.label === this.variant.name ? "Choose One" : this.variant.label;
  }

  selectedValueText() {
    let valueName = this.selected;
    let result = '';
    this.variant.values.some(item => item.name === valueName && (result = item.label));
    return result;
  }

  selectedValueImage() {
    let valueName = this.selected;
    let result = '';
    this.variant.values.some(item => item.name === valueName && (result = item.imagePath));
    return result;
  }

  selectedValuePrice() {
    let valueName = this.selected;
    let result = '';
    this.variant.values.some(item => item.name === valueName && (result = item.suPrice));
    return result;
  }

  selectedValueCvp() {
    let valueName = this.selected;
    let result = '';
    this.variant.values.some(item => item.name === valueName && (result = item.cvp));
    return result;
  }

}

FkProductVariantCtrl.$inject = ['$rootScope'];

export default FkProductVariantCtrl;
