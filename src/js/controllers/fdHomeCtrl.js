const FAKE_CAROUSEL_DATA = JSON.parse('{"welcomeCarouselBanners":[{"componentType":"BANNER","name":"FK Web Home Page Banner 4","type":"","image":{"height":400,"path":"/media/images/test/carousel_1_1600.jpg","width":1600},"description":"FRESH<br>FRESHDIRECT*<br><br>*SORRY","linkOneText":"","linkOneURL":"","linkOneType":"","linkTwoText":"","linkTwoURL":"","linkTwoType":""},{"componentType":"BANNER","name":"FK Web Home Page Banner 3","type":"","image":{"height":400,"path":"/media/images/test/carousel_2_1600.jpg","width":1600},"description":"I\'M NEW. I\'M THE SAME <br>(WHAT?)<br><br>LIKE ME","linkOneText":"","linkOneURL":"","linkOneType":"","linkTwoText":"","linkTwoURL":"","linkTwoType":""}]}');


class FdHomeCtrl {
  constructor($rootScope, fkUserService, fdHomeService, fkCarouselService, fkUtils) {
    this.$rootScope = $rootScope;
    this.fkUserService = fkUserService;
    this.fdHomeService = fdHomeService;
    this.fkCarouselService = fkCarouselService;
    this.fkUtils = fkUtils;

    // TODO welcome popup rule
    // window.welcome = () => this.$rootScope.$broadcast('fd-welcome-popup-open');

    this.sideLimit = 2;

    if (fkUtils.isBreakpointActive('xs')) {
      this.sideLimit = 2;
    } else if (fkUtils.isBreakpointActive('sm')) {
      this.sideLimit = 3;
    }

    this.$onInit = () => {
      this.$rootScope.$broadcast('fk-dispatch-welcomeCarouselBanners', FAKE_CAROUSEL_DATA.welcomeCarouselBanners);
    };

    this.fdHomeService.loadModules();
    fkUserService.checkLogin();

    // TODO welcome popup rule
    // this.$rootScope.$broadcast('fd-welcome-popup-open');
  }
}

FdHomeCtrl.$inject = ['$rootScope', 'fkUserService', 'fdHomeService', 'fkCarouselService', 'fkUtils'];

export default FdHomeCtrl;
