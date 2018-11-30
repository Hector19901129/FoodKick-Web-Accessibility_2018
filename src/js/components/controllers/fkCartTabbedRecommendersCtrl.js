class FkCartTabbedRecommendersCtrl {
  constructor($rootScope, $timeout, fkRecommendationsService, fkUtils) {
    this.$rootScope = $rootScope;
    this.$timeout = $timeout;
    this.fkRecommendationsService = fkRecommendationsService;
    this.fkUtils = fkUtils;

    this.recommendations = null;
    this.selected = null;
    this.isMobile = this.decideIsMobile(fkUtils.getActiveBreakpoint());

    this.$onInit = () => {
      fkRecommendationsService.updateRecommendations('cart');
      this.recommendations = fkRecommendationsService.getRecommendations('cart');
      if (this.recommendations && this.recommendations[0]) {
        this.displayRecommendation(this.recommendations[0].id);
      }
      this.addScrollHandlers();
    };

    let fkrListener = $rootScope.$on('fk-recommendations-changed', (e, data) => {
      if (data && data.id && data.id === 'cart') {
        this.recommendations = data.recommendations;
        if (this.recommendations && this.recommendations[0]) {
          this.displayRecommendation(this.recommendations[0].id);
        }
      }
    });

    $timeout(() => {
      this.lazyRefresh();
    }, 100);

    let bpchangeListener = $rootScope.$on('breakpoint-change', (ev, data) => {
      this.ismobile = this.decideIsMobile(data.breakpoint);
    });

    let crscrollListener = $rootScope.$on('cart-recommender-scrollToRecommendation', (ev, data) => {
      this.displayRecommendation(data.crSrollToId);
    });

    this.$onDestroy = () => {
      fkrListener();
      bpchangeListener();
      crscrollListener();
      this.removeScrollHandlers();
    };
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
      cartContent.removeEventListener("scroll", this.lazyRefresh.bind(this));
      cartContent.removeEventListener("scroll", this.scrollOverListener.bind(this));
    }
    if (recommendationsWrapper) {
      recommendationsWrapper.removeEventListener("scroll", this.lazyRefresh.bind(this));
      recommendationsWrapper.removeEventListener("scroll", this.scrollOverListener.bind(this));
    }
  }

  updateScrollHandlers() {
    this.removeScrollHandlers();
    this.addScrollHandlers();
  }

  scrollOverListener() {
    if (this.isMobile) {
      this.isSticky();
    }
  }

  displayRecommendation(recommendationId) {
    this.selected = recommendationId;
    this.$rootScope.$broadcast('cart-recommender-selected', {crSelected: recommendationId});
  }
}

FkCartTabbedRecommendersCtrl.$inject = ['$rootScope', '$timeout', 'fkRecommendationsService', 'fkUtils'];

export default FkCartTabbedRecommendersCtrl;
