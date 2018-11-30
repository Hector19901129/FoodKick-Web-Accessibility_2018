class FkSortOptionsCtrl {
  constructor($scope) {
    this.$scope = $scope;
    this.showSort = true;

    $scope.sortOption = value => {
      if (value) {
        this.changeSortOption(value);
      }

      let sos = this.sortOptions && this.sortOptions.sortOptions && this.sortOptions.sortOptions.concat((this.sortOptions.sortDropDowns || []).reduce((p, c) => { return p.concat(c.options); }, []));

      return sos && sos.filter(so => so.selected).map(so => so.id + (so.orderAscending ? '|asc' : '|desc'))[0];
    };

    $scope.changeAscDesc = () => {
      this.changeSortOption($scope.sortOption(), !this.sortOptions.currentOrderAsc);
    };
  }

  changeSortOption(so, order) {
    let soparts = so.split('|'),
        soname = soparts[0],
        orderAsc = typeof order !== 'undefined' ? order : soparts[1] === 'asc' || false;

    this.$scope.$emit('fk-sort-changed', {
      sortOption: soname,
      orderAscending: orderAsc
    });
  }

}

FkSortOptionsCtrl.$inject = ['$scope'];

export default FkSortOptionsCtrl;
