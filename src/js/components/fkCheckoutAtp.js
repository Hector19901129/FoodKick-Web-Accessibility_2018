import fkCheckoutAtp from './../../templates/fkCheckoutAtp.html';
import './../../css/fkCheckoutAtp.css';

export default {
  template: fkCheckoutAtp,
  bindings: {
    dontUpdateCart: '@'
  },
  controller: 'fkCheckoutAtpCtrl'
};
