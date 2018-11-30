import fkSignInForm from './../../templates/fkSignInForm.html';

export default {
  template: fkSignInForm,
  bindings: {
    defaultAction: '@'
  },
  controller: 'fkSignInFormCtrl'
};
