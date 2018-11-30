import fkEmailNotificationsForm from './../../templates/fkEmailNotificationsForm.html';
import './../../css/fkEmailNotificationsForm.css';

export default {
  template: fkEmailNotificationsForm,
  bindings: {
    emailStatuses: '<'
  },
  controller: 'fkEmailNotificationsFormCtrl'
};
