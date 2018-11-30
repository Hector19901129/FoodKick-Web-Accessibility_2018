class FkTimeslotsCtrl {
  constructor($scope, fkDeliveryTimeslotService, fkOrderModifyService) {
    this.$scope = $scope;
    this.fkDeliveryTimeslotService = fkDeliveryTimeslotService;
    this.fkOrderModifyService = fkOrderModifyService;

    let modifiedOrder = fkOrderModifyService.getModifyState();

    $scope.fkDeliveryTimeslotService = fkDeliveryTimeslotService;

    $scope.setTimeslot = (timeslot) => {
      fkDeliveryTimeslotService.setTimeslot(timeslot.id).then((response) => {
        this.setTimeslot({data: timeslot, errors: response.errors || {} });
      });
    };

    if (modifiedOrder){
      fkDeliveryTimeslotService.timeslot.tomorrowTimeslot.forEach((timeslot) => {
        if (timeslot.id === modifiedOrder.cartDetail.timeslotId) {
          $scope.setTimeslot(timeslot);
        }
      });
    }
  }

}

FkTimeslotsCtrl.$inject = ['$scope', 'fkDeliveryTimeslotService','fkOrderModifyService'];

export default FkTimeslotsCtrl;
