const fkHref = (fkGlobalNavService) => {
  return {
    restrict: 'A',
    link: (scope, element, attrs) => {
      if (element[0].tagName === "A") {
        if (typeof attrs.fkHref === 'string') {
          attrs.$set('href', fkGlobalNavService.navigateUrl(attrs.fkHref));
        }
      }
    }
  };
};

fkHref.$inject = ['fkGlobalNavService'];

export default fkHref;
