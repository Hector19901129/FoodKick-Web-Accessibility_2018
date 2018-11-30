import fkIncartBadge from './../../templates/fkIncartBadge.html';
import './../../css/fkIncartBadge.css';

export default {
  template: fkIncartBadge,
  bindings: {
    product: '<'
  },
  controller: 'fkIncartBadgeCtrl'
};
