import fkConfirmation from './../../templates/fkConfirmation.html';

export default {
  template: fkConfirmation,
  controller: 'fkConfirmationCtrl',
  bindings: {
    title: '@',
    message: '@',
    buttons: '<',
    confirm: '<'
  }
};
