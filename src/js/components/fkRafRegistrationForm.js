import fkRafRegistrationForm from './../../templates/fkRafRegistrationForm.html';
import './../../css/fkRafRegistrationForm.css';

export default {
  template: fkRafRegistrationForm,
  bindings: {
    defaultAction: '@'
  },
  controller: 'fkRafRegistrationFormCtrl'
};
