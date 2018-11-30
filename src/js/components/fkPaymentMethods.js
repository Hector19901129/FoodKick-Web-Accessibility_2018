import fkPaymentMethods from './../../templates/fkPaymentMethods.html';
import './../../css/fkPaymentMethods.css';

export default {
  template: fkPaymentMethods,
  controller: 'fkPaymentMethodsCtrl',
  bindings: {
    showEdit: '@',
    paymentType: '@',
    title: '@',
    buttonTitle: '@',
    setPayment: '&',
    paymentValidation: '<',
    source: '@',
    dpPayment: '@'
  }
};
