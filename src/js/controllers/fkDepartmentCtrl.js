import './../../css/department.css';

class FkDepartmentCtrl {
  constructor($state, fkGlobalNavService) {
    this.$state = $state;
    this.fkGlobalNavService = fkGlobalNavService;

    this.opened = null;
    this.departmentId = $state.params.id;
    this.department = fkGlobalNavService.getItem(this.departmentId);

    if (!this.department.id) {
      $state.go('not-found');
    }

    this.children = this.department.children.map(department => fkGlobalNavService.getItem(department));
  }

  toggle(catId, opened) {
    if (opened) {
      this.opened = catId;
    } else {
      this.opened = null;
    }
  }

}

FkDepartmentCtrl.$inject = ['$state', 'fkGlobalNavService'];

export default FkDepartmentCtrl;
