class FkGlobalNavCtrl {
  constructor($window, $scope, fkGlobalNavService) {
    this.$scope = $scope;
    this.fkGlobalNavService = fkGlobalNavService;
    this.$window = $window;
    this.columns = [];

    $scope.$watch(() => fkGlobalNavService.currentItem, (itemId) => {
      this.columns = fkGlobalNavService.getParentIds(itemId);
      
    });
  }

  touchHandler($event, itemId, index) {
    if (this.columns[index] === itemId) {
      this.navigate(itemId, true);
    } else {
      this.selectItem(itemId);
    }
    if (this.fkGlobalNavService.getItem(itemId).children.length === 0) {
      this.navigate(itemId, true);
    }
  }
  focus($event, itemId, index){
    
      this.selectItem(itemId);
  }
  keyEnter(event, index, child){
    if(event.keyCode === 13){
      
      this.$scope.$emit('fk-top-menu-clicked', {title: this.fkGlobalNavService.getItem(child).name});
      this.navigate(child, true);
    }else if(event.keyCode === 39 && index === 0){
      var col1 = angular.element(document.querySelectorAll(".col"+index));
        
        angular.forEach(col1, function(value){
          value.setAttribute("tabindex", -1);
        });
    }else if(event.keyCode === 37){
      if(index === 0){
        var col1 = angular.element(document.querySelectorAll(".col0"));
        
        angular.forEach(col1, function(value){
          value.setAttribute("tabindex", -1);
        });
        var col1 = angular.element(document.querySelectorAll(".col"));
        
        angular.forEach(col1, function(value){
          value.setAttribute("tabindex", 0);
        });
      }else{
        var col1 = angular.element(document.querySelectorAll(".col1"));
        
        angular.forEach(col1, function(value){
          value.setAttribute("tabindex", -1);
        });
        var col1 = angular.element(document.querySelectorAll(".col0"));
        
        angular.forEach(col1, function(value){
          value.setAttribute("tabindex", 0);
        });
      }
      
    }
  }
  selectItem(itemId) {
    this.fkGlobalNavService.setCurrentItem(itemId);
  }

  click(title) {
    this.$scope.$emit('fk-top-menu-clicked', {title: title});
  }

  navigate(itemId) {
    this.fkGlobalNavService.navigate(itemId);
    this.onNavigate({itemId: itemId});
  }

  back() {
    let columns = this.columns;
    this.fkGlobalNavService.setCurrentItem(columns[columns.length - 2]);
  }

  getCurrentSelected() {
    this.fkGlobalNavService.getItem(this.fkGlobalNavService.currentItem);
  }

}

FkGlobalNavCtrl.$inject = ['$window', '$scope', 'fkGlobalNavService'];

export default FkGlobalNavCtrl;
