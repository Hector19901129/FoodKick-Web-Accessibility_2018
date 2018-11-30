import fkNgdialogClose from './../../templates/fkNgdialogClose.html';
import './../../css/fkNgdialogClose.css';

export default {
  template: fkNgdialogClose,
  transclude: true,
  bindings: {
    content: '@',
    icon: '@',
    close: '&'
  },
  controller: 'fkNgdialogCloseCtrl'
};
