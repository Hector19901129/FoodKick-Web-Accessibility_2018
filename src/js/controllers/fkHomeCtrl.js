class FkHomeCtrl {
  constructor($rootScope, $scope, $timeout, fkFeedService, fkCarouselService, fkUtils, fkUserService, fkDoubleClickService, CONFIG, $q) {
    this.$rootScope = $rootScope;
    this.$scope = $scope;
    this.$timeout = $timeout;
    this.fkFeedService = fkFeedService;
    this.fkCarouselService = fkCarouselService;
    this.fkUserService = fkUserService;
    this.fkDoubleClickService = fkDoubleClickService;
    this.fkUtils = fkUtils;
    this.fkUserService.checkLogin();
    $scope.isDoubleClick = true;
    $scope.fkDoubleClickService = fkDoubleClickService;
    $scope.carouselImages = [];
    $scope.fkCarouselService = fkCarouselService;
    $scope.fkFeedService = fkFeedService;
    $scope.fkUserService = fkUserService;
    $scope.mainLimit = 3;
    $scope.sideLimit = 2;
    $scope.feedType = 'home';
    $scope.changeFeed = (type) => {
      $scope.feedType = type;
    };
    let deregistrationFuncs = [];

    fkCarouselService.getData().then((d) => {
      if (!d) {
        return;
      }
      let images = d.map((i) => {
        return fkCarouselService.setContent(i);
      });
      $scope.carouselImages = images;
    });

    this.adjustProductTileLimit(fkUtils.getActiveBreakpoint());
    this.getFeed($scope, $q).then( () => {
      deregistrationFuncs.push($rootScope.$on('fk-plantid-change', (ev, data) => {
        if (data && data.oldPlantId) {
          this.getFeed($scope, $q);
        }
      }));
      // adjust product tile numbers based on current breakpoint
      deregistrationFuncs.push($scope.$on('breakpoint-change', (ev, data) => {
        this.adjustProductTileLimit(data.breakpoint);
      }));
    });
    $rootScope.$broadcast('logoff_delivery_state');

    // de-register the function to avoid duplicate event listeners
    $scope.$on('$destroy', function () {
      deregistrationFuncs.forEach(f => f());
    });

  }
  getFeed(scope, q) {
    var getPageHeaderFeedPromise = scope.fkFeedService.getPageHeaderFeed();
    var getPickHeaderFeedPromise = scope.fkFeedService.getPickHeaderFeed();
    var getPageBodyFeedPromise = scope.fkFeedService.getPageBodyFeed();
    var getPickBodyFeedPromise = scope.fkFeedService.getPickBodyFeed();


    getPageHeaderFeedPromise.then((f) => {
      scope.pageFeedHeader = f;
      });
    getPickHeaderFeedPromise.then( (f) => {
      scope.pickFeedHeader = f;
      });

    getPageBodyFeedPromise.then( (f)=>{
      scope.pageFeedBody = f;
      });
    getPickBodyFeedPromise.then( (f) => {
      scope.pickFeedBody = f;
      });

    return q.all([getPageHeaderFeedPromise, getPickHeaderFeedPromise, getPageBodyFeedPromise, getPickBodyFeedPromise]);

  }
  adjustProductTileLimit(bp) {
    if (bp === 'xs') {
      this.$scope.mainLimit = 2;
      this.$scope.sideLimit = 2;
    } else if (bp === 'sm') {
      this.$scope.mainLimit = 3;
      this.$scope.sideLimit = 3;
    } else {
      this.$scope.mainLimit = 3;
      this.$scope.sideLimit = 2;
    }
  }
}

FkHomeCtrl.$inject = ['$rootScope', '$scope', '$timeout', 'fkFeedService', 'fkCarouselService', 'fkUtils', 'fkUserService', 'fkDoubleClickService', 'CONFIG', '$q'];

export default FkHomeCtrl;
