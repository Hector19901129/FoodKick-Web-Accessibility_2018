import './../../css/fkLogo.css';

const fkLogo = () => {
  return {
    restrict:'AE',
    templateUrl: 'templates/fkLogo.html',
    controller: ['$scope', 'fkUtils', ($scope, fkUtils) => {
      $scope.fkUtils = fkUtils;
      $scope.goToTop = fkUtils.goToTop;
    }]
  };
};

export default fkLogo;
