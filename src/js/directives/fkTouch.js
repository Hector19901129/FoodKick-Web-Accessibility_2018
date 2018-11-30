const fkTouch = ($parse, fkUtils) => {
  return {
    restrict: 'A',
    compile: ($element, attr) => {
      let fn = $parse(attr.fkTouch, null, true);
      return (scope, element) => {
        let wasMove = false;

        element[0].addEventListener('touchmove', () => {
          wasMove = true;
        }, fkUtils.passiveSupported ? {passive : true} : false);

        element.on('touchend', event => {
          let callback = () => {
            if (!wasMove && event.target === element[0]) {
              if (!element[0].attributes['fk-touched'] || element[0].attributes['fk-touched'].value !== 'hasTouched') {
                event.preventDefault();
                event.stopPropagation();
              }
              fn(scope, {$event: event});
            }
            wasMove = false;
            Array.from(document.querySelectorAll('[fk-touched]')).forEach(el => el.removeAttribute('fk-touched'));
            element[0].setAttribute('fk-touched', 'hasTouched');
          };
          scope.$apply(callback);
        });
      };
    }
  };
};

fkTouch.$inject = ['$parse', 'fkUtils'];

export default fkTouch;
