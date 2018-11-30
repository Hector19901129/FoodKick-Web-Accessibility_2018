import fkTab from './../../templates/fkTab.html';

export default {
  template: fkTab,
  transclude: true,
  require: {
    tabs: '^fkTabs'
  },
  bindings: {
    tabId: '@'
  },
  controllerAs: 'tab',
  controller: 'fkTabCtrl'
};
