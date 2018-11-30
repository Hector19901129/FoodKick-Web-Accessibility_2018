class FdSectionCtrl {
  constructor($rootScope, $timeout) {
    this.$rootScope = $rootScope;
    this.$timeout = $timeout;

    this.isOpen = false;
    this.topProducts = [];
    this.restOfProducts = [];
    this.sectionHeader='';

    this.$postLink = () => {
      this.withCaption = this.section && (this.section.headlineText || this.section.captionText || this.section.bodyText);

      if (this.section && this.section.imageBanner) {
        this.sectionHeader = this.section.imageBanner.image.path;
      }
      if (this.module && this.module.moduleData.products) {
        this.topProducts = this.module.moduleData.products.slice(0, +this.limit || 3);
        this.restOfProducts = this.module.moduleData.products.slice(+this.limit || 3);
      }
      if (this.module && this.module.moduleData.icons) {
        this.topProducts = this.module.moduleData.icons.slice(0, +this.limit || 3);
      }
    };
  }

  toggle() {
    this.isOpen = !this.isOpen;
    this.$timeout(() => {
      this.$rootScope.$emit('lazyImg:refresh');
    }, 10);
  }
}

FdSectionCtrl.$inject = ['$rootScope', '$timeout'];

export default FdSectionCtrl;
