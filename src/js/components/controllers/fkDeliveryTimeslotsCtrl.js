class FkDeliveryTimeslotsCtrl {
  constructor($scope, fkDeliveryTimeslotService) {
    this.$scope = $scope;
    this.fkDeliveryTimeslotService = fkDeliveryTimeslotService;

    $scope.fkDeliveryTimeslotService = fkDeliveryTimeslotService;

    $scope.isToday = true;
    $scope.isTomorrow = false;

    $scope.today = () => {
      $scope.isToday = true;
      $scope.isTomorrow = false;
    };

    $scope.tomorrow = () => {
      $scope.isToday = false;
      $scope.isTomorrow = true;
    };

    $scope.setTimeslot = (data, errors) => {
      this.setTimeslot({type: 'timeslot', data: data, errors: errors});
    };
  }

}

FkDeliveryTimeslotsCtrl.$inject = ['$scope', 'fkDeliveryTimeslotService'];

export default FkDeliveryTimeslotsCtrl;
