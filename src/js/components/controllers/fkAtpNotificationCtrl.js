class FkAtpNotificationCtrl {
  constructor($rootScope, fkUserService, $window, fkUtils, $scope, ngDialog) {
    this.$rootScope = $rootScope;
    this.fkUserService = fkUserService;
    this.$window = $window;
    this.fkUtils = fkUtils;
    this.$scope = $scope;
    this.ngDialog = ngDialog;
    this.atpDialog = null;
    this.showAtpNotification = false;

    $scope.$on('breakpoint-change', (ev, data) => {
      $scope.ismobile = this.decideIsMobile(data.breakpoint);
    });

    $rootScope.$on('fk-atp-unavailableData', (ev, data) => {
      if ($window.sessionStorage.getItem('ATP_ALERT_FLAG')) {
        this.showAtpNotification = false;
        return;
      }
      if (data.unavaialabilityData && data.unavaialabilityData.length > 0) {
        this.showAtpNotification = true;
        setTimeout(function() {
          $scope.ignore();
        }, 600000);
      }
    });

    $rootScope.$on('fk-close-atp-popup', () => {
      $scope.closeAtpPopup();
    });

    $scope.closeAtpPopup = () => {
      if (this.atpDialog) {
        this.atpDialog.close();
      }
      $scope.ignore();
    };

    $rootScope.$on('fk-hide-atp-alert', () => {
      this.showAtpNotification = false;
    });

    $scope.ignore = () => {
      let atpNotification = document.querySelector('.atp-notification');
      if (atpNotification) {
        atpNotification.style.display = 'none';
      }
      this.showAtpNotification = false;
      $window.sessionStorage.setItem('ATP_ALERT_FLAG', true);
    };

  }

  decideIsMobile(bp) {
    return bp === 'xs' || bp === 'sm';
  }

  lazyRefresh() {
    this.fkUtils.lazyLoadImage();
  }

  showAtpPopup() {
    if (!this.atpDialog) {
      this.atpDialog = this.ngDialog.open({
        template: 'templates/fkAtpRecommendationPopup.html',
        showClose: false,
        appendClassName: 'fk-section-more-dialog',
        scope: this.$scope,
        ariaRole: 'dialog',
        closeByNavigation: true,
        onOpenCallback: () => {
          this.sectionMoreContainer = document.querySelector('.fk-section-more');
          this.lazyRefresh();
        },
        preCloseCallback: () => {
          this.atpDialog = null;
        }
      });
      this.$scope.$emit('fk-popup-opened', {
        name: 'fkAtpRecommendationPopup',
        type: 'ATP'
      });
    }
  }

}


FkAtpNotificationCtrl.$inject = ['$rootScope', 'fkUserService', '$window', 'fkUtils', '$scope', 'ngDialog'];

export default FkAtpNotificationCtrl;
