class FkSecondaryHeaderCtrl {
  constructor($rootScope, $scope, fkGlobalNavService, fkUserService, $location) {
    this.$rootScope = $rootScope;
    this.$scope = $scope;
    this.fkGlobalNavService = fkGlobalNavService;
    this.fkUserService = fkUserService;
    this.$location = $location;

    this.isMenuOpen = false;

    $scope.$on('open-menu', ($event, selectedItem) => {
      this.openMenu(selectedItem);
    });

    $rootScope.$on('$stateChangeSuccess', () => {
      this.closeMenu();
    });
  }

  toggleMenu(itemId) {
    this.isMenuOpen = !this.isMenuOpen;
    if (this.isMenuOpen) {
      this.fkGlobalNavService.setCurrentItem(itemId || this.fkGlobalNavService.currentItem);



      //newly added
      var shopBtn = angular.element(document.querySelector("#shopBtn"));
      angular.forEach(shopBtn, function(value){
          value.setAttribute("aria-expanded", "true");
        
      });
      var for_shop_btn = angular.element(document.querySelector("fk-logo a"));
      console.log(for_shop_btn);
      angular.forEach(for_shop_btn, function(value){
          value.setAttribute("tabindex", -1);
        
      });
      for_shop_btn = angular.element(document.querySelector("fk-search-button button"));
      console.log(for_shop_btn);
      angular.forEach(for_shop_btn, function(value){
          value.setAttribute("tabindex", -1);
        
      });
      for_shop_btn = angular.element(document.querySelector("fk-past-items-button button"));
      console.log(for_shop_btn);
      angular.forEach(for_shop_btn, function(value){
          value.setAttribute("tabindex", -1);
        
      });
      for_shop_btn = angular.element(document.querySelectorAll("fk-sign-in-button button"));
      console.log(for_shop_btn);
      angular.forEach(for_shop_btn, function(value){
          value.setAttribute("tabindex", -1);
        
      });


    }else{

      //newly added
      var shopBtn = angular.element(document.querySelector("#shopBtn"));
      angular.forEach(shopBtn, function(value){
          value.setAttribute("aria-expanded", "false");
        
      });
      var for_shop_btn = angular.element(document.querySelector("fk-logo a"));
      angular.forEach(for_shop_btn, function(value){
          value.setAttribute("tabindex", 0);
        
      });
      for_shop_btn = angular.element(document.querySelector("fk-search-button button"));
      console.log(for_shop_btn);
      angular.forEach(for_shop_btn, function(value){
          value.setAttribute("tabindex", 0);
        
      });
      for_shop_btn = angular.element(document.querySelector("fk-past-items-button button"));
      console.log(for_shop_btn);
      angular.forEach(for_shop_btn, function(value){
          value.setAttribute("tabindex", 0);
        
      });
      for_shop_btn = angular.element(document.querySelectorAll("fk-sign-in-button button"));
      console.log(for_shop_btn);
      angular.forEach(for_shop_btn, function(value){
          value.setAttribute("tabindex", 0);
        
      });
    }
    this.onMenuToggle({menuOpen: this.isMenuOpen});
    this.$rootScope.$broadcast('filter-identifier-show', {});
    
  }

  closeMenu() {
    if (this.isMenuOpen) {
      this.toggleMenu();
    }
  }

  openMenu(itemId) {
    if (!this.isMenuOpen) {
      this.toggleMenu(itemId);
    }
  }

}

FkSecondaryHeaderCtrl.$inject = ['$rootScope', '$scope', 'fkGlobalNavService', 'fkUserService', '$location'];

export default FkSecondaryHeaderCtrl;
