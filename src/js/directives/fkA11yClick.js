const fkA11yClick = () => {
  return {
    restrict: 'A',
    compile: () => {
      return (scope, element) => {
        element.on('keypress', event => {
          if (event.keyCode === 32 || event.keyCode === 13) {
            element[0].click();
            event.preventDefault();
          }
        });
      };
    }
  };
};

export default fkA11yClick;
