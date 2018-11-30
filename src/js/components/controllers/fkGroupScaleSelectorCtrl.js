class FkGroupScaleSelectorCtrl {
  constructor($element, fkProductDetailService) {
    this.$element = $element;
    this.fkProductDetailService = fkProductDetailService;
  }

  changePdpFeed(selectedPdpFeed) {
    this.fkProductDetailService.pdpFeedType = selectedPdpFeed;
  }

  getCurrentFeed() {
    return this.fkProductDetailService.pdpFeedType;
  }

  pulse() {
    let elem = this.$element[0].querySelector(".fk-group-scale-selector-button");
    if (elem.classList.contains("pulse")) {
      elem.classList.remove("pulse");
    }
  }
}

FkGroupScaleSelectorCtrl.$inject = ['$element', 'fkProductDetailService'];

export default FkGroupScaleSelectorCtrl;
