class FkSignInButtonCtrl {
  constructor($scope, fkUserService, ngDialog, fkHttp, signinError, $state) {
    this.$scope = $scope;
    this.fkUserService = fkUserService;
    this.ngDialog = ngDialog;
    this.fkHttp = fkHttp;
    this.signinError = signinError;
    this.$state = $state;

    let httpConfig;

    $scope.signIn = (loginRequired, signup, error) => {

      if (!$scope.dialog || !$scope.dialog.id) {
        $scope.loginRequired = loginRequired;
        $scope.selected = signup ? 'signup' : 'signin';
        $scope.selectHistory = {};
        $scope.signInErrors = error;
        $scope.$emit('fk-signin-popup', {signup});

        $scope.dialog = ngDialog.open({
          templateUrl: 'templates/fkSignInPopup.html',
          appendClassName: 'fk-sign-in narrow',
          showClose: false,
          ariaRole: 'dialog',
          scope: $scope,
          preCloseCallback: () => {
            $scope.dialog = null;
          }
        });
      }
    };

    $scope.dialog = null;
    $scope.fkUserService = fkUserService;

    $scope.signInLink = (loginRequired, signup, error) => {

      if (!$scope.dialog || !$scope.dialog.id) {
        $scope.loginRequired = loginRequired;
        $scope.selected = signup ? 'signup' : 'signin';
        $scope.selectHistory = {};
        $scope.signInErrors = error;
        $scope.$emit('fk-signin-popup', { signup });

        $scope.dialog = ngDialog.open({
          templateUrl: 'templates/fkSignInPopup.html',
          appendClassName: 'fk-sign-in narrow',
          closeByDocument: false,
          showClose: false,
          closeByEscape :false,
          ariaRole: 'dialog',
          scope: $scope,
          preCloseCallback: () => {
            $scope.dialog = null;
          }
        });
      }
    };

    $scope.$on('fk-user-change', (ev, data) => {
      if (!data.user) {
        if ($state.params.type === 'signin' && fkUserService.user === null) {
          setTimeout(function() { $scope.signInLink(); }, 500);
        } else if ($state.params.type === 'createaccount' && fkUserService.user === null) {
          setTimeout(function() { $scope.signInLink(false, true); }, 500);
        }
      }
    });

    if (signinError.status !== 'OK') {
      $scope.signIn(false, false, {NOMATCH: "Oops! Your account is not currently connected. Please sign in with your email and password."});
      signinError.clear();
    }

    $scope.$on('fk-forgot-password', () => {
      ngDialog.closeAll();
      ngDialog.open({
        templateUrl: 'templates/fkForgotPasswordPopup.html',
        appendClassName: 'fk-forgot-password narrow',
        showClose: false,
        ariaRole: 'dialog',
        scope: $scope
      });
      this.$scope.$emit('fk-popup-opened', {
        name: 'fkForgotPasswordPopup',
        type: 'Info Page'
      });
    });

    $scope.$on('fk-error-ERR_SESSION_EXPIRED', (ev, data) => {
      httpConfig = data.config;
      $scope.signIn(true);
    });

    $scope.$on('fk-account-signIn', () => {
      $scope.signIn();
    });

    $scope.$on('fk-account-signUp', () => {
      $scope.signIn(false, true);
    });

    $scope.$on('fk-user-change', (ev, data) => {
      if (data.user && httpConfig) {
        fkHttp(httpConfig);
      }
      httpConfig = null;
    });

    $scope.closeAction = () => {
      if ($state.params.type === 'signin' || $state.params.type === 'createaccount'){
        $scope.dialog.close();
        $state.go('home', {}, {reload: true});
      } else {
        $scope.dialog.close();
      }
    };

    $scope.closeDialog = () => {
      $scope.closeAction();
    };
  }

}

FkSignInButtonCtrl.$inject = ['$scope', 'fkUserService', 'ngDialog', 'fkHttp', 'signinError', '$state'];

export default FkSignInButtonCtrl;
