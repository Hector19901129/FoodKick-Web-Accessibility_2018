import fkQuantityDropDownSelector from './../../templates/fkQuantityDropDownSelector.html';
import './../../css/fkQuantityDropDownSelector.css';

export default {
  template: fkQuantityDropDownSelector,
  controller: 'fkQuantityDropDownSelectorCtrl',
  bindings: {
    prefix: '<',
    product: '<',
    quantity: '=',
    min: '<',
    max: '<',
    inc: '<',
    emitEvent: '<',
    price: '<',
    available: '<'
  }
};
