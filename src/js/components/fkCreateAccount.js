import fkCreateAccount from './../../templates/fkCreateAccount.html';
import './../../css/fkCreateAccount.css';

export default {
  template: fkCreateAccount,
  bindings: {
    loginRequired: '<'
  },
  controller: 'fkCreateAccountCtrl'
};
