class FkTimeslotTimerService {
  constructor(fkDeliveryTimeslotService, $rootScope, $interval) {
    this.fkDeliveryTimeslotService = fkDeliveryTimeslotService;
    this.$rootScope = $rootScope;
    this.$interval = $interval;
    this.time = null;
    this.data = {};
  }

  timer (timeDown) {
    if (this.fkDeliveryTimeslotService.timeslot.selectedTimeslot) {
      this.time = this.fkDeliveryTimeslotService.timeslot.selectedTimeslot.cutoffDateDate - new Date();
      if (this.time <= 0) {
        this.$interval.cancel(timeDown);
        this.$rootScope.$broadcast('fk-delivery-timeslot-expired', {timeslot: this.fkDeliveryTimeslotService.timeslot.selectedTimeslot});
        this.data.timer = null;
        this.data.expired = 'expired';
      } else {
        this.data.timer = this.time;
        this.data.expired = null;
      }
    } else {
      this.data.timer = null;
      this.data.expired = null;
    }
    return this.data;
  }
}

FkTimeslotTimerService.$inject = ['fkDeliveryTimeslotService', '$rootScope', '$interval'];

export default FkTimeslotTimerService;
