import fkPaymentMethod from './../../templates/fkPaymentMethod.html';

export default {
  template: fkPaymentMethod,
  bindings: {
    paymentMethod: '<',
    paymentValidation: '<',
    dpPayment: '<'
  }
};
