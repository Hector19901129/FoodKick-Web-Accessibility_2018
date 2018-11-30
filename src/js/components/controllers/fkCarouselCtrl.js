class FkCarouselCtrl {
  constructor($scope, $element, $swipe) {
    let $ctrl = this;
    this.$scope = $scope;
    this.$element = $element;
    this.$swipe = $swipe;

    this.carousel = $element.find( 'ul' )[ 0 ];
    this.autoID = 0;

    $scope.carouselIndex = 0;
    this.$postLink = () => {
      this.setupCarousel.bind($ctrl, $scope);
    };
  }

  setupCarousel(scope) {
    scope.autoMove = ( moveTo ) => {

      this.autoID = setInterval( () => {
        this.move( moveTo );

        scope.$apply(() => {
          scope.carouselIndex = moveTo;
        } );

        moveTo = moveTo + 1 > this.images.length - 1 ? 0 : moveTo + 1;

        return moveTo;
      }, +this.autoplay || 5000 );

      return this.autoID;
    };

    scope.wait = () => {
      if (this.autoID) {
        clearInterval(this.autoID);
      }
    };

    scope.reStart = () => {
      if (this.autoplay) {
        let move = scope.carouselIndex + 1 >= this.images.length ? 0 : scope.carouselIndex + 1;
        scope.autoMove( move );
      }
    };

    if (this.autoplay) {
      scope.autoMove(0);
    }
  }

  move( ind ) {
    let moveTo = -( ind * 100 ) + '%';
    angular.element( this.carousel ).css( 'margin-left', moveTo.toString() );
    this.$scope.carouselIndex = ind;
  }

  arrowMove( ind ) {
    if ( ind < 0 ) {
      this.move( this.images.length - 1 );
    } else {
      this.move( ind % this.images.length );
    }
  }

}

FkCarouselCtrl.$inject = ['$scope', '$element', '$swipe'];

export default FkCarouselCtrl;
