import './../../css/credits.css';

class CreditsCtrl {
  constructor(pageLoaded, goBack, $scope) {
    this.pageLoaded = pageLoaded;
    this.goBack = goBack;
    $scope.goBack = goBack;
    pageLoaded();
  }
}

CreditsCtrl.$inject = ['pageLoaded', 'goBack', '$scope'];
export default CreditsCtrl;
