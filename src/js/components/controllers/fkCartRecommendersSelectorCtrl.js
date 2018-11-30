class FkCartRecommendersSelectorCtrl {
  constructor($rootScope, fkRecommendationsService, fkUtils) {
    this.$rootScope = $rootScope;
    this.fkRecommendationsService = fkRecommendationsService;
    this.fkUtils = fkUtils;

    this.recommendations = null;
    this.topOfRecommendations = null;
    this.recommendationSelector = null;
    this.recommendationSelectorHeight = null;
    this.cartContent = document.querySelector('.cartcontent--content');
    this.cartContentHeader = document.querySelector('.cartcontent--header');
    this.recommendationsWrapper = document.querySelector('.cr-recommendations');
    this.isMobile = this.decideIsMobile(fkUtils.getActiveBreakpoint());

    this.$onInit = () => {
      this.recommendations = fkRecommendationsService.getRecommendations();
    };

    let bpchangedListener = $rootScope.$on('breakpoint-change', (ev, data) => {
      this.ismobile = this.decideIsMobile(data.breakpoint);
    });

    let crselectedListener = $rootScope.$on('cart-recommender-selected', (ev, data) => {
      this.changeSelected(data.crSelected);
    });

    let fkrListener = $rootScope.$on('fk-recommendations-changed', (e, data) => {
      if (data && data.id && data.id === 'cart') {
        this.recommendations = data.recommendations;
      }
    });

    this.$onDestroy = () => {
      bpchangedListener();
      crselectedListener();
      fkrListener();
    };

  }

  changeSelected(selected) {
    let stickyRef = document.querySelector('.recommendation-sticky-ref');
    let selectedRecommenderButtons = document.querySelectorAll('#button-' + selected);
    if (!selectedRecommenderButtons.length) {
      selectedRecommenderButtons = document.querySelectorAll('#button-cr-'+selected);
    }
    let selectedEl = document.querySelectorAll('.cr-selected');

    if (selectedEl.length) {
      Array.from(selectedEl).forEach(se => se.classList.remove('cr-selected'));
    }

    if (selectedRecommenderButtons.length) {
      Array.from(selectedRecommenderButtons).forEach(b => b.classList.add('cr-selected'));
    }

    if (this.isMobile) {
      this.recommendationSelector = document.querySelector('.cr-selector-sticky .cr-selector');
    } else {
      this.recommendationSelector = document.querySelector('.cr-selector-non-sticky .cr-selector');
    }

    if (this.recommendationSelector && selectedRecommenderButtons.length && stickyRef) {
      this.recommendationSelector.scrollLeft = this.recommendationSelector.scrollLeft + selectedRecommenderButtons[0].getBoundingClientRect().left + selectedRecommenderButtons[0].getBoundingClientRect().width /2 - stickyRef.getBoundingClientRect().width /2;
    }
  }

  decideIsMobile (bp) {
    return bp === 'xs' || bp === 'sm';
  }

  scrollToRecommendation(recommendationId) {
    this.$rootScope.$broadcast('cart-recommender-scrollToRecommendation', {crSrollToId: recommendationId});
  }
}

FkCartRecommendersSelectorCtrl.$inject = ['$rootScope', 'fkRecommendationsService', 'fkUtils'];

export default FkCartRecommendersSelectorCtrl;
