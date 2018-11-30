class fdDeliveryDaysCtrl {
  constructor($scope) {
    this.$scope = $scope;
    this.openedDay = false;
    this.$postLink = () => {
      this.name = this.day.name;
      this.timeSlots = this.day.slots;
      this.openedDay = this.day.isSelectedTimeslot;
    };
  }

  modifyDayStatus() {
    this.openedDay = !this.openedDay;
  }
}

fdDeliveryDaysCtrl.$inject = ['$scope'];

export default fdDeliveryDaysCtrl;
