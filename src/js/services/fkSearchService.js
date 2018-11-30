class FkSearchService {
  constructor(fkHttp, $log, $rootScope, API, fkUtils) {
    this.fkHttp = fkHttp;
    this.$log = $log;
    this.$rootScope = $rootScope;
    this.API = API;
    this.fkUtils = fkUtils;
    this.searchResult = null;
    this.newSearchKey = null;
    this.searchTerm = null;

    this.$rootScope.$on('fk-user-change', (ev, data) => {
      if (!data.user) {
        this.searchTerm = null;
      }
    });
  }

  autocomplete (searchTerm) {
    var promise = this.fkHttp({
      method: 'GET',
      elementToFocus: false,
      url: this.fkUtils.replaceURLParams(this.API.autocomplete, {
        searchTerm: searchTerm || ""
      })
    }).then(response => response.data)
    .catch((error) => {
      this.$log.error(error);
      return {errors: {CLIENT_ERROR: error}};
    });
    return promise;
  }

  search (searchKey, filters, sortBy, orderAscending, config = {}) {
    this.searchTerm = '';
    let data = {
      pageType: 'SEARCH',
      searchParams: searchKey,
      activeTab: 'product',
      pageSize: 20,
      all: typeof config.all !== 'undefined' ? config.all : true,
      activePage: config.activePage || 1
    };

    if (filters) {
      data.requestFilterParams = filters;
    }
    if (sortBy) {
      data.sortBy = sortBy;
    }
    if (orderAscending) {
      data.orderAscending = true;
    }

    this.$rootScope.$broadcast('fk-search', {
      searchKey,
      filters,
      sortBy,
      orderAscending,
      config
    });

    return this.fkHttp({
      dispatch: true,
      method: 'POST',
      spinner: config.spinner || 'search',
      elementToFocus: 'fk-search-button button.search-button',
      url: config.url || this.API.search,
      headers: {'Content-Type': 'application/x-www-form-urlencoded'},
      data: this.fkUtils.postData(data)
    }).then((response) => {
      this.searchResult = '';
      this.searchTerm = searchKey;

      if (response.data.browse) {
        let search = response.data.browse;

        // flatten recursive category structure, transform products to objects w/ pPotatoes
        search.products = this.fkUtils.flattenCategoryProducts(search.sections.sections).map(p => { return {productData: p}; });

        this.searchResult = search;

        this.$rootScope.$broadcast('fk-search-result', {
          searchKey,
          filters,
          sortBy,
          orderAscending,
          config,
          searchResult: search
        });
        return search;
      }
      return null;

    }).catch((error) => {
      this.$log.error(error);
      return {
        errors: { general: error }
      };
    });
  }
}

FkSearchService.$inject = ['fkHttp', '$log', '$rootScope', 'API', 'fkUtils'];

export default FkSearchService;
