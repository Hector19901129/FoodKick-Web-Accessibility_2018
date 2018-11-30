import fkSectionMore from './../../templates/fkSectionMore.html';
import './../../css/fkSectionMore.css';

export default {
  template: fkSectionMore,
  controller: 'fkSectionMoreCtrl',
  bindings: {
    products: '<',
    channel: '<',
    location: '<',
    slug: '<',
    title: '<',
    section: '<',
    type: '<',
    module: '<'
  }
};
