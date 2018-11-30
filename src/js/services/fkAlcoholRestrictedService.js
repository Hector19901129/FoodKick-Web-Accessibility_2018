class FkAlcoholRestrictedService {
  constructor(API, fkHttp) {
    this.API = API;
    this.fkHttp = fkHttp;
  }

  get() {
    return this.fkHttp({
      method: 'GET',
      url: this.API.alcoholRestricted
    });
  }
}

FkAlcoholRestrictedService.$inject = ['API', 'fkHttp'];

export default FkAlcoholRestrictedService;
