import fkMenuTemplate from './../../templates/fkMenu.html';
import './../../css/fkMenu.css';

export default {
  bindings: {
    onNavigate: '&',
    onLeave: '&',
    onClose: '&',
    selectedElements: '<'
  },
  template: fkMenuTemplate,
  controller: 'fkMenuCtrl'
};
