class FkDoubleClickService {
  constructor(fkUserService, fkHttp, API, $rootScope, $window) {
    this.fkUserService = fkUserService;
    this.fkHttp = fkHttp;
    this.API = API;
    this.$rootScope = $rootScope;
    this.initialized = false;
    this.fkMainTopTargets = {
      fkdo: 0,
      tsapromo: null
    };

    // export targets
    $window.DFP_targeting = this.fkMainTopTargets;

    this.$rootScope.$on('fk-user-change', () => {
      this.fetchTargets();
    });
  }

  fetchTargets(config = {}) {
    return this.fkHttp({
      spinner: config.spinner || 'dfptargeting',
      url: this.API.adQueryParams,
      method: 'GET',
      hideErrors: config.hideErrors
    }).then((response) => {
      let qps = response && response.data && response.data.queryParams || {};

      Object.keys(qps).forEach(k => {
        this.fkMainTopTargets[k] = qps[k];
      });

      // POSSIBLE IMPROVEMENT: diff old + new target params, refresh only on changes

      this.$rootScope.$broadcast('fk-dfp-retargeting', this.fkMainTopTargets);
      this.initialized = true;
    });
  }

  getPromocode(promoCode) {
    this.fkMainTopTargets.tsapromo = promoCode && promoCode[0] && promoCode[0][0] && promoCode[0][1] && promoCode[0][0] === "tsapromo" ? promoCode[0][1] : null;
  }
}

FkDoubleClickService.$inject = ['fkUserService', 'fkHttp', 'API', '$rootScope', '$window'];

export default FkDoubleClickService;
