class FkFooterAppsCtrl {
  constructor(SITE, fkUtils) {
    this.SITE = SITE;
    this.fkUtils = fkUtils;
    var year = new Date().getFullYear();
    this.currentYear = year;
    this.goToTop = fkUtils.goToTop;
  }
}

FkFooterAppsCtrl.$inject = ['SITE', 'fkUtils'];

export default FkFooterAppsCtrl;
