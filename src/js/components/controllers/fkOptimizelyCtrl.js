class FkOptimizelyCtrl {
  constructor($log, $window) {
    this.$log = $log;
    this.$window = $window;
    this.optimizelyId = '7837892887';

    const loadOptimizely = () => {
      if (document.getElementById('optimizely-js')) {
        $log.warn('optimizely already loaded.');
      } else {
        let script = document.createElement('script');
        script.type = 'text/javascript';
        script.id = 'optimizely-js';
        script.async = false;
        script.src = 'https://cdn-pci.optimizely.com/js/' + this.optimizelyId + '.js';

        let first = document.getElementsByTagName('script')[0];
        first.parentNode.insertBefore(script, first);

      }
    };

    this.$postLink = () => {
      loadOptimizely();
    };

  }

}

FkOptimizelyCtrl.$inject = ['$log', '$window'];

export default FkOptimizelyCtrl;
