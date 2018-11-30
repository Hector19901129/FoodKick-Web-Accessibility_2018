//unused ctrl?

class FkSearchCtrl {
  constructor($scope, $state, $location, fkSearchService, fkUtils) {
    this.$scope = $scope;
    this.$state = $state;
    this.$location = $location;
    this.fkSearchService = fkSearchService;
    this.fkUtils = fkUtils;

    this.searchKey = $state.params.searchKey;
    this.params = $location.search();
    this.currentFilters = null;

    if (this.$state.params.page) {
      this.page = this.$state.params.page;
    } else {
      this.page = 1;
    }

    $scope.fkSearchService = fkSearchService;

    // filter parameter should look like filterId1|filter1,filter2;filterId2|filter3,filter4
    if (this.params.filters) {
      this.currentFilters = fkUtils.filtersFromString(this.params.filters);
    }

    this.loadSearch(this.searchKey, this.currentFilters);

    $scope.$on('fk-filters-changed', (ev, data) => {
      $location.search('filters', data.filterString);
      this.loadSearch(this.searchKey, data.filters);
    });

    $scope.$on('fk-sort-changed', (ev, data) => {
      this.loadSearch(this.searchKey, this.currentFilters, data.sortOption, data.orderAscending);
    });
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

FkSearchCtrl.$inject = ['$scope', '$state', '$location', 'fkSearchService', 'fkUtils'];

export default FkSearchCtrl;
