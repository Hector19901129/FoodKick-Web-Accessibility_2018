class FkSearchButtonCtrl {
  constructor($scope, $state, ngDialog) {
    this.$scope = $scope;
    this.$state = $state;
    this.ngDialog = ngDialog;

    $scope.$state = $state;
  }

  openSearch() {
    let dialog = this.ngDialog.open({
      template: '<fk-search class="container"></fk-search><fk-secondary-header></fk-secondary-header><fk-ngdialog-close close="closeDialog()"></fk-ngdialog-close>',
      plain: true,
      appendClassName: 'fk-search',
      showClose: false,
      scope: this.$scope,
      disableAnimation: true,
      closeByNavigation: true,
      closeByDocument: false,
      ariaRole: 'dialog',
      name: 'searchDialog'
    });
    this.$scope.$emit('fk-popup-opened', {
      name: 'fkSearch',
      type: 'Search'
    });

    this.$scope.closeDialog = () => {
      dialog.close();
    };

    dialog.closePromise.then( () => this.onClose() );

    this.onOpen();
  }

}

FkSearchButtonCtrl.$inject = ['$scope', '$state', 'ngDialog'];

export default FkSearchButtonCtrl;
