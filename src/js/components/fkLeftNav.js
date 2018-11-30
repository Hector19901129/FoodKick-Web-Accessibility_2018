import fkLeftNav from './../../templates/fkLeftNav.html';
import './../../css/fkLeftNav.css';

export default {
  template: fkLeftNav,
  bindings: {
    prefix: '@',
    menuBoxes: '<',
    filterString: '<',
    categories: '<',
    filters: '<'
  },
  controller: 'fkLeftNavCtrl'
};
