import './../../css/fkHelpDetail.css';

class FkHelpDetailCtrl {
  constructor($rootScope, $scope, $state, fkUtils) {
    this.$rootScope = $rootScope;
    this.$scope = $scope;
    this.$state = $state;
    this.fkUtils = fkUtils;

    this.selected = $state.params.partial;
    this.selectedSub = $state.params.subpartial;

    for ( let i = 0; i < $scope.topics.length; i++ ) {
      if ( $scope.topics[ i ].path === this.selected ) {
        let topic = $scope.topics[ i ];
        $scope.mainTitle = $scope.topics[ i ].title;

        if ( this.selectedSub !== '' ) {
          for ( let j = 0; j < topic.entries.length; j++ ) {
            if ( topic.entries[ j ].path === this.selectedSub ) {
              if (topic.entries[ j ].detail) {
                topic.entries[ j ].detail = this.changeIdToRel(topic.entries[ j ].detail);
              }
              $scope.topic = topic.entries[ j ];
              $scope.mainTitle = topic.title;
              $scope.subtitle = topic.entries[ j ].title;
            }
          }
        } else {
          $scope.topic = $scope.topics[ i ];
        }
      }
    }

    $scope.selectedSub = this.selectedSub;

    $rootScope.$broadcast( 'fk-help-details-loaded', {} );
  }

  changeIdToRel(detail) {
    return detail.replace(/ id=/g, ' rel=');
  }

  scrollToDetails(ev) {
    if (ev.target && ev.target.tagName === 'A' && ev.target.className === 'product-recall-anchor') {
      ev.preventDefault();
      let target;

      if (ev.target.hash) {
        target = document.querySelector('[rel="'+ev.target.hash.replace('#', '')+'"]');
      }

      if (target) {
        let elementToScroll,
            topOfTarget = 0,
            alertBarHeight = 0,
            mobileTitleHeight = 0,
            parentDivElement = null,
            secondaryHeaderHeight = 0,
            bp = this.fkUtils.getActiveBreakpoint();

        parentDivElement = this.findDivParent(target);

        if (bp === 'xs' || bp === 'sm') {
          elementToScroll = document.querySelector('#help-details-page .content');

          if (document.querySelector('.mobilehelpdetails .mobile-title')) {
            mobileTitleHeight = document.querySelector('.mobilehelpdetails .mobile-title').getBoundingClientRect().height;
          }
        } else {
          elementToScroll = document.getElementById('fakebody');

          if (document.querySelector('.global-alert-notice')) {
            alertBarHeight = document.querySelector('.global-alert-notice').getBoundingClientRect().height;
          }

          if (document.querySelector('fk-secondary-header')) {
            secondaryHeaderHeight = document.querySelector('fk-secondary-header').getBoundingClientRect().height;
          }
        }

        if (parentDivElement !== null) {
          topOfTarget = parentDivElement.getBoundingClientRect().top;
        } else {
          topOfTarget = target.getBoundingClientRect().top;
        }

        elementToScroll.scrollTop = elementToScroll.scrollTop + topOfTarget - alertBarHeight - secondaryHeaderHeight - mobileTitleHeight;
      }
    }
  }

  findDivParent(element) {
    if (!element || !element.parentNode || element.parentNode.tagName === 'BODY') {
      return null;
    } else if (element.parentNode.tagName === 'DIV') {
      return element.parentNode;
    }
    return this.findDivParent(element.parentNode);
  }

  goBack() {
    this.$rootScope.$broadcast( 'fk-help-main-back', {} );
    document.getElementById('fakebody').scrollTop = 0;
    this.$state.go( '^' );
  }

}

FkHelpDetailCtrl.$inject = ['$rootScope', '$scope', '$state', 'fkUtils'];

export default FkHelpDetailCtrl;
