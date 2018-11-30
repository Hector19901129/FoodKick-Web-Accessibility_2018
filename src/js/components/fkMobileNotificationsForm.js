import fkMobileNotificationsForm from './../../templates/fkMobileNotificationsForm.html';
import './../../css/fkMobileNotificationsForm.css';

export default {
  template: fkMobileNotificationsForm,
  bindings: {
    mobileStatuses: '<'
  },
  controller: 'fkMobileNotificationsFormCtrl'
};
