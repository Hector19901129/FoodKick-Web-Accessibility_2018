import fkForm from './../../templates/fkForm.html';
import './../../css/fkForm.css';

export default {
  template: fkForm,
  transclude: true,
  controller: 'fkFormCtrl',
  bindings: {
    formDescriptor: '<',
    formData: '=',
    defaultAction: '@'
  }
};
