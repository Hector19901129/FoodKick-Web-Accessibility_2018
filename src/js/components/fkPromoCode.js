import fkPromoCode from './../../templates/fkPromoCode.html';
import './../../css/fkPromoCode.css';

export default {
  template: fkPromoCode,
  controller: 'fkPromoCodeCtrl',
  bindings: {
    dpCart: '@'
  }
};
