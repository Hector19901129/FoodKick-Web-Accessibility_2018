import './../../css/help.css';

class HelpCtrl {
  constructor($rootScope, $scope, ngDialog, $state, fkHelpPagesService, fkBoldChatService, fkFoodSafetyService, fkUtils, topicsData, fkOrderModifyService, fkModifiableOrders) {
    this.$rootScope = $rootScope;
    this.$scope = $scope;
    this.$state = $state;
    this.fkHelpPagesService = fkHelpPagesService;
    this.fkFoodSafetyService = fkFoodSafetyService;
    this.fkUtils = fkUtils;
    this.topicsData = topicsData;
    this.fkBoldChatService = fkBoldChatService;
    this.fkOrderModifyService = fkOrderModifyService;
    this.ngDialog = ngDialog;
    this.fkModifiableOrders = fkModifiableOrders;

    $scope.triggerChat = () => fkBoldChatService.triggerChat();

    $scope.ismobile = this.decideIsMobile(fkUtils.getActiveBreakpoint());
    $scope.topics = [];


    if (topicsData.helpTopics) {
      for ( let i = 0; i < topicsData.helpTopics.length; i++ ) {

        if ( topicsData.helpTopics[ i ].title && topicsData.helpTopics[ i ].detail ) {
          $scope.topics.push( topicsData.helpTopics[ i ] );
        }

        if ( topicsData.helpTopics[ i ].title && topicsData.helpTopics[ i ].entries ) {
          $scope.topics.push( topicsData.helpTopics[ i ] );
        }
      }
    }

    $scope.$on( 'fk-help-details-loaded', () => {
      if ( $scope.ismobile ) {
        $scope.ismobiledetails = true;
        if (this.fkOrderModifyService.getModifyState() || this.fkModifiableOrders.getModifiableOrderCount() >=1){
          document.querySelector('.mobile-title').style.top = 40 + 'px';
          document.querySelector('.content-only-mobile').style.top = 40 + 'px';
        }
      }
    });

    $scope.$on( 'fk-help-main-back', () => {
      if ( $scope.ismobile ) {
        $scope.ismobiledetails = false;
      }
    });

    $scope.$on('breakpoint-change', (ev, data) => {
      $scope.ismobile = this.decideIsMobile(data.breakpoint);
    });

    $rootScope.$on( '$locationChangeSuccess', ( event, newUrl ) => { // back from submenu show menu again on mobile
      let actualUrl = newUrl.substring( newUrl.lastIndexOf( '/' ) + 1, newUrl.length );

      if ( $scope.ismobile && actualUrl === 'help' ) {
        $scope.ismobiledetails = false;
      }
    });

    fkFoodSafetyService.getFoodSafety().then( response => {
      $scope.topics.push( response.helpTopics[ 0 ] );
    });
  }

  decideIsMobile (bp) {
    return bp === 'xs' || bp === 'sm';
  }

}

HelpCtrl.$inject = ['$rootScope', '$scope', 'ngDialog', '$state', 'fkHelpPagesService', 'fkBoldChatService', 'fkFoodSafetyService', 'fkUtils', 'topicsData', 'fkOrderModifyService', 'fkModifiableOrders'];

export default HelpCtrl;
