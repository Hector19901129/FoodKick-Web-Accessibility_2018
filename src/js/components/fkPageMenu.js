import fkPageMenu from './../../templates/fkPageMenu.html';
import './../../css/fkPageMenu.css';

export default {
  template: fkPageMenu,
  bindings: {
    topics: '<',
    ismobile: '<',
    state: '<'
  },
  controller: 'fkPageMenuCtrl'
};
