class FkLeftNavCtrl {
  constructor($scope, $element, $timeout, fkUtils, fkGlobalNavService) {
    this.$scope = $scope;
    this.$element = $element;
    this.$timeout = $timeout;
    this.fkUtils = fkUtils;
    this.fkGlobalNavService = fkGlobalNavService;
    this.filterIdentifier = true;

    this.filters = null;
    this.filterString = null;

    $scope.filtersChanged = (title) => {
      $timeout(() => {
        this.filters = this.getFilters();
        this.filterString = fkUtils.filtersToString(this.filters);

        $scope.$emit('fk-filters-changed', {filters: this.filters, filterString: this.filterString});
      }, 1);
      if (title) {
        this.clicked(title);
      }
    };

    $scope.categoryClicked = (ev, id, title) => {
      if (title) {
        this.clicked(title);
      }
    };
  }

  clicked(title) {
    this.$scope.$emit('fk-left-menu-clicked', {title: title});
  }

  getFilters() {
    return Array.from(this.$element[0].querySelectorAll(':checked')).reduce((p, el) => {
      let name = el.name || el.getAttribute('name');

      p[name] = p[name] ? p[name].concat([el.value]) : [el.value];
      return p;
    }, {});
  }

  categoryUrl(itemId) {
    return this.fkGlobalNavService.navigateUrl(itemId) + (this.filterString ? '?filters=' + this.filterString : '');
  }

}

FkLeftNavCtrl.$inject = ['$scope', '$element', '$timeout', 'fkUtils', 'fkGlobalNavService'];

export default FkLeftNavCtrl;
