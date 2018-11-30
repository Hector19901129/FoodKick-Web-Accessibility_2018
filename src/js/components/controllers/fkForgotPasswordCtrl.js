class FkForgotPasswordCtrl {
  constructor($scope, $state, fkBoldChatService) {
    this.$scope = $scope;
    this.$state = $state;
    this.fkBoldChatService = fkBoldChatService;

    $scope.beforeSubmit = true;

    $scope.$on('fk-forgot-password-success', () => {
      $scope.beforeSubmit = false;
    });

    $scope.triggerChat = () => {
      fkBoldChatService.triggerChat();
    };

    $scope.goToHelp = () => {
      $state.go( 'help' );
    };
  }

}

FkForgotPasswordCtrl.$inject = ['$scope', '$state', 'fkBoldChatService'];

export default FkForgotPasswordCtrl;
