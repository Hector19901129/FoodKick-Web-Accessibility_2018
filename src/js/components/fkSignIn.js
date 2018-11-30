import fkSignIn from './../../templates/fkSignIn.html';
import './../../css/fkSignIn.css';

export default {
  template: fkSignIn,
  bindings: {
    loginRequired: '<',
    signInErrors: '<'
  },
  controller: 'fkSignInCtrl'
};
