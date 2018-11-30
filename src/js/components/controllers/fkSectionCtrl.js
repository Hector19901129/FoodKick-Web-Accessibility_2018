class FkSectionCtrl {
  constructor($rootScope, $timeout, fkUtils) {
    this.$rootScope = $rootScope;
    this.$timeout = $timeout;
    this.fkUtils = fkUtils;

    this.isOpen = false;
    this.topProducts = [];
    this.restOfProducts = [];
    this.sectionHeader='';
    this._limit = 3;

    this.$postLink = () => {
      this.withCaption = this.section && (this.section.headlineText || this.section.captionText || this.section.bodyText);

      if (this.section && this.section.imageBanner) {
        this.sectionHeader = this.section.imageBanner.image.path;
      }
      this.adjustLimit();
      if (this.last !== false) {
        $timeout(function () {
          $rootScope.$emit('lazyImg:refresh');
        });
      }
    };
  }

  adjustLimit() {
    if (this.section && this.section.products) {
      this.topProducts = this.section.products.slice(0, +this._limit || 3);
      this.restOfProducts = this.section.products.slice(+this._limit || 3);
    }
  }

  toggle() {
    this.isOpen = !this.isOpen;
    this.fkUtils.lazyLoadImage();
  }

  get location() {
    return this.column + '_pos' + (+this.position < 10 ? '0' + +this.position : +this.position);
  }

  get slug() {
    let title = this.section && this.section.imageBanner && (this.section.headlineText || this.section.imageBanner.description || this.section.imageBanner.name) || '';
    return title.toLowerCase().replace(/\s+/g, '_');
  }

  get limit() {
    return this._limit;
  }

  set limit(value) {
    this._limit = value;
    this.adjustLimit();
  }

}

FkSectionCtrl.$inject = ['$rootScope', '$timeout', 'fkUtils'];

export default FkSectionCtrl;
