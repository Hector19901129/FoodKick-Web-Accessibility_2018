class FkHelpOptionsCtrl {
  constructor($scope, fkBoldChatService, ngDialog, $rootScope) {
    this.$scope = $scope;
    this.fkBoldChatService = fkBoldChatService;
    this.ngDialog = ngDialog;
    this.$rootScope = $rootScope;

    $scope.triggerChat = () => fkBoldChatService.triggerChat();

    $scope.sendMessage = () => {
      $scope.dialog = ngDialog.open({
        templateUrl: 'templates/fkSendMessagePopup.html',
        appendClassName: 'fk-send-message-popup narrow',
        showClose: false,
        ariaRole: 'dialog',
        scope: $scope
      });
      this.$scope.$emit('fk-popup-opened', {
        name: 'fkSendMessagePopup',
        type: 'Help'
      });
    };

    $rootScope.$on('sendMessageClose',() => {
      if ($scope.dialog){
        $scope.dialog.close();
      }
    });

    $rootScope.$on('sendMessage', () => {
      $scope.sendMessage();
    });

  }
}

FkHelpOptionsCtrl.$inject = ['$scope', 'fkBoldChatService', 'ngDialog', '$rootScope'];

export default FkHelpOptionsCtrl;
