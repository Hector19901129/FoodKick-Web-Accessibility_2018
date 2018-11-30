class FkRefineButtonCtrl {
  constructor($scope, ngDialog) {
    this.$scope = $scope;
    this.ngDialog = ngDialog;

    $scope.show = null;
    $scope.dialog = null;

    $scope.openWithKeyboard = (event, pane) => {
      if (event.keyCode === 32 || event.keyCode === 13) {
        $scope.switchTo(pane);
      }
    };

    $scope.switchTo = pane => {
      $scope.show = pane;
    };

    $scope.sortChange = (soname, orderAsc) => {
      $scope.$emit('fk-sort-changed', {
        sortOption: soname,
        orderAscending: orderAsc
      });
    };

    $scope.reset = () => {
      $scope.$emit('fk-filters-changed', {});
    };

    $scope.getFilter = () => {
      let filters = this.category.menuBoxes.menuBoxes.filter(mb => mb.boxType === 'FILTER').reduce((p, c) => {
        c.items.forEach(filter => {
          if (filter.id && filter.selected && filter.urlParameter !== 'clearall') {
            p.push(filter.name);
          }
        });

        return p;
      }, []).join(', ');

      return filters;
    };

    $scope.getSort = () => {
      let sort = this.category.sortOptions.sortOptions.filter(so => so.selected)[0];

      if (!sort) {
        this.category.sortOptions.sortDropDowns.forEach(sdd => {
          sdd.options.forEach(so => {
            if (so.selected) {
              sort = so;
            }
          });
        });
      }

      return sort && sort.name || 'Default order';
    };

    $scope.refine = () => {
      if (!$scope.dialog || !$scope.dialog.id || !ngDialog.isOpen($scope.dialog.id)) {
        $scope.show = null;
        $scope.dialog = ngDialog.open({
          templateUrl: 'templates/fkRefine.html',
          appendClassName: 'fk-refine narrow',
          showClose: false,
          ariaRole: 'dialog',
          scope: $scope,
          disableAnimation: true
        });
        this.$scope.$emit('fk-popup-opened', {
          name: 'fkRefine',
          type: 'Info Page'
        });
      }
    };
  }

}

FkRefineButtonCtrl.$inject = ['$scope', 'ngDialog'];

export default FkRefineButtonCtrl;
