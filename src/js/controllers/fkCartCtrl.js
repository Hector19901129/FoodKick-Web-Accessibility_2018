class FkCartCtrl {
  constructor(fkCartService) {
    this.fkCartService = fkCartService;

    fkCartService.viewCartlines();
  }

}

FkCartCtrl.$inject = ['fkCartService'];

angular.module('fkControllers').controller('fkCartCtrl', FkCartCtrl);
