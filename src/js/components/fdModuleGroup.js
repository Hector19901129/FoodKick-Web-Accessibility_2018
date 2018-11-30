import fdModuleGroup from './../../templates/fdModuleGroup.html';
import './../../css/fdModuleGroup.css';

export default {
  transclude: true,
  template: fdModuleGroup,
  controller: 'fdModuleGroupCtrl',
  restrict: "A",
  bindings: {
    moduleGroup: '<',
    module: '<',
    limit: '<'
  }
};
