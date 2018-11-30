class FkAlcoholRestrictedCtrl {
  constructor($scope, fkAlcoholRestrictedService) {
    this.$scope = $scope;
    this.fkAlcoholRestrictedService = fkAlcoholRestrictedService;

    fkAlcoholRestrictedService.get().then((resp) => {
      $scope.pageData = resp.data['Alcohol Restrictions'];
    });
  }

}

FkAlcoholRestrictedCtrl.$inject = ['$scope', 'fkAlcoholRestrictedService'];

export default FkAlcoholRestrictedCtrl;
