class FkDepartmentListCtrl {
  constructor($window, $log, fkGlobalNavService, $scope) {
    this.$log = $log;
    this.$scope = $scope;
    this.$window = $window;
    this.globalNavService = fkGlobalNavService;
  }

  click(title) {
    this.$scope.$emit('fk-top-menu-clicked', {title: title});
  }

  touchHandler($event, id) {
    this.onSelect({departmentId: id});
  }

  mouseOverHandler($event, id) {
    this.onSelect({departmentId: id});
  }

  clickHandler($event, id) {
    this.$log.warn('fkDepartmentList.clickHandler is deprecated!');
    this.onNavigate({departmentId: id});
  }
  focus(event, id){

      this.onSelect({departmentId: id});
    
  }
  arrowRight($event, departmentId){
    if(event.keyCode === 39){
      var col1 = angular.element(document.querySelectorAll(".col"));
      angular.forEach(col1, function(value){
        value.setAttribute("tabindex", -1);
      });
    }else if(event.keyCode === 13){
      
      this.click(this.globalNavService.getItem(departmentId).name);
      this.$window.location.href="/department/"+departmentId;
      
    }
  }
}

FkDepartmentListCtrl.$inject = ['$window', '$log', 'fkGlobalNavService', '$scope'];

export default FkDepartmentListCtrl;
