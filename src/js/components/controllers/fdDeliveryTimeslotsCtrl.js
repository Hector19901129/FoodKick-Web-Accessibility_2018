class FdDeliveryTimeslotsCtrl {
  constructor($scope, fkDeliveryTimeslotService) {
    this.$scope = $scope;
    this.fkDeliveryTimeslotService = fkDeliveryTimeslotService;
    $scope.fkDeliveryTimeslotService = fkDeliveryTimeslotService;


    $scope.setTimeslot = (data, errors) => {
      this.setTimeslot({type: 'timeslot', data: data, errors: errors});
    };
  }
}

FdDeliveryTimeslotsCtrl.$inject = ['$scope', 'fkDeliveryTimeslotService'];

export default FdDeliveryTimeslotsCtrl;
