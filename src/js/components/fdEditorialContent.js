import fdEditorialContent from './../../templates/fdEditorialContent.html';
import './../../css/fdEditorialContent.css';

export default {
  transclude: true,
  template: fdEditorialContent,
  controller: 'fdEditorialContentCtrl',
  bindings: {
    module: '<',
    moduleGroup: '<'
  }
};
