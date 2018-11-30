import fdSection from './../../templates/fdSection.html';
import './../../css/fdSection.css';

export default {
  template: fdSection,
  controller: 'fdSectionCtrl',
  bindings: {
    moduleGroup: '<',
    module: '<',
    moduleType: '<',
    itemClass: '<',
    limit: '<',
    type: '@',
    products: '<'
  }
};
