import fkDeliveryTimeslots from './../../templates/fkDeliveryTimeslots.html';
import './../../css/fkDeliveryTimeslots.css';

export default {
  template: fkDeliveryTimeslots,
  bindings: {
    setTimeslot: '&'
  },
  transclude: true,
  controller: 'fkDeliveryTimeslotsCtrl'
};
