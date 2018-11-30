class FkDoubleClickAdCtrl {
  constructor ($scope, $window, $rootScope, fkDoubleClickService, CONFIG) {
    this.$scope = $scope;
    this.$window = $window;
    this.$rootScope = $rootScope;
    this.fkDoubleClickService = fkDoubleClickService;
    this.$window.googletag = $window.googletag || { cica: 12 };
    this.$window.googletag.cmd = $window.googletag.cmd || [];
    this.CONFIG = CONFIG;
    this.initDoubleClick(this.name);
    this.$postLink = () => {
      this.loadAds(this.name, this.targets);
    };
    this.$rootScope.$on('fk-dfp-retargeting', () => {
      this.refreshTargeting();
    });
  }

  refreshTargeting(){
    let targets = this.fkDoubleClickService.fkMainTopTargets;
    this.adRefresh(targets);
  }

  adRefresh(targets) {
    for (const key of Object.keys(targets)) {
     this.$window.googletag.pubads().setTargeting(key, String(targets[key]));
     this.$window.googletag.pubads().refresh();
    }
  }

  initDoubleClick(){
    let timer = 0;
    const closingTime = 11;
    let doubleClickElement = null;
    let doubleClickContent = null;
    let doubleClickTimer = setInterval(() => {
      timer++;
      if (!doubleClickElement) {
        doubleClickElement = angular.element(document.querySelector(".fk-main-carusel-dfp-slot"));
      }
      timer++;
      doubleClickContent = doubleClickElement && doubleClickElement[0] && doubleClickElement[0].childNodes && doubleClickElement[0].childNodes[0] && doubleClickElement[0].childNodes[0].childNodes && doubleClickElement[0].childNodes[0].childNodes[0];
      if (doubleClickContent && doubleClickContent.clientHeight) {
        this.doubleClickHeight = doubleClickContent && doubleClickContent.clientHeight ? doubleClickContent.clientHeight + 'px' : this.doubleClickHeight;
        clearInterval(doubleClickTimer);
      }
      if (timer === closingTime && !(doubleClickContent && doubleClickContent.clientHeight)){
        this.doubleClickHeight = "0px";
        clearInterval(doubleClickTimer);
      }
    },1000);
  }

  loadAds(name, targets) {
    const DCID = this.CONFIG.DOUBLECLIKID || '1072054678';
    this.$window.googletag.cmd.push(() => {
      let googletag = this.$window.googletag;
      if (!!googletag.pubads().getSlots() && googletag.pubads().getSlots().length) {
         googletag.pubads().refresh();
       } else {
         for (const key of Object.keys(targets)) {
           googletag.pubads().setTargeting(key, String(targets[key]));
         }
         googletag.enableServices();
         googletag.pubads().refresh();
         googletag.defineSlot('/'+ DCID +'/'+ name, 'fluid', name)
         .addService(googletag.pubads())
         .setCollapseEmptyDiv(true, true);
         googletag.display(name);
      }
    });
  }
}

FkDoubleClickAdCtrl.$inject = ['$scope', '$window', '$rootScope', 'fkDoubleClickService', 'CONFIG'];

export default FkDoubleClickAdCtrl;
