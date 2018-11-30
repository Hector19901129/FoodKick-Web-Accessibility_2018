import fkMobileNumberForm from './../../templates/fkMobileNumberForm.html';

export default {
  template: fkMobileNumberForm,
  controller: 'fkMobileNumberFormCtrl',
  bindings: {
    phoneNumber: '<'
  }
};
