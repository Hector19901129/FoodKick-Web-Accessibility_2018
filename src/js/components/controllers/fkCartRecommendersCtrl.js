class FkCartRecommendersCtrl {
  constructor($rootScope, $timeout, fkRecommendationsService, fkUtils) {
    this.$rootScope = $rootScope;
    this.$timeout = $timeout;
    this.fkRecommendationsService = fkRecommendationsService;
    this.fkUtils = fkUtils;

    this.recommendations = null;
    this.recommendationsTops = null;
    this.recommendationsPosition = null;
    this.isMobile = this.decideIsMobile(fkUtils.getActiveBreakpoint());

    this.$onInit = () => {
      fkRecommendationsService.updateRecommendations('cart');
      this.recommendations = fkRecommendationsService.getRecommendations('cart');

      $timeout(() => {
        this.lazyRefresh();
        this.addScrollHandlers();
        this.updateRecommendationTops();
      }, 100);
    };

    this.$onDestroy = () => {
      this.removeScrollHandlers();
    };

    $rootScope.$on('fk-recommendations-changed', (e, data) => {
      if (data && data.id && data.id === 'cart') {
        this.recommendations = data.recommendations;

        $timeout(() => {
          this.lazyRefresh();
          this.updateScrollHandlers();
          this.updateRecommendationTops();
        }, 100);
      }
    });

    $rootScope.$on('breakpoint-change', (ev, data) => {
      this.ismobile = this.decideIsMobile(data.breakpoint);
      this.updateScrollHandlers();
      this.updateRecommendationTops();
    });

    $rootScope.$on('cart-recommender-scrollToRecommendation', (ev, data) => {
      this.scrollToRecommendation(data.crSrollToId);
    });
  }

  updateRecommendationTops() {
    this.recommendationsTops = Array.from(document.querySelectorAll('.cr-recommendation')).map(line => {
      return {
        top: line.getBoundingClientRect().top,
        id: line.id.replace('-wrapper','')
      };
    });
  }

  addScrollHandlers() {
    let cartContent = document.querySelector('.cartcontent--content'),
        recommendationsWrapper = document.querySelector('.cr-recommendations');

    if (cartContent) {
      cartContent.addEventListener("scroll", this.lazyRefresh.bind(this), this.fkUtils.passiveSupported ? {passive : true} : false);
      cartContent.addEventListener("scroll", this.scrollOverListener.bind(this), this.fkUtils.passiveSupported ? {passive : true} : false);
    }
    if (recommendationsWrapper) {
      recommendationsWrapper.addEventListener("scroll", this.lazyRefresh.bind(this), this.fkUtils.passiveSupported ? {passive : true} : false);
      recommendationsWrapper.addEventListener("scroll", this.scrollOverListener.bind(this), this.fkUtils.passiveSupported ? {passive : true} : false);
    }
  }

  removeScrollHandlers() {
    let cartContent = document.querySelector('.cartcontent--content'),
        recommendationsWrapper = document.querySelector('.cr-recommendations');

    if (cartContent) {
      cartContent.removeEventListener("scroll", this.lazyRefresh.bind(this), this.fkUtils.passiveSupported ? {passive : true} : false);
      cartContent.removeEventListener("scroll", this.scrollOverListener.bind(this), this.fkUtils.passiveSupported ? {passive : true} : false);
    }
    if (recommendationsWrapper) {
      recommendationsWrapper.removeEventListener("scroll", this.lazyRefresh.bind(this), this.fkUtils.passiveSupported ? {passive : true} : false);
      recommendationsWrapper.removeEventListener("scroll", this.scrollOverListener.bind(this), this.fkUtils.passiveSupported ? {passive : true} : false);
    }
  }

  updateScrollHandlers() {
    this.removeScrollHandlers();
    this.addScrollHandlers();
  }

  decideIsMobile (bp) {
    return bp === 'xs' || bp === 'sm';
  }

  lazyRefresh() {
    this.$rootScope.$emit('lazyImg:refresh');
  }

  isSticky() {
    let cartContentHeader = document.querySelector('.cartcontent--header'),
        recommendationSelector = document.querySelector('.cr-selector-non-sticky'),
        recommendationStickySelector = document.querySelector('.cr-selector-sticky');

    if (recommendationSelector && recommendationStickySelector) {
      let headerBottom = cartContentHeader.getBoundingClientRect().bottom;
      let stickyRef = document.querySelector('.recommendation-sticky-ref');

      if (stickyRef.getBoundingClientRect().bottom < headerBottom) {
        recommendationSelector.classList.remove('cr-visible');
        recommendationStickySelector.style.top = headerBottom + 'px';
        recommendationStickySelector.classList.add('cr-visible');
      } else {
        recommendationStickySelector.classList.remove('cr-visible');
        recommendationSelector.classList.add('cr-visible');
      }
    }
  }

  filterScrolledOvers(actualPosition) {
    return this.recommendationsTops && this.recommendationsTops.filter((line) =>
      line.top < actualPosition
    ) || [];
  }

  scrollOverListener() {
    let cartContent = document.querySelector('.cartcontent--content'),
        recommendationsWrapper = document.querySelector('.cr-recommendations'),
        recommendationStickySelector = document.querySelector('.cr-selector-sticky');

    if (this.isMobile) {
      this.recommendationsPosition = cartContent.scrollTop + recommendationStickySelector.getBoundingClientRect().bottom;
      this.isSticky();
    } else {
      this.recommendationsPosition = recommendationsWrapper.scrollTop + recommendationsWrapper.getBoundingClientRect().top;
    }

    if (this.filterScrolledOvers(this.recommendationsPosition).length > 0) {
      if (this.filterScrolledOvers(this.recommendationsPosition).slice(-1)[0]) {
        this.$rootScope.$broadcast('cart-recommender-selected', {crSelected: this.filterScrolledOvers(this.recommendationsPosition).slice(-1)[0].id});
      }
    } else if (this.recommendationsTops && this.recommendationsTops[0]) {
      this.$rootScope.$broadcast('cart-recommender-selected', {crSelected: this.recommendationsTops[0].id});
    }
  }

  scrollToRecommendation(recommendationId) {
    let cartContent = document.querySelector('.cartcontent--content'),
        cartContentHeader = document.querySelector('.cartcontent--header'),
        recommendationsWrapper = document.querySelector('.cr-recommendations');

    let recommendationTop = document.querySelector('#cr-' + recommendationId).getBoundingClientRect().top;

    if (this.isMobile) {
      let selectorHeight = 40; // Set the same height to .cr-selector at small screen in fkCartRecommenderSelector.css
      let headerBottom = cartContentHeader.getBoundingClientRect().bottom;
      cartContent.scrollTop = cartContent.scrollTop + recommendationTop - headerBottom - selectorHeight;
    } else {
      this.topOfRecommendations = recommendationsWrapper.getBoundingClientRect().top;
      recommendationsWrapper.scrollTop = recommendationsWrapper.scrollTop + recommendationTop - this.topOfRecommendations;
    }

    let dealInfo = document.querySelector('#cr-' + recommendationId + ' .cr-dealinfo');

    if (dealInfo) {
      dealInfo.focus();
    }

    this.scrollOverListener();
  }
}

FkCartRecommendersCtrl.$inject = ['$rootScope', '$timeout', 'fkRecommendationsService', 'fkUtils'];

export default FkCartRecommendersCtrl;
