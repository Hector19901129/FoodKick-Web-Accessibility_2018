class FkDepartmentCategoryCtrl {
  constructor($scope, $element, $log, fkGlobalNavService, fkCategoryService, fkUtils) {
    this.$scope = $scope;
    this.$element = $element;
    this.$log = $log;
    this.fkGlobalNavService = fkGlobalNavService;
    this.fkCategoryService = fkCategoryService;
    this.fkUtils = fkUtils;
    this.goToTop = fkUtils.goToTop;

    this.globalNavService = fkGlobalNavService;
    this.sortLabel = null;
    this.products = [];

    this.$postLink = () => {
      this.products = fkCategoryService.getCategory(this.category.id, null, null, null, {
        onlyAvailable: true,
        pageSize: 12,
        activePage: 1,
        async: this.httpAsync,
        last: this.httpLast,
        sectionsDataOnly: true
      })
      .then(categoryData => {
        this.products = categoryData && categoryData.products || [];
        this.products.sortLabel = null;
        if (categoryData.sortOptions && categoryData.sortOptions.sortOptions && categoryData.sortOptions.sortOptions[0]) {
          this.products.sortLabel = categoryData.sortOptions.sortOptions[0].name;
        }
        if (this.httpLast !== false) {
          setTimeout(() => {
            $scope.$emit('lazyImg:refresh');
          }, 10);
        }

        return this.products;
      })
      .then(value => {
        this.sortLabel = value.sortLabel;
      }).catch(error => {
        this.$log.warn('[FkDepartmentCategory]', error);
      });

      this.image = this.category.image || '';
    };
  }

  isXSScreen() {
    return !!this.fkUtils.isBreakpointActive('xs');
  }

  toggle($event) {
    this.opened = !this.opened;
    this.onToggle({catId: this.category.id, opened: this.opened});
    let elementHeader = document.querySelector('.header-image');
    let header = document.querySelector('fk-secondary-header');
    if (this.opened === true && elementHeader && header) {
      setTimeout(() => {
        let fb = document.getElementById('fakebody'),
          elementHeaderImageHeight = elementHeader.clientHeight,
          headerHeight = header.clientHeight;

        fb.scrollTop = this.$element[0].offsetTop + elementHeaderImageHeight - headerHeight;
      }, 1);
    }
    $event.preventDefault();
  }

  navigate(itemId) {
    this.fkGlobalNavService.navigate(itemId);
  }

  navigateName($event, itemId) {
    if (!this.isXSScreen()) {
      this.navigate(itemId);
    }
  }

}

FkDepartmentCategoryCtrl.$inject = ['$scope', '$element', '$log', 'fkGlobalNavService', 'fkCategoryService', 'fkUtils'];

export default FkDepartmentCategoryCtrl;
