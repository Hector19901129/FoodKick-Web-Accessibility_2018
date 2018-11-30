import fdDeliveryTimeslots from './../../templates/fdDeliveryTimeslots.html';
import './../../css/fkDeliveryTimeslots.css';

export default {
  template: fdDeliveryTimeslots,
  bindings: {
    setTimeslot: '&'
  },
  transclude: true,
  controller: 'fdDeliveryTimeslotsCtrl'
};
