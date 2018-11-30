import fkGlobalNav from './../../templates/fkGlobalNav.html';
import './../../css/fkGlobalNav.css';

export default {
  bindings: {
    onNavigate: '&'
  },
  template: fkGlobalNav,
  controller: 'fkGlobalNavCtrl'
};
