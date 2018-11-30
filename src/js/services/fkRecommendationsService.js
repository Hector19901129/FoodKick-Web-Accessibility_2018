class FkRecommendationsService {
  constructor(fkHttp, API, fkUtils, $rootScope, $log) {
    this.recommendations = {};
    this.fkHttp = fkHttp;
    this.API = API;
    this.fkUtils = fkUtils;
    this.$rootScope = $rootScope;
    this.$log = $log;
  }

  updateRecommendations(recId = "cart") {
    return this.fkHttp({
      method: 'GET',
      url: this.API.recommendations + recId
    }).then(response => {
      if (response.data && response.data.recommendations) {
        this.setRecommendations(recId, response.data.recommendations);
      }
    });
  }

  setRecommendations(recId, recommendations) {
    recommendations = recommendations
      .filter(r => {
        return r.products && r.products.length;
      })
      .map(r => {
        r.slug = this.fkUtils.slugify(r.title || r.id || recId).replace(/-/g, '_');
        r.products = r.products.filter(p => p);
        return r;
    });
    this.recommendations[recId] = recommendations;

    this.$rootScope.$broadcast('fk-recommendations-changed', {id: recId, recommendations: recommendations});
  }

  getRecommendations(recId = "cart") {
    return this.recommendations[recId];
  }

  getAtpRecommendations() {
    return this.fkHttp({
      method: 'GET',
      url: this.API.getAtpDetails
    }).then(response => {
    if (response.data.status === 'FAILED'){
        this.$log.warn('No unavailable data.');
      }
      return response.data;
    }).catch(error => {
      this.$log.error(error);
      return { errors: error };
    });
  }
}

FkRecommendationsService.$inject = ['fkHttp', 'API', 'fkUtils', '$rootScope', '$log'];

export default FkRecommendationsService;
