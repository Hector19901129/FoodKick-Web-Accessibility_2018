import fkCheckout from './../../templates/fkCheckout.html';
import './../../css/fkCheckout.css';
import './../../css/fdCheckout.css';

export default {
  bindings: {
    onPlaceOrder: '&'
  },
  template: fkCheckout,
  controller: 'fkCheckoutCtrl'
};
