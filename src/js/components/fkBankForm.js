import fkBankFormTemplate from './../../templates/fkBankForm.html';
import './../../css/fkBankForm.css';

export default {
  template: fkBankFormTemplate,
  bindings: {
    defaultAction: '@',
    hideDelete: '<',
    showAddresses: '@',
    onPaymentChanged: '&',
    paymentValidation: '<',
    dpPayment: '<'
  },
  controller: 'fkBankFormCtrl'
};
