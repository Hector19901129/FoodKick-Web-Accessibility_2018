import fkFooterLinks from './../../templates/fkFooterLinks.html';
import './../../css/fkFooterLinks.css';

export default {
  template: fkFooterLinks,
  bindings:{
    footercontent: '@'
  },
  controller: 'fkFooterLinksCtrl'
};
