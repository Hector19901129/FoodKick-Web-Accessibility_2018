class FkHelpPagesService {
  constructor(API, fkUtils, fkHttp) {
    this.API = API;
    this.fkUtils = fkUtils;
    this.fkHttp = fkHttp;
  }

  get() {
    return this.fkHttp( {
      method: 'GET',
      url: this.fkUtils.replaceURLParams(this.API.helpPages, {
        username: "username"
      })
    });
  }
}

FkHelpPagesService.$inject = ['API', 'fkUtils', 'fkHttp'];

export default FkHelpPagesService;
