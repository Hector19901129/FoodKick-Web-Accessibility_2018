class FkReferalService {
  constructor($rootScope) {
    this.$rootScope = $rootScope;
    this.referalData = {};

    this.$rootScope.$on('fk-user-change', (ev, data) => {
      if (data.user) {
        this.reset();
      }
    });
  }

  getReferalData(referalData) {
    this.referalData.clickId = referalData.xtl_click_id;
    this.referalData.promoCode = referalData.raf_promo_code;
  }

  reset() {
    this.referalData = {};
  }
}

FkReferalService.$inject = ['$rootScope'];

export default FkReferalService;
