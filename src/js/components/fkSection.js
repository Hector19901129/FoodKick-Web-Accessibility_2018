import fkSection from './../../templates/fkSection.html';
import './../../css/fkSection.css';

export default {
  template: fkSection,
  controller: 'fkSectionCtrl',
  bindings: {
    section: '<',
    itemClass: '<',
    limit: '<',
    last: '<',
    column: '<',
    position: '<',
    useLazyImg: '<',
    type: '@'
  }
};
