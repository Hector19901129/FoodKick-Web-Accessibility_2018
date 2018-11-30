const fkNgEsc = () => {
    return {
        restrict: 'A',
        compile: () => {
            return (scope, element, attrs) => {
                element.bind("keydown keypress keyup", function(event) {
                    if (event.which === 27) {
                        scope.$apply(function() {
                            scope.$eval(attrs.fkNgEsc);
                        });
                        event.preventDefault();
                    }
                });
            };
        }
    };
};

export default fkNgEsc;
