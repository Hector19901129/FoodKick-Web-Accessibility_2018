const fkChange = ($parse) => {
  return {
    restrict: 'A',
    compile: ($element, attr) => {
      let fn = $parse(attr.fkChange, null, true);
      return (scope, element) => {
        element.on('change', event => {
          let callback = () => {
            fn(scope, {$event: event});
          };
          scope.$apply(callback);
        });
      };
    }
  };
};

fkChange.$inject = ['$parse'];

export default fkChange;
