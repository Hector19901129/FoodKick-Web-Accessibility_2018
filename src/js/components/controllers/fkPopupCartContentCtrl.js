class FkPopupCartContentCtrl {
  constructor($rootScope, $scope, $timeout, fkCartService, fkRecommendationsService, fkUtils, ngDialog) {
    this.$rootScope = $rootScope;
    this.$scope = $scope;
    this.$timeout = $timeout;
    this.fkCartService = fkCartService;
    this.fkRecommendationsService = fkRecommendationsService;
    this.fkUtils = fkUtils;
    this.ngDialog = ngDialog;

    this.cartDialog = null;
    this.scTimeout = null;

    this.ismobile = this.decideIsMobile(fkUtils.getActiveBreakpoint());

    $scope.fkCartService = fkCartService;
    $scope.fkRecommendationsService = fkRecommendationsService;

    $scope.$on('breakpoint-change', (ev, data) => {
      this.ismobile = this.decideIsMobile(data.breakpoint);
    });

    $rootScope.$on('fk-close-cart', () => {
      $scope.closeCart();
    });

    $rootScope.$on('fk-open-cart', () => {
      if (!this.cartDialog) {
        $scope.openCart();
      }
    });

    $rootScope.$on('ngDialog.opened', (e, $dialog) => {
      let alertBar = document.querySelector('fk-modify-bar div');
      if (this.cartDialog && alertBar && this.cartDialog.id === $dialog.attr('id')) {
        let alertBarBottom = alertBar.getBoundingClientRect().bottom;
        if (this.ismobile) {
          document.querySelector('.ngdialog-overlay').style.top = alertBarBottom + 'px';
          document.querySelector('.ngdialog-content').style.top = alertBarBottom + 'px';
        } else {
          document.querySelector('.modify-bar-active').style.top = alertBarBottom + 'px';
        }

      }
    });

    $scope.closeCart = () => {
      if (this.cartDialog && this.cartDialog.close) {
        this.cartDialog.close();
      }
    };

    $scope.openCart = (ev) => {
      this.ismobile = this.decideIsMobile(fkUtils.getActiveBreakpoint());

      if (ev && ev.preventDefault) {
        ev.preventDefault();
      }

      let appendClass = 'fk-popup-cart';
      if (document.querySelector('fk-modify-bar div')) {
        appendClass = "fk-popup-cart modify-bar-active";
      }

      $scope.$emit('fk-show-cart', fkCartService.cartDetail);
      this.cartDialog = ngDialog.open({
        template: 'templates/fkPopupCartContent.html',
        appendClassName: appendClass,
        scope: $scope,
        ariaRole: 'dialog',
        controller: ['$scope', '$element', ($innerScope, $element) => {
          $innerScope.$on('fk-show-checkout', () => {
            if (this.scTimeout) {
              $timeout.cancel(this.scTimeout);
              this.scTimeout = null;
            }
            $scope.showCheckout = true;
            $element.addClass('show-checkout');
          });
          $innerScope.$on('fk-hide-checkout', () => {
            this.scTimeout = $timeout(() => {
              $scope.showCheckout = false;
            }, 500);
            $element.removeClass('show-checkout');
          });
        }],
        preCloseCallback: () => {
          this.cartDialog = null;
          $scope.showCheckout = false;
        },
        disableAnimation: true,
        closeByNavigation: true
      });
    };
  }

  decideIsMobile (bp) {
    return bp === 'xs' || bp === 'sm';
  }
}

FkPopupCartContentCtrl.$inject = ['$rootScope', '$scope', '$timeout', 'fkCartService', 'fkRecommendationsService', 'fkUtils', 'ngDialog'];

export default FkPopupCartContentCtrl;
