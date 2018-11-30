import fkQuantitySelector from './../../templates/fkQuantitySelector.html';
import './../../css/fkQuantitySelector.css';

export default {
  template: fkQuantitySelector,
  controller: 'fkQuantitySelectorCtrl',
  bindings: {
    prefix: '<',
    product: '<',
    quantity: '=',
    min: '<',
    max: '<',
    inc: '<'
  }
};
