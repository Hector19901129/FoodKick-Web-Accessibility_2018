import fkProductCarousel from './../../templates/fkProductCarousel.html';
import './../../css/fkProductCarousel.css';

export default {
  transclude: true,
  template: fkProductCarousel,
  bindings: {
    nrOfProducts: '<',
    itemId: '<'
  },
  controller: 'fkProductCarouselCtrl'
};
