import fkSigninAtp from './../../templates/fkSigninAtp.html';
import './../../css/fkSigninAtp.css';

export default {
  template: fkSigninAtp,
  bindings: {
    dontUpdateCart: '@'
  },
  controller: 'fkSigninAtpCtrl'
};
