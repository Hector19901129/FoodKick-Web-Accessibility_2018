import fkCarousel from './../../templates/fkCarousel.html';
import './../../css/fkCarousel.css';

export default {
  template: fkCarousel,
  bindings: {
    images: '<',
    imagestyle: '@',
    dotstyle: '@',
    autoplay: '<',
    arrowstyle: '@',
    showarrow: '<'
  },
  controller: 'fkCarouselCtrl'
};
