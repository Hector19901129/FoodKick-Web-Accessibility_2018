class FkPromoCodeService {
  constructor(fkHttp, fkUserService, fkProductService, $rootScope, $log, $q, API, fkUtils) {
    this.fkHttp = fkHttp;
    this.fkUserService = fkUserService;
    this.fkProductService = fkProductService;
    this.$rootScope = $rootScope;
    this.$log = $log;
    this.$q = $q;
    this.API = API;
    this.fkUtils = fkUtils;
  }

  validPromoCode(promoCode, dp_flag) {
    if (!promoCode || !promoCode.length) {
      return null;
    }

    return this.fkHttp({
      spinner: 'cartline-remove',
      method: 'POST',
      url: this.fkUtils.replaceURLParams(this.API.userPromocode, {
        username: this.fkUserService.user && this.fkUserService.user.username || "username",
        promocode: promoCode
      }),
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      data: this.fkUtils.postData({
        dlvPassCart: dp_flag
      })

    }).then(response => response.data)
    .catch((error) => {
      this.$log.error(error);
      return {
        errors: { CLIENT_ERROR: error }
      };
    });
  }

  removePromoCode(promoCode, dp_flag) {
    return this.fkHttp({
      spinner: 'cartline-remove',
      method: 'POST',
      url: this.fkUtils.replaceURLParams(this.API.removePromocode, {
        username: this.fkUserService.user && this.fkUserService.user.username || "username",
        promocode: promoCode
      }),
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      data: this.fkUtils.postData({
        dlvPassCart: dp_flag
      })

    }).then(response => response.data)
    .catch((error) => {
      this.$log.error(error);
      return {
        errors: { CLIENT_ERROR: error }
      };
    });
  }
}

FkPromoCodeService.$inject = ['fkHttp', 'fkUserService', 'fkProductService', '$rootScope', '$log', '$q', 'API', 'fkUtils'];
export default FkPromoCodeService;
