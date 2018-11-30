import fkFormField from './../../templates/fkFormField.html';

export default {
  template: fkFormField,
  controllerAs: '$c',
  controller: 'fkFormFieldCtrl',
  bindings: {
    form: '<',
    fkFormCtrl: '<',
    formId: '<',
    descriptor: '<',
    data: '='
  }
};
