class FkAnalyticsLoggerCtrl {
  constructor($scope, $log, fkAnalyticsService, fkUtils) {
    this.$scope = $scope;
    this.$log = $log;
    this.fkAnalyticsService = fkAnalyticsService;
    this.fkUtils = fkUtils;

    $scope.$on('fk-analytics', (ev, data) => {
      if (fkUtils.isDeveloper()) {
        $log.info('[analytics] ' + (data.event || '???'), data.data || data);
      }
    });
  }

}

FkAnalyticsLoggerCtrl.$inject = ['$scope', '$log', 'fkAnalyticsService', 'fkUtils'];

export default FkAnalyticsLoggerCtrl;
