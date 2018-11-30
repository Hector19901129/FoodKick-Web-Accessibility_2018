class FkSearchCtrl {
  constructor($scope, $location, $element, $state, fkSearchService, fkUtils) {
    this.$scope = $scope;
    this.$location = $location;
    this.$element = $element;
    this.$state = $state;
    this.fkUtils = fkUtils;
    this.fkSearchService = fkSearchService;
    $scope.search = (searchKey) => {
      $scope.searchKey = searchKey;
      $scope.suggestions = [];

      if (document.activeElement !== null) {
        document.activeElement.blur();
      }

      if (searchKey) {
        fkSearchService.newSearchKey = searchKey;
        $state.go('search', {searchKey: searchKey, page: null}, {reload: true});
        this.fkUtils.goToTop();
      }
    };

    $scope.reset = () => {
      $scope.searchKey = null;
      $scope.suggestions = [];
    };

    $scope.suggest = (searchKey) => {
      if (!searchKey){
        $scope.suggestions = [];
      } else {
        fkSearchService.autocomplete(searchKey).then((data) => {
          $scope.suggestions = data.suggestions;
        });
      }
    };

    $scope.keypress = (e) => {
      let focusable = this.focusableEls(),
          focusedEl = this.focused(focusable),
          newFocus, direction = 0;

      if (e.keyCode === 38) {
        // up

        direction = -1;
      } else if (e.keyCode === 40) {
        // down
        //
        direction = 1;
      }

      if (direction && focusable.length) {
        if (focusedEl === -1) {
          newFocus = focusable[0];
        } else {
          newFocus = focusable[(focusedEl + direction + focusable.length) % focusable.length];
        }
        newFocus.focus();
      }
    };

    $scope.$watch("searchKey", (changedSearchKey) => {
      if (document.activeElement && $element[0] && $element[0].querySelector('#fksearch') === document.activeElement){
        $scope.suggest(changedSearchKey);
      }
    });

    $scope.$on('$locationChangeSuccess', () => {
      if ($location.$$path.substring(0, 8) === '/search/') {
        let searchKey = $location.$$path.substring(8, $location.$$path.length);
        $scope.searchKey = searchKey;
      } else {
        $scope.reset();
      }
    });

    this.$postLink = () => {
      $element[0].querySelector('.search-input').focus();
    };
  }

  focusableEls() {
    return Array.from(this.$element[0].querySelectorAll('input, a'));
  }

  focused(elements) {
    return elements.indexOf(document.activeElement);
  }

}

FkSearchCtrl.$inject = ['$scope', '$location', '$element', '$state', 'fkSearchService', 'fkUtils'];

export default FkSearchCtrl;
