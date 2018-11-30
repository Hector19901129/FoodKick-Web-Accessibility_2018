import './../../css/pastItems.css';

class FkPastItemsCtrl {
  constructor($rootScope, $scope, $timeout, fkPastItemsService, fkUtils) {
    this.$rootScope = $rootScope;
    this.$scope = $scope;
    this.$timeout = $timeout;
    this.fkPastItemsService = fkPastItemsService;
    this.fkUtils = fkUtils;

    this.currentDepartments = null;
    this.currentPreferences = null;
    this.currentSortOption = null;
    this.currentOrderAsc = true;

    $scope.showResult= false;
    $scope.fkPastItemsService = fkPastItemsService;
    fkPastItemsService.getItems();

    $scope.$on('fk-sort-changed', (ev, data) => {
      this.loadItems(data.sortOption, data.orderAscending, this.currentPreferences, this.currentDepartments);
    });

    $scope.$on('fk-filters-changed', (ev, data) => {
      let departments = null;
      if (data.filters.DEPARTMENTS) {
        departments = data.filters.DEPARTMENTS[0] !== "" ? data.filters.DEPARTMENTS : null;
      }
      this.loadItems(this.currentSortOption, this.currentOrderAsc, data.filters.PREFERENCES, departments);
      if (departments !== null || data.filters.PREFERENCES) {
        $scope.showResult= true;
      } else {
        $scope.showResult= false;
      }
    });
  }

  loadItems(sortId, orderAsc, preferences, departments) {
    this.currentSortOption = sortId;
    this.currentOrderAsc = orderAsc;
    this.currentPreferences = preferences;
    this.currentDepartments = departments;
    this.fkPastItemsService.getItems(sortId, orderAsc, preferences, departments).then( () => {
      this.fkUtils.lazyLoadImage();
    });
  }

}

FkPastItemsCtrl.$inject = ['$rootScope', '$scope', '$timeout', 'fkPastItemsService', 'fkUtils'];

export default FkPastItemsCtrl;
