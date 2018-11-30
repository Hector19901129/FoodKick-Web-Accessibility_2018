class FkDeliveryTimeslotService {
  constructor ($rootScope, fkHttp, $log, $q, fkUtils, API) {
    this.$rootScope = $rootScope;
    this.fkHttp = fkHttp;
    this.$log = $log;
    this.$q = $q;
    this.fkUtils = fkUtils;
    this.API = API;

    this.timeslot = {};
  }

  setAllTimeslots(timeSlots, selectedTimeslotId, restrictions) {
    var isToday= true,
      today = new Date(),
      tomorrow = new Date(+today+24*3600*1000),
      todayTimeslot = [],
      tomorrowTimeslot = [],
      nextAvailableTimeslot = [],
      preSelectedTimeSlot = {startDate:'SELECT DELIVERY TIME'},
      selectedTimeslot = {},
      isTodayTimeslot = false,
      deliveryRestrictions = [],
      isTomorrowTimeslot = false;

      if (restrictions.length >= 1){
        restrictions.forEach((restriction) => {
          if (restriction.message){
              deliveryRestrictions.push(restriction.message);
          }
        });
      }

    if (timeSlots) {
      var presentTime = Date.now();
      timeSlots.forEach((timeslot) => {
        var date = new Date(timeslot.startDate);
        if (timeslot.id === selectedTimeslotId) {
          selectedTimeslot = timeslot;
          if (today.getDate() !== date.getDate()) {
            isToday = false;
          }
        }
        if (today.getDate() === date.getDate() && today.getMonth() === date.getMonth() && today.getFullYear() === date.getFullYear()) {
          todayTimeslot.push(timeslot);
          isTodayTimeslot = true;
        }
        if (tomorrow.getDate() === date.getDate() && tomorrow.getMonth() === date.getMonth() && tomorrow.getFullYear() === date.getFullYear()) {
          tomorrowTimeslot.push(timeslot);
          isTomorrowTimeslot = true;
        }
        if (timeslot.cutoffDateDate > presentTime && !timeslot.full && !timeslot.unavailable) {
          nextAvailableTimeslot.push(timeslot);
        }
      });
    }
    this.timeslot.todayTimeslot = todayTimeslot;
    this.timeslot.tomorrowTimeslot = tomorrowTimeslot;
    this.timeslot.selectedTimeslotId = selectedTimeslotId;
    this.timeslot.selectedTimeslot = selectedTimeslot;
    this.timeslot.preSelectedTimeSlot = preSelectedTimeSlot;
    this.timeslot.isToday = isToday;
    this.timeslot.isTodayTimeslot = isTodayTimeslot;
    this.timeslot.isTomorrowTimeslot = isTomorrowTimeslot;
    this.timeslot.deliveryRestrictions = restrictions;
    this.timeslot.nextAvailableTimeslot = nextAvailableTimeslot;
    this.$rootScope.$broadcast('timeslot-selected');
  }

  // AN-102
  unavailableTimeslotPresent() {
    let nextTs = this.timeslot.todayTimeslot[0],
        fullTs = this.timeslot.todayTimeslot.filter(ts => ts.full);

    if (nextTs && nextTs.full) {
      return "next window";
    } else if (fullTs.length > 3) {
      return "any four windows";
    } else if (fullTs.length) {
      return "any window";
    }

    return 'no';
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
          this.setAllTimeslots(response.data.timeSlots, response.data.selectedTimeslotId, response.data.restrictions);
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

FkDeliveryTimeslotService.$inject = ['$rootScope', 'fkHttp', '$log', '$q', 'fkUtils', 'API'];

export default FkDeliveryTimeslotService;
