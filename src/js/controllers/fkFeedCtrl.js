class FkFeedCtrl {
  constructor($state, $rootScope, $scope, $timeout, fkFeedService, fkUtils, fkUserService, CONFIG, $q) {
    this.$state = $state;
    this.$rootScope = $rootScope;
    this.$scope = $scope;
    this.$timeout = $timeout;
    this.fkFeedService = fkFeedService;

    this.feedId = $state.params.id;

    this.fkUserService = fkUserService;

    this.fkUtils = fkUtils;
    this.fkUserService.checkLogin();

    $scope.fkFeedService = fkFeedService;
    $scope.fkUserService = fkUserService;
    $scope.mainLimit = 3;
    $scope.sideLimit = 2;
    $scope.feedType = 'home';
    $scope.changeFeed = (type) => {
      $scope.feedType = type;
    };
    let deregistrationFuncs = [];

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
      //if feed is not active, retrun 404 page
      if ($scope.pageFeedBody && $scope.pageFeedBody.sections.length <= 0 || $scope.pageFeedHeader && $scope.pageFeedHeader.sections.length <= 0){
        $state.go('not-found');
      }
    });
    $rootScope.$broadcast('logoff_delivery_state');

    // de-register the function to avoid duplicate event listeners
    $scope.$on('$destroy', function () {
      deregistrationFuncs.forEach(f => f());
    });

  }
  getFeed(scope, q) {
    var getPageHeaderFeedPromise = scope.fkFeedService.getPageHeaderFeedByFeedId(this.feedId);
    var getPageBodyFeedPromise = scope.fkFeedService.getPageBodyFeedByFeedId(this.feedId);

    getPageHeaderFeedPromise.then((f) => {
      scope.pageFeedHeader = f;
      });

   getPageBodyFeedPromise.then( (f)=>{
      scope.pageFeedBody = f;
      });

    return q.all([getPageHeaderFeedPromise, getPageBodyFeedPromise]);

  }
  adjustProductTileLimit(bp) {
    if (bp === 'xs') {
      this.$scope.mainLimit = 2;
      this.$scope.sideLimit = 2;
    } else if (bp === 'sm') {
      this.$scope.mainLimit = 3;
      this.$scope.sideLimit = 2;
    } else {
      this.$scope.mainLimit = 4;
      this.$scope.sideLimit = 2;
    }
  }
}

FkFeedCtrl.$inject = ['$state', '$rootScope', '$scope', '$timeout', 'fkFeedService', 'fkUtils', 'fkUserService', 'CONFIG', '$q'];

export default FkFeedCtrl;
