window.MouseSpeed.slowLimit = 1000;

const fkMouseSlow = ($parse, fkUtils) => {
  return {
    restrict: 'A',
    compile: ($element, attr) => {
      let fn = $parse(attr.fkMouseSlow, null, true);
      return (scope, element) => {
        element[0].addEventListener('mouseoverslow', event => {
          if (event.detail.mouse.direction > 75 || event.detail.mouse.direction < -75) {
            let callback = () => {
              fn(scope, {$event: event});
            };
            scope.$apply(callback);
          }
        }, fkUtils.passiveSupported ? {passive : true} : false);
        element[0].addEventListener('mousemoveslow', event => {
          if (event.detail.mouse.speed < 30) {
            let callback = () => {
              fn(scope, {$event: event});
            };
            scope.$apply(callback);
          }
        }, fkUtils.passiveSupported ? {passive : true} : false);
        element[0].addEventListener('mouseidle', event => {
          let callback = () => {
            fn(scope, {$event: event});
          };
          scope.$apply(callback);
        }, fkUtils.passiveSupported ? {passive : true} : false);
      };
    }
  };
};

fkMouseSlow.$inject = ['$parse', 'fkUtils'];

export default fkMouseSlow;
