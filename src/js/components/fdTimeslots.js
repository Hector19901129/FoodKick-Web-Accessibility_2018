import fdTimeslots from './../../templates/fdTimeslots.html';

export default {
  template: fdTimeslots,
  bindings: {
    day: '<',
    title: '@',
    setTimeslot: '&'
  },
  controller: 'fdTimeslotsCtrl'
};
