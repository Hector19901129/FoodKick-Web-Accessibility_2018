import './../../css/search.css';

class FkSearchPageCtrl {
  constructor($scope, $state, $location, fkSearchService, fkUtils, searchData) {
    this.$scope = $scope;
    this.$state = $state;
    this.$location = $location;
    this.fkSearchService = fkSearchService;
    this.fkUtils = fkUtils;
    this.searchData = searchData;
    this.$scope.search = searchData;

    this.searchKey = $state.params.searchKey;
    this.currentAscending = null;
    this.currentFilters = null;
    this.currentSortBy = null;
    this.params = $location.search();

    if (this.$state.params.page) {
      this.page = this.$state.params.page;
    } else {
      this.page = 1;
    }
    $scope.pager = null;
    $scope.fkSearchService = fkSearchService;
    $scope.filterString = '';

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
      this.loadSearch(this.searchKey, data.filters);
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
      this.loadSearch(this.searchKey, this.currentFilters, data.sortOption, data.orderAscending);
    });
  }

  getTrimmedTerm() {
    if (this.$scope.search && this.$scope.search.searchParams && this.$scope.search.searchParams.searchParams) {
      return this.$scope.search.searchParams.searchParams.toLowerCase().trim().replace(/\s+/g, '+');
    }

    return "";
  }

  loadSearch(searchTerm, filters, sortBy, orderAscending) {
    this.currentFilters = filters;
    this.searchKey = searchTerm;
    this.fkSearchService.search(searchTerm, filters, sortBy, orderAscending, {
      onlyAvailable: true,
      pageSize: 24,
      activePage: this.page
    }).then(searchData => {
      if (searchData) {
        this.$scope.search = searchData;
        this.$scope.filterString = this.fkUtils.filtersToString(filters);
      }
      this.fkUtils.goToTop();
      this.$scope.$emit('lazyImg:refresh');
    });
  }
}

FkSearchPageCtrl.$inject = ['$scope', '$state', '$location', 'fkSearchService', 'fkUtils', 'searchData'];

export default FkSearchPageCtrl;
