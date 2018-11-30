import fkTabs from './../../templates/fkTabs.html';
import './../../css/fkTabs.css';

export default {
  template: fkTabs,
  transclude: true,
  bindings: {
    selected: '=',
    selectHistory: '=',
    mobile:'@'
  },
  controllerAs: 'tabs',
  controller: 'fkTabsCtrl'
};
