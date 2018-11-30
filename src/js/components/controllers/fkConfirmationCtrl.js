class FkConfirmationCtrl {
  constructor($scope) {
    this.$scope = $scope;

    $scope.action = action => {
      $scope.$ctrl.confirm(action);
    };

    this.defaultButtons = [
      {
        cssClass: 'button-primary',
        action: 'yes',
        label: 'Yes'
      },
      {
        cssClass: 'button-secondary',
        action: () => {},
        label: 'No'
      }
    ];
  }

}

FkConfirmationCtrl.$inject = ['$scope'];

export default FkConfirmationCtrl;
