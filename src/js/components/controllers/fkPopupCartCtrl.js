class FkPopupCartCtrl {
  constructor($rootScope, $scope, fkCartService, ngDialog, fkUtils, $window) {
    this.$rootScope = $rootScope;
    this.$scope = $scope;
    this.fkCartService = fkCartService;
    this.ngDialog = ngDialog;
    this.fkUtils = fkUtils;
    this.$window = $window;
    this.atpRecommendationDialog = null;
    this.showAtpAlert = false;

    $scope.fkCartService = fkCartService;

    $scope.closeCart = () => $rootScope.$broadcast('fk-close-cart');

    $scope.openCart = (ev) => {
      if (ev && ev.preventDefault) {
        ev.preventDefault();
      }
      $rootScope.$broadcast('fk-open-cart');
    };

    $rootScope.$on('fk-atp-unavailableData', (ev, data) => {
      if ($window.sessionStorage.getItem('ATP_ALERT_FLAG')) {
        this.showAtpAlert = false;
        return;
      }
      if (data.unavaialabilityData && data.unavaialabilityData.length > 0) {
        this.showAtpAlert = true;
        setTimeout(function() {
          $scope.ignore();
        }, 600000);
      }
    });

    $rootScope.$on('fk-close-atp-popup', () => {
      $scope.closeAtpPopup();
    });

    $rootScope.$on('fk-hide-atp-alert', () => {
      this.showAtpAlert = false;
    });

    $scope.closeAtpPopup = () => {
      if (this.atpRecommendationDialog) {
        this.atpRecommendationDialog.close();
      }
      $scope.ignore();
    };

    $scope.ignore = () => {
      let atpAlert = document.querySelector('.atp-alert');
      if (atpAlert) {
        atpAlert.style.display = 'none';
      }
      this.showAtpAlert = false;
      $window.sessionStorage.setItem('ATP_ALERT_FLAG', true);
    };
  }

  lazyRefresh() {
    this.fkUtils.lazyLoadImage();
  }

  showPopup() {
    if (!this.atpRecommendationDialog) {
      this.atpRecommendationDialog = this.ngDialog.open({
        template: 'templates/fkAtpRecommendationPopup.html',
        showClose: false,
        appendClassName: 'fk-section-more-dialog',
        scope: this.$scope,
        ariaRole: 'dialog',
        closeByNavigation: true,
        onOpenCallback: () => {
          this.sectionMoreContainer = document.querySelector('.fk-recommendation-popup');
          this.sectionMoreContainer.addEventListener("scroll", this.lazyRefresh.bind(this), this.fkUtils.passiveSupported ? { passive: true } : false);
          this.lazyRefresh();
        },
        preCloseCallback: () => {
          this.atpRecommendationDialog = null;
          this.sectionMoreContainer.removeEventListener("scroll", this.lazyRefresh.bind(this));
        }
      });
    }
    
  }
  focus() {
    var myEl = angular.element(document.querySelector('.account-menu'));
      myEl.css("position", "absolute");
      myEl.css("opacity", 0);
      myEl.css("transform", "scale(0)");
      myEl.css("left", "0px");
      myEl.css("margin-top", "-var(--fk-vertical-space)");
      myEl.css("transform-origin", "50% 0");
      myEl.css("transition", "transform 350ms cubic-bezier(0.23, 1.2, 0.32, 1), opacity 350ms cubic-bezier(0.23, 1.2, 0.32, 1),-webkit-transform 350ms cubic-bezier(0.23, 1.2, 0.32, 1)");
      myEl.css("box-shadow", "absolute");
      myEl.css("position", "0px 25px 20px -20px var(--fk-color-black-a), 0px 0px 40px 0px rgba(0, 0, 0, 0.2)!important");
      var btns = angular.element(document.querySelectorAll(".account-menu [tabindex]"));
      angular.forEach(btns, function(value){
        value.setAttribute("tabindex", -1);
      });
      angular.forEach(myEl, function(value){
        value.setAttribute("aria-expanded", "false");
      });
  }
}

FkPopupCartCtrl.$inject = ['$rootScope', '$scope', 'fkCartService', 'ngDialog', 'fkUtils', '$window'];

export default FkPopupCartCtrl;
