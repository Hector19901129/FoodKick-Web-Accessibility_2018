const fkTrackClick = (fkAnalyticsService) => {
  return {
    restrict: 'A',
    link: (scope, element, attrs) => {
      let params = attrs.fkTrackClick && attrs.fkTrackClick.split('|');
      element.on('click', event => {
        fkAnalyticsService.sendEvent('click', {event, params});
      });
    }
  };
};

fkTrackClick.$inject = ['fkAnalyticsService'];

export default fkTrackClick;
