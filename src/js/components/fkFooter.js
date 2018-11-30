import fkFooterTemplate from './../../templates/fkFooter.html';

export default {
  template: fkFooterTemplate,
  bindings: {
    footerContent: '@'
  },
  controller: 'fkFooterCtrl'
};
