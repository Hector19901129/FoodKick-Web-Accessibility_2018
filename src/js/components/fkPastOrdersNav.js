import fkPastOrdersNav from './../../templates/fkPastOrdersNav.html';
import './../../css/fkPastOrdersNav.css';

export default {
  template: fkPastOrdersNav,
  bindings: {
    menuItems: '<',
    pastOrderId: '<',
    pastOrderGroup: '<'
  },
  controller: 'fkPastOrdersNavCtrl'
};
