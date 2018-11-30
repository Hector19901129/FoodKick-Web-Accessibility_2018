import fdProductCarousel from './../../templates/fdProductCarousel.html';
import './../../css/fdProductCarousel.css';

export default {
  transclude: true,
  template: fdProductCarousel,
  bindings: {
    nrOfProducts: '<',
    itemId: '<'
  },
  controller: 'fdProductCarouselCtrl'
};
