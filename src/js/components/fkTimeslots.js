import fkTimeslots from './../../templates/fkTimeslots.html';

export default {
  template: fkTimeslots,
  bindings: {
    day: '@',
    title: '@',
    setTimeslot: '&'
  },
  controller: 'fkTimeslotsCtrl'
};
