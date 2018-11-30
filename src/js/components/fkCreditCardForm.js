import fkCreditCardForm from './../../templates/fkCreditCardForm.html';
import './../../css/fkCreditCardForm.css';

export default {
  template: fkCreditCardForm,
  bindings: {
    defaultAction: '@',
    hideDelete: '<',
    paymentMethod: '<',
    onPaymentChanged: '&',
    paymentValidation: '<',
    dpPayment: '<'

  },
  controller: 'fkCreditCardFormCtrl'
};
