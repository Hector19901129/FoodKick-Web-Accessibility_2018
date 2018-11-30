class FkGlobalChatCtrl {
  constructor($scope, fkBoldChatService, $rootScope, ngDialog, fkUserService) {
    this.$scope = $scope;
    this.fkBoldChatService = fkBoldChatService;
    this.$rootScope = $rootScope;
    this.ngDialog = ngDialog;
    this.fkUserService = fkUserService;

    $scope.contactUs = () => {
      $scope.dialog = ngDialog.open({
        templateUrl: 'templates/fkContactUsPopup.html',
        appendClassName: 'fk-contact-us-popup narrow',
        showClose: false,
        ariaRole: 'dialog',
        scope: $scope
      });
    };

    $scope.triggerChat = () => {
      $rootScope.$broadcast('contactUsClose');
      fkBoldChatService.triggerChat();
    };

    $scope.openSupportMessage = () => {
      $rootScope.$broadcast('contactUsClose');
      $scope.dialog = ngDialog.open({
        templateUrl: 'templates/fkSendMessagePopup.html',
        appendClassName: 'fk-send-message-popup narrow',
        showClose: false,
        ariaRole: 'dialog',
        scope: $scope,
        preCloseCallback: () => {
          this.dialog = null;
        }

      });
    };

    $rootScope.$on('globalsendMessageClose',() => {
      if ($scope.dialog){
        $scope.dialog.close();
      }
    });


    $rootScope.$on('contactUsClose',() => {
      if ($scope.dialog){
        $scope.dialog.close();
      }
    });

    $rootScope.$on('open-contact-us',() => {
      $scope.contactUs();
    });

  }
}

FkGlobalChatCtrl.$inject = ['$scope', 'fkBoldChatService', '$rootScope', 'ngDialog', 'fkUserService'];

export default FkGlobalChatCtrl;
