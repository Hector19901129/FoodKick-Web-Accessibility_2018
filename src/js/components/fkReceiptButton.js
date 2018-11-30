import fkReceiptButton from './../../templates/fkReceiptButton.html';
import './../../css/fkReceiptButton.css';

export default {
  template: fkReceiptButton,
  bindings: {
    onclicked: '&',
    order: '<'
  },
  controller: 'fkReceiptButtonCtrl'
};
