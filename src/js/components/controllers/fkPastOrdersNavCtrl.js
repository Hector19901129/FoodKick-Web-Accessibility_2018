class FkPastOrdersNavCtrl {
  constructor($scope, fkUtils) {
    this.$scope = $scope;
    this.fkUtils = fkUtils;

    this.pastOrderGroup = null;
    this.ismobile = this.decideIsMobile(fkUtils.getActiveBreakpoint());

    $scope.$on('breakpoint-change', (ev, data) => {
      this.ismobile = this.decideIsMobile(data.breakpoint);
    });
  }

  decideIsMobile (bp) {
    return bp === 'xs' || bp === 'sm';
  }

  openMenuGroup(menuItemTitle) {
    this.pastOrderGroup = menuItemTitle;
  }

}

FkPastOrdersNavCtrl.$inject = ['$scope', 'fkUtils'];

export default FkPastOrdersNavCtrl;
