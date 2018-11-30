class FkCartContentCtrl {
  constructor($scope, $state, $element, fkCartService, fkBoldChatService, fkOrderModifyService, fkRecommendationsService, fkUtils, ngDialog, $rootScope) {
    this.$scope = $scope;
    this.$state = $state;
    this.fkCartService = fkCartService;
    this.fkBoldChatService = fkBoldChatService;
    this.fkOrderModifyService = fkOrderModifyService;
    this.fkRecommendationsService = fkRecommendationsService;
    this.fkUtils = fkUtils;
    this.ngDialog = ngDialog;
    this.emptyBagDialog = null;
    this.$rootScope = $rootScope;
    this.$element = $element;

    $scope.fkCartService = fkCartService;
    $scope.fkOrderModifyService = fkOrderModifyService;
    $scope.fkRecommendationsService = fkRecommendationsService;

    this.ismobile = this.decideIsMobile(fkUtils.getActiveBreakpoint());

    this.debouncedUpdate = fkUtils.debounce(() => {
      this.updateList = {
        deleted: Object.keys($scope.updates.deleted).map(k => $scope.updates.deleted[k]),
        updated: Object.keys($scope.updates.updated).map(k => $scope.updates.updated[k])
      };
      $scope.updates = {
        deleted: {},
        updated: {}
      };
      fkCartService.changeCartlines(this.updateList, {list: 'channel_bag-location_bag'});
      setTimeout(this.selectBagHeader.bind(this), 100);
    }, 500);

    $scope.checkout = () => {
      $scope.errors = null;
      fkCartService.getOrderDetail(false).then( (res) => {
        if (res && res.errors && res.errors.ERR_ORDER_MINIMUM) {
          $scope.errors = {ERR_ORDER_MINIMUM: res.errors.ERR_ORDER_MINIMUM};
        } else {
          $scope.$emit('fk-show-checkout');
        }
      });
    };

    $scope.shopnow = () => {
      $scope.errors = null;
      ngDialog.closeAll();
      $state.go('home');
      this.fkUtils.goToTop();
    };

    $scope.deleteAll = () => {
      fkCartService.deleteAllCartlines();
      $scope.$emit('fk-hide-atp-alert');
      this.emptyBagDialog.close();
    };

    $scope.ignoreCancellation = () => {
      this.closeDialog();
    };

    $scope.updates = {
      deleted: {},
      updated: {}
    };

    $scope.$on('fk-cart-change', (ev, data) => {
      let li = data.lineItem,
        clID = li.cartLineId;
      $scope.errors = null;

      if (data.method.toLowerCase() === 'delete') {
        if ($scope.updates.updated[clID]) {
          delete $scope.updates.updated[clID];
        }
        $scope.updates.deleted[clID] = li;
      }
      if (data.method.toLowerCase() === 'change') {
        if (!$scope.updates.deleted[clID]) {
          $scope.updates.updated[clID] = li;
        }
      }
      this.debouncedUpdate();
    });

    $scope.goToHelp = () => {
      $state.go('help');
    };

    $scope.triggerChat = () => fkBoldChatService.triggerChat();

    $scope.$on('breakpoint-change', (ev, data) => {
      this.ismobile = this.decideIsMobile(data.breakpoint);
    });

    this.$postLink = () => {
      setTimeout(this.selectBagHeader.bind(this), 100);
    };
  }

  viewRecommendations() {
    let recommenderFirstTab = document.querySelector('fk-cart-recommenders-selector.cr-visible [tabindex]');

    if (recommenderFirstTab) {
      recommenderFirstTab.focus();
    }
  }

  selectBagHeader() {
    let bagHeader = this.$element.find('.main');

    if (bagHeader.length > 1) {
      bagHeader[0].focus();
    }
  }

  decideIsMobile (bp) {
    return bp === 'xs' || bp === 'sm';
  }

  closeDialog() {
    this.emptyBagDialog.close();
  }

  emptyBag() {
    if (!this.emptyBagDialog) {
      this.emptyBagDialog = this.ngDialog.open({
        templateUrl: 'templates/fkEmptyBag.html',
        appendClassName: 'fk-empty-bag-confirmation narrow',
        showClose: false,
        scope: this.$scope,
        preCloseCallback: () => {
          this.emptyBagDialog = null;
        }
      });
      this.$scope.$emit('fk-popup-opened', {
        name: 'fkEmptyBag',
        type: 'Info Page'
      });
    }
  }
}

FkCartContentCtrl.$inject = ['$scope', '$state', '$element', 'fkCartService', 'fkBoldChatService', 'fkOrderModifyService', 'fkRecommendationsService', 'fkUtils', 'ngDialog', '$rootScope'];

export default FkCartContentCtrl;
