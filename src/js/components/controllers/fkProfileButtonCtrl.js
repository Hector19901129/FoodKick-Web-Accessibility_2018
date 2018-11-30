class FkProfileButtonCtrl {
  constructor(fkUserService, SITE, fkUtils) {
    this.fkUserService = fkUserService;
    this.SITE = SITE;
    this.fkUtils = fkUtils;
    this.goToTop = fkUtils.goToTop;
    
  }
  hitEnter(event) {
    if(event.keyCode === 13){
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
      angular.forEach(myEl, function(value){
        value.setAttribute("aria-expanded", "true");
      });
      var btns = angular.element(document.querySelectorAll(".account-menu [tabindex]"));
      angular.forEach(btns, function(value){
        value.setAttribute("tabindex", 0);
      });
      
     
    }
    else if(event.keyCode === 27){
      
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
      angular.forEach(myEl, function(value){
        value.setAttribute("aria-expanded", "false");
      });
    }
  } 

}

FkProfileButtonCtrl.$inject = ['fkUserService', 'SITE', 'fkUtils'];

export default FkProfileButtonCtrl;
