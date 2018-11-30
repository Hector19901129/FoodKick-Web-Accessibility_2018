import fkProductCard from './../../templates/fkProductCard.html';
import './../../css/fkProductCard.css';

export default {
  template: fkProductCard,
  controller: 'fkProductCardCtrl',
  bindings: {
    product: '<',
    useLazyImg: '<',
    orientation: '@'
  }
};

