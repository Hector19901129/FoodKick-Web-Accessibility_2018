class FkFooterLinksCtrl {
  constructor(SITE, fkUtils) {
    this.SITE = SITE;
    this.fkUtils = fkUtils;
    this.goToTop = fkUtils.goToTop;
  }
}

FkFooterLinksCtrl.$inject = ['SITE', 'fkUtils'];

export default FkFooterLinksCtrl;
