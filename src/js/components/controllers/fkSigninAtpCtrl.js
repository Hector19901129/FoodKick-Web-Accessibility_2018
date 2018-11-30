class FkSigninAtpCtrl {
  constructor($scope, $timeout, $element, $rootScope, fkProductService, fkCartService, fkUtils, fkRecommendationsService) {
    this.$scope = $scope;
    this.$timeout = $timeout;
    this.$element = $element;
    this.fkProductService = fkProductService;
    this.fkCartService = fkCartService;
    this.fkRecommendationsService = fkRecommendationsService;
    this.fkUtils = fkUtils;
    this.$rootScope = $rootScope;
    $scope.unavData = null;
    $scope.currentItemIndex = 0;
    $scope.currentItem = null;

    fkRecommendationsService.getAtpRecommendations().then((response) => {
      this.initATP(response.unavailability);
    });

    $scope.closeAtp = () => {
      $rootScope.$broadcast('fk-close-atp-popup');
    };

    $scope.continue = () => {
      $rootScope.$broadcast('fk-hide-atp-alert');
      if ($scope.removeOrKeep.value === 'keep') {
        let pc = fkCartService.cartLines[$scope.currentItem.cartLineId].productConfiguration;
        pc.quantity = +$scope.currentItem.availableQuantity;
        if (this.dontUpdateCart !== 'true') {
          fkCartService.updateCartline($scope.currentItem.cartLineId, pc);
        }
      } else if ($scope.removeOrKeep.value === 'remove' && this.dontUpdateCart !== 'true') {
        fkCartService.deleteCartlines([$scope.currentItem.cartLineId]);
      }
      if ($scope.currentItemIndex + 1 >= $scope.unavItems.length) {
        $scope.$emit('fk-atp-done');
        $scope.unavData = null;
        $scope.currentItemIndex = 0;
        $scope.currentItem = null;
        this.refreshImages();
        $rootScope.$broadcast('fk-close-atp-popup');
        $rootScope.$broadcast('fk-hide-atp-alert');
      } else {
        this.nextStep();
      }
    };

    $element[0].querySelector('.atp-content').addEventListener('scroll', this.refreshImages, fkUtils.passiveSupported ? { passive: true } : false);
  }

  refreshImages(to) {
    this.$timeout(() => {
      this.$scope.$emit('lazyImg:refresh');
    }, to || 10);
  }

  nextStep(step) {
    this.$scope.currentItemIndex = step === 0 ? 0 : step || this.$scope.currentItemIndex + 1;
    this.$scope.currentItem = this.$scope.unavItems[this.$scope.currentItemIndex];
    this.$scope.currentProduct = angular.copy(this.fkCartService.cartLines[this.$scope.currentItem.cartLineId].productConfiguration.productPotato) || {};
    this.$scope.currentProduct.available = false;
    this.$scope.removeOrKeep = { value: +this.$scope.currentItem.availableQuantity ? 'keep' : 'remove' };

    let content = this.$element[0].querySelector('.atp-content');
    if (content) {
      content.scrollTop = 0;
    }
    this.refreshImages();

    let products = this.$scope.currentItem.recommendedProducts;

    if (products) {
      this.fkProductService.getProducts(
        products.map(p => p.id), { async: true }
      ).then(ps => {
        this.$scope.currentItem.recommendedProducts = ps;
        this.$scope.replacement = Object.keys(ps).length > 0 ? true : false;
        this.refreshImages(100);
      });
    }
  }

  initATP(unavData) {
    if (unavData) {
      this.$scope.$emit('fk-atp', unavData);

      this.$scope.unavItems = (unavData.replaceableLines || [])
        .concat(unavData.nonReplaceableLines || [])
        .concat(unavData.invalidLines || [])
        .concat(unavData.issues || [])
        .concat(unavData.passes || []);
      this.nextStep(0);
    }
  }

}

FkSigninAtpCtrl.$inject = ['$scope', '$timeout', '$element', '$rootScope', 'fkProductService', 'fkCartService', 'fkUtils', 'fkRecommendationsService'];

export default FkSigninAtpCtrl;
