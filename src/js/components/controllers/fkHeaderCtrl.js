class FkHeaderCtrl {
  constructor($scope, $element, fkUtils, fkUserService, SITE) {
    this.$scope = $scope;
    this.$element = $element;
    this.fkUtils = fkUtils;
    this.fkUserService = fkUserService;
    this.SITE = SITE;

    this.menuOpen = false;

    this.handleScroll = () => {
        if (fkUtils.rafID === null) {
          fkUtils.rafID = window.requestAnimationFrame(() => fkUtils.isSticky($element));
        }
      };

    this.$onInit = () => {
      fkUtils.isSticky($element);
      fkUtils.body.addEventListener("scroll", this.handleScroll, fkUtils.passiveSupported ? {passive : true} : false);
   };

    this.$onDestroy = () => {
      fkUtils.body.removeEventListener("scroll", this.handleScroll);
      fkUtils.rafId = null;
    };

    $scope.$on('$stateChangeSuccess', () => {
      let skiplink = document.getElementById('skip-to-content');

      if (skiplink) {
        skiplink.focus();
      }
    });
  }

  searchOpened() {
    this.$element.addClass('search-open');
  }

  searchClosed() {
    this.$element.removeClass('search-open');
  }

  menuOpenChange(menuOpen) {
    this.menuOpen = menuOpen;
  }

  openMenu(departmentId) {
    this.$scope.$broadcast('open-menu', departmentId);
  }

  goToContent() {
    let content = document.getElementById('page-content');
    if (content) {
      content.focus();
    }
  }

  enable() {
    let atpAlert = document.querySelector('.atp-alert');
    if (atpAlert) {
      atpAlert.style.display = 'none';
    }
    
    var myEl = angular.element(document.querySelector('.account-menu'));
      myEl.css("display", "inline-block");
      myEl.css("position", "absolute");
      myEl.css("opacity", 1);
      myEl.css("min-width", "120px");
      myEl.css("right", "-70px");
      myEl.css("left", "auto");
      myEl.css("text-align", "left");
      myEl.css("top", "100%");
      myEl.css("margin-top", "5px");
      myEl.css("transform", "scale(1)");
      myEl.css("z-index", "100");
      myEl.css("background-color", "white");
      myEl.css("font-family", "var(--fk-font-sans-serif)");
      myEl.css("font-size", "var(--fk-font-size-small)");
      myEl.css("font-weight", "500");
      myEl.css("line-height", "2.58");
      myEl.css("letter-spacing", "1px");
      myEl.css("color", "var(--fk-color-primary-darker)");
      myEl.css("padding", "0");
      myEl.css("width", "180px");
      
      var btns = angular.element(document.querySelectorAll(".account-menu [tabindex]"));
      angular.forEach(btns, function(value){
        value.setAttribute("tabindex",0);
      });
  }
  
  disable() {
    let atpAlert = document.querySelector('.atp-alert');
    if (atpAlert) {
      atpAlert.style.display = 'block';
    }
    var myEl = angular.element(document.querySelector('.account-menu'));
      myEl.css("position", "absolute");
      myEl.css("opacity", 0);
      myEl.css("transform", "scale(0)");
      myEl.css("left", "0px");
      myEl.css("margin-top", "-var(--fk-vertical-space)");
      myEl.css("transform-origin", "50% 0");
      myEl.css("transition", "transform 350ms cubic-bezier(0.23, 1.2, 0.32, 1), opacity 350ms cubic-bezier(0.23, 1.2, 0.32, 1),-webkit-transform 350ms cubic-bezier(0.23, 1.2, 0.32, 1)");
      myEl.css("box-shadow", "absolute");
      myEl.css("position", "0px 25px 20px -20px var(--fk-color-black-a), 0px 0px 40px 0px rgba(0, 0, 0, 0.2)!important");
      var btns = angular.element(document.querySelectorAll(".account-menu [tabindex]"));
      angular.forEach(btns, function(value){
        value.setAttribute("tabindex", -1);
      });
  }
  //added newly
  // hitEnter(event) {
  //   if(event.keyCode === 13){
  //     alert("enter");
  //   }
    
  // }
}

FkHeaderCtrl.$inject = ['$scope', '$element', 'fkUtils', 'fkUserService', 'SITE'];

export default FkHeaderCtrl;
