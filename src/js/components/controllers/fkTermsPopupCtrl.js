class FkTermsPopupCtrl {
  constructor($scope, $timeout, fkHttp, fkUtils, ngDialog, API) {
    this.$scope = $scope;
    this.$timeout = $timeout;
    this.fkHttp = fkHttp;
    this.fkUtils = fkUtils;
    this.ngDialog = ngDialog;
    this.API = API;

    this.tcDialog = null;

    $scope.agree = () => {
      fkHttp({
        spinner: 'terms-and-conditions',
        method: 'POST',
        dispatch: true,
        url: API.acceptTC,
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        data: fkUtils.postData({
          ackType: 'TC',
          appSource: 'FDX',
          acknowledge: 'true'
        })
      }).then(() => {
        $scope.closeTC();
      });
    };

    $scope.closeTC = () => {
      if (this.tcDialog) {
        this.tcDialog.close();
      }
    };

    $scope.$on('fk-checkout-notc', () => {
      this.showWarning();
    });

    $scope.$on('fk-user-login', (ev, data) => {
      if (data && data.user && !data.user.tcAcknowledge) {
        $timeout(() => {
          this.showWarning();
        }, 500);
      }
    });
  }

  showWarning() {
    if (!this.tcDialog) {
      this.tcDialog = this.ngDialog.open({
        templateUrl: 'templates/fkTermsPopup.html',
        appendClassName: 'fk-terms-popup',
        showClose: false,
        scope: this.$scope,
        ariaRole: 'dialog',
        preCloseCallback: () => {
          this.tcDialog = null;
        }
      });
      this.$scope.$emit('fk-popup-opened', {
        name: 'fkTermsPopup',
        type: 'Info Page'
      });
    }
  }

}

FkTermsPopupCtrl.$inject = ['$scope', '$timeout', 'fkHttp', 'fkUtils', 'ngDialog', 'API'];

export default FkTermsPopupCtrl;
