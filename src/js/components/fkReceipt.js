import fkReceipt from './../../templates/fkReceipt.html';
import './../../css/fkReceipt.css';

export default {
  template: fkReceipt,
  bindings: {
    orderId: '<'
  },
  controller: 'fkReceiptCtrl'
};
