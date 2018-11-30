class FkFoodSafetyService {
  constructor(fkHttp, API, $log) {
    this.fkHttp = fkHttp;
    this.API = API;
    this.$log = $log;
  }

  getFoodSafety() {
    return this.fkHttp({
      method: 'GET',
      url : this.API.foodSafety
    }).then(response => {
      return response.data;
    }).catch(error => {
      this.$log.error(error);
      return {errors: error};
    });
  }
}

FkFoodSafetyService.$inject = ['fkHttp', 'API', '$log'];

export default FkFoodSafetyService;
