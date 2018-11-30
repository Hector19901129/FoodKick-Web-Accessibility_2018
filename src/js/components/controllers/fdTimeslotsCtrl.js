class FdTimeslotsCtrl {
  constructor($scope, fkDeliveryTimeslotService, fkOrderModifyService) {
    this.$scope = $scope;
    this.fkDeliveryTimeslotService = fkDeliveryTimeslotService;
    this.fkOrderModifyService = fkOrderModifyService;
    this.$postLink = () => {
      this.timeSlots = this.day;
    };

    let modifiedOrder = fkOrderModifyService.getModifyState();

    $scope.fkDeliveryTimeslotService = fkDeliveryTimeslotService;

    $scope.setTimeslot = (timeslot) => {
      fkDeliveryTimeslotService.setTimeslot(timeslot.id).then((response) => {
        this.setTimeslot({data: timeslot, errors: response.errors || {} });
      });
    };

    if (modifiedOrder){
      fkDeliveryTimeslotService.timeslot.weeklyTimeslot.forEach((timeslot) => {
        if (timeslot.id === modifiedOrder.cartDetail.timeslotId) {
          $scope.setTimeslot(timeslot);
        }
      });
    }
  }

}

FdTimeslotsCtrl.$inject = ['$scope', 'fkDeliveryTimeslotService','fkOrderModifyService'];

export default FdTimeslotsCtrl;
