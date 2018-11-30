import fkAtcPdpTemplate from './../../templates/fkAtcPdp.html';
import './../../css/fkAtcPdp.css';

export default {
  template: fkAtcPdpTemplate,
  controller: 'fkAtcPdpCtrl',
  bindings: {
    product: '<',
    increaseQuantity: '=',
    subtotal: '<',
    onUpdate: '&',
    productQuantity: '=',
    available:'<'
  }
};
