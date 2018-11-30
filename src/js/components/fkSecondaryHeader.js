import fkSecondaryHeader from './../../templates/fkSecondaryHeader.html';
import './../../css/fkSecondaryHeader.css';

export default {
  bindings: {
    showButtons: '<',
    showMenuButton: '<',
    onMenuToggle: '&'
  },
  template: fkSecondaryHeader,
  transclude: true,
  controller: 'fkSecondaryHeaderCtrl'
};
