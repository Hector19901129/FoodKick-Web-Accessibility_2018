class FkSectionHeroCtrl {
  constructor() {
    this.sectionHeader = '';

    this.$postLink = () => {
      this.withCaption = this.section && (this.section.headlineText || this.section.captionText || this.section.bodyText);

      if (this.section && this.section.imageBanner) {
        this.sectionHeader = this.section.imageBanner.image.path;
      }
    };
  }

  get location() {
    return this.column + '_pos' + (+this.position < 10 ? '0' + +this.position : +this.position);
  }

  get slug() {
    let title = this.section && this.section.imageBanner && (this.section.headlineText || this.section.imageBanner.description || this.section.imageBanner.name) || '';
    return title.toLowerCase().replace(/\s+/g, '_');
  }

}
FkSectionHeroCtrl.$injext = [];
export default FkSectionHeroCtrl;
