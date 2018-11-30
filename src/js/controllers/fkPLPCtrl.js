import './../../css/plp.css';

class FkPLPCtrl {
  constructor($sce, $scope, $location, $state, $timeout, fkGlobalNavService, fkCategoryService, fkUtils, browseData) {
    this.$scope = $scope;
    this.$location = $location;
    this.$state = $state;
    this.$timeout = $timeout;
    this.fkGlobalNavService = fkGlobalNavService;
    this.fkCategoryService = fkCategoryService;
    this.fkUtils = fkUtils;
    this.browseData = browseData;

    $scope.fkGlobalNavService = fkGlobalNavService;
    $scope.filterString = '';
    this.categoryId = $state.params.id;
    this.currentAscending = null;
    this.currentFilters = null;
    this.currentSortBy = null;
    this.params = $location.search();
    this.$scope.category = this.browseData;
    $scope.htmlString = $sce.trustAsHtml(this.browseData.htmlTemplate);
    this.$scope.pager = this.browseData ? this.browseData.pager: null;

    if (!this.$scope.category || this.$scope.category.products && this.$scope.category.products.length === 0 && !this.$scope.category.htmlTemplate) {
      $state.go('not-found');
    }

    // filter parameter should look like filterId1|filter1,filter2;filterId2|filter3,filter4
    if (this.params.filters) {
      this.currentFilters = fkUtils.filtersFromString(this.params.filters);
    }
    if (this.params.sort) {
      this.currentSortBy = this.params.sort;
    }
    if (this.params.ascending) {
      this.currentAscending = this.params.ascending;
    }

    $scope.$on('fk-filters-changed', (ev, data) => {
      this.page = 1;
      this.$state.params.page = 1;
      this.params.page = 1;
      $location.search('filters', data.filterString);
      this.loadCategory(this.categoryId, data.filters);
    });

    $scope.$on('fk-sort-changed', (ev, data) => {
      this.page = 1;
      this.$state.params.page = 1;
      this.params.page = 1;
      $location.search('sort', data.sortOption);
      if (data.orderAscending) {
        $location.search('ascending', 'true');
      } else {
        $location.search('ascending', 'false');
      }
      this.loadCategory(this.categoryId, this.currentFilters, data.sortOption, data.orderAscending);
    });
  }

  loadCategory(catId, filters, sortBy, orderAscending) {
    this.$scope.categoryId = catId;
    this.currentFilters = filters;
    this.currentSortBy = sortBy;
    this.currentAscending = orderAscending;
    this.fkCategoryService.getCategory(catId, filters, sortBy, orderAscending, {
      onlyAvailable: false,
      pageSize: 24,
      activePage: this.page
    }).then(categoryData => {
      if (categoryData) {
        this.$scope.category = categoryData;
        this.$scope.pager = categoryData.pager;
        this.$scope.filterString = this.fkUtils.filtersToString(filters);
      } else {
        this.$state.go('not-found'); // TODO ?
      }
      this.fkUtils.goToTop();
      this.$timeout(() => {
        this.$scope.$emit('lazyImg:refresh');
      }, 100);
    });
  }
}

FkPLPCtrl.$inject = ['$sce','$scope', '$location', '$state', '$timeout', 'fkGlobalNavService', 'fkCategoryService', 'fkUtils', 'browseData'];

export default FkPLPCtrl;
