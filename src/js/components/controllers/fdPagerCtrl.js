class FdPagerCtrl {
  constructor($rootScope, $state, $location, fkUtils) {
    this.$rootScope = $rootScope;
    this.$state = $state;
    this.$location = $location;
    this.fkUtils = fkUtils;
    this.listLimit = 7;
    this.pageLimit = 3;
    this.itemLimit = 24;
    this.pageFiltersSortAndAscending = null;
    this.path = this.$location.$$path;
    this.goToTop = fkUtils.goToTop;

    this.$postLink = () => {
      if (this.pager) {
        this.init();
        this.setUrls(this.path);
        this.checkActivePage();
        this.setFiltersSortingAndAscending();
        this.canJumpToFirstPage();
        this.canJumpToLastPage();
      }
    };

    $rootScope.$on('fk-filters-changed', () => {
      this.$state.params.page = 1;
      this.setFiltersSortingAndAscending();
    });

    $rootScope.$on('fk-sort-changed', () => {
      this.setFiltersSortingAndAscending();
    });

    this.filterPageList = (num) => {
      if (this.lastPage > this.listLimit) {
        return num >= this.pageMin && num <= this.pageMax;
      }
      return true;
    };
  }

  init() {
    this.activePage = this.pager.activePage;
    this.lastPage = this.pager.pageCount;
    this.pageMax = this.pager.activePage + this.pageLimit;
    this.pageMin = this.pager.activePage - this.pageLimit;
    this.pageList = [];

    for (let p = 1; p <= this.lastPage; p++ ) {
      this.pageList.push(p);
    }
  }

  checkActivePage() {
    // if there are less pages than 7
    if (this.activePage <= this.pageLimit) {
      this.pageMax = this.activePage + (this.listLimit - this.activePage) || this.lastPage;
    }
    // if activePage is at the end of the page list
    if (this.activePage > this.lastPage - this.pageLimit) {
      this.pageMin = this.pageMin - (this.pageLimit - (this.lastPage - this.activePage));
      this.pageMax = this.lastPage;
    }
  }

  setUrls(path) {
    this.initPage = '' + path;
    this.link = this.initPage + '?page=';
    this.toLastPage = this.initPage + '?page=' + this.lastPage;
    this.prevPage = this.initPage + '?page=' + (this.activePage -1);
    this.nextPage = this.initPage + '?page=' + (this.activePage + 1);
  }

  get pager() {
    return this._pager;
  }

  set pager(value) {
    if (this._pager !== value) {
      this._pager = value;
      this.init();
      this.setUrls(this.path);
      this.checkActivePage();
      this.setFiltersSortingAndAscending();
      this.canJumpToFirstPage();
      this.canJumpToLastPage();
    }
  }

  canJumpToFirstPage() {
    if (this.activePage > 4 && this.lastPage > this.listLimit) {
      return true;
    }
    return false;
  }

  canJumpToLastPage() {
    if (this.activePage < this.lastPage - 3 && this.lastPage > this.listLimit) {
      return true;
    }
    return false;
  }

  setFiltersSortingAndAscending() {
    let pageAscending = '',
        pageFilters = '',
        pageSort = '',
        params = this.$location.search();

    if (params.filters) {
      pageFilters = '&filters=' + params.filters;
    }
    if (params.sort) {
      pageSort = '&sort=' + params.sort;
    }
    if (params.ascending) {
      pageAscending = '&ascending=' + params.ascending;
    }
    this.pageFiltersSortAndAscending = pageFilters + pageSort + pageAscending;
  }
}

FdPagerCtrl.$inject = ['$rootScope', '$state', '$location', 'fkUtils'];

export default FdPagerCtrl;
