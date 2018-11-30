class FkConfirmButtonCtrl {
  constructor($scope, ngDialog) {
    this.$scope = $scope;
    this.ngDialog = ngDialog;
    this.confirmPopup = null;

    this.action = this._action.bind(this);
  }

  _action(action) {
    if (typeof action === 'function') {
      action();
    } else {
      this.confirm(action);
    }
    this.confirmPopup.close();
  }

  openPopup() {
    this.confirmPopup = this.ngDialog.open({
      templateUrl: 'templates/fkConfirmPopup.html',
      appendClassName: 'confirm-popup narrow',
      showClose: false,
      ariaRole: 'dialog',
      scope: this.$scope
    });
  }

}

FkConfirmButtonCtrl.$inject = ['$scope', 'ngDialog'];

export default FkConfirmButtonCtrl;
