import fkHelpMenu from './../../templates/fkHelpMenu.html';
import './../../css/fkHelpMenu.css';

export default {
  template: fkHelpMenu,
  bindings: {
    topics: '<',
    ismobile: '<'
  },
  controller: 'fkHelpMenuCtrl'
};
