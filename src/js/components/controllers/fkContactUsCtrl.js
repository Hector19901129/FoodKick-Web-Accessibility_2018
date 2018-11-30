class FkContactUsCtrl {
  constructor($scope, $timeout, $state, ngDialog, fkBoldChatService) {
    this.$scope = $scope;
    this.$timeout = $timeout;
    this.$state = $state;
    this.ngDialog = ngDialog;
    this.fkBoldChatService = fkBoldChatService;

    this.piDialog = null;

    $scope.closePi = () => {
      if (this.piDialog) {
        this.piDialog.close();
      }
    };

    $scope.$on('fk-contact-us-popup', () => {
        this.contactUs();
    });

    $scope.triggerChat = () => fkBoldChatService.triggerChat();
  }

  contactUs() {
    if (!this.piDialog) {
      this.piDialog = this.ngDialog.open({
        templateUrl: 'templates/fkContactUsPopup.html',
        appendClassName: 'fk-contact-us-popup narrow',
        showClose: false,
        scope: this.$scope,
        preCloseCallback: () => {
          this.piDialog = null;
        }
      });
      this.$scope.$emit('fk-popup-opened', {
        name: 'fkContactUsPopup',
        type: 'Help'
      });
    }
  }

}

FkContactUsCtrl.$inject = ['$scope', '$timeout', '$state', 'ngDialog', 'fkBoldChatService'];

export default FkContactUsCtrl;
