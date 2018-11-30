import fdDeliveryDays from './../../templates/fdDeliveryDays.html';
import './../../css/fdDeliveryDays.css';

export default {
  bindings: {
    day: '<',
    setTimeslot: '&'
  },
  template: fdDeliveryDays,
  controller: 'fdDeliveryDaysCtrl'
};
