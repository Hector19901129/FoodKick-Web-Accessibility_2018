class FkHelpMenuCtrl {
  constructor($scope, fkBoldChatService) {
    this.$scope = $scope;
    this.fkBoldChatService = fkBoldChatService;

    $scope.state = 'help.detail';

    $scope.triggerChat = () => fkBoldChatService.triggerChat();
  }
}

FkHelpMenuCtrl.$inject = ['$scope', 'fkBoldChatService'];

export default FkHelpMenuCtrl;
