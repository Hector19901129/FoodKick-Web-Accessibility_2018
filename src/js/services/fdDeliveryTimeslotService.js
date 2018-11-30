class FdDeliveryTimeslotService {
  constructor ($rootScope, fkHttp, $log, $q, fkUtils, API) {
    this.$rootScope = $rootScope;
    this.fkHttp = fkHttp;
    this.$log = $log;
    this.$q = $q;
    this.fkUtils = fkUtils;
    this.API = API;
    this.timeslot = {};
  }

  filterEmptyDays(days){
    return days.slots.length !== 0;
  }

  sortWeekDays(a, b) {
    return a.date - b.date;
  }

  setAllTimeslots(timeSlots, selectedTimeslotId) {
      var selectedTimeslot = {},
      weeklyTimeslot = [
        {id:0, name: 'Sunday', slots:[], isSelectedTimeslot:false},
        {id:1, name: 'Monday', slots:[], isSelectedTimeslot:false},
        {id:2, name: 'Tuesday', slots:[], isSelectedTimeslot:false},
        {id:3, name: 'Wednesday', slots:[], isSelectedTimeslot:false},
        {id:4, name: 'Thursday', slots:[], isSelectedTimeslot:false},
        {id:5, name: 'Friday', slots:[], isSelectedTimeslot:false},
        {id:6, name: 'Saturday', slots:[], isSelectedTimeslot:false}
      ];

    if (timeSlots) {
      timeSlots.forEach((timeslot) => {
        let date = new Date(timeslot.startDate);
        let weekday = date.getDay();
        weeklyTimeslot[weekday].slots.push(timeslot);
        if (!weeklyTimeslot[weekday].date) {
          weeklyTimeslot[weekday].date = date;
        }
        if (timeslot.id === selectedTimeslotId) {
          weeklyTimeslot[weekday].isSelectedTimeslot = true;
          selectedTimeslot = timeslot;
        }
      });
    }

    this.timeslot.weeklyTimeslot = weeklyTimeslot.filter(this.filterEmptyDays).sort(this.sortWeekDays);
    this.timeslot.selectedTimeslotId = selectedTimeslotId;
    this.timeslot.selectedTimeslot = selectedTimeslot;
    this.$rootScope.$broadcast('timeslot-selected');
  }

  getTimeslots() {
    return this.fkHttp({
        spinner: 'timeslot',
        method: 'POST',
        url: this.fkUtils.replaceURLParams(this.API.getTimeslots, {username: "username"}),
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        data: this.fkUtils.postData({source: 'IPW'})
      }).then((response) => {
        if (response.data.status === 'FAILED'){
          this.$log.warn('No timeslot yet.');
          this.timeslot = {};
        } else {
          this.setAllTimeslots(response.data.timeSlots, response.data.selectedTimeslotId);
        }
        return this.timeslot;
      }).catch((error) => {
        this.$log.error(error);
        return {error: error};
      });
  }

  setTimeslot(id) {
    return this.fkHttp({
      spinner: 'timeslot',
      method: 'GET',
      url: this.fkUtils.replaceURLParams(this.API.setTimeslot, {username: "username", id: id})
    }).then((response) => {
      if (response.data.status === 'FAILED'){
        this.$log.warn('Not set timeslot.');
      }

      var setErrors = () => {
        this.refreshTimeslotsCache();
        return {errors: response.data.errors};
      };

      return response.data.status !== 'FAILED' ? this.refreshTimeslotsCache() : setErrors();
    }).catch((error) => {
      this.$log.error(error);
      return {error: error};
    });
  }

  refreshTimeslotsCache() {
    return this.getTimeslots();
  }
}

FdDeliveryTimeslotService.$inject = ['$rootScope', 'fkHttp', '$log', '$q', 'fkUtils', 'API'];

export default FdDeliveryTimeslotService;
