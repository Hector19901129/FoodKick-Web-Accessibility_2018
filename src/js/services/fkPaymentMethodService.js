var PAYMENTUPDATE_INTERVAL = 600 * 1000; // TODO change this

class FkPaymentMethodService {
  constructor(fkHttp, $log, $rootScope, fkUtils, API) {
    this.fkHttp = fkHttp;
    this.$log = $log;
    this.$rootScope = $rootScope;
    this.fkUtils = fkUtils;
    this.API = API;
    this.promise = null;
    this.now = null;
    this.lastUpdate = null;
    this.selectedPaymentMethod = null;
    this.paymentMethods = {};
    this.dpFlag = false;

    this.$rootScope.$on('fk-user-change', (ev, data) => {
      if (!data.user) {
        this.promise = null;
      }
    });
  }

  reset() {
    this.selectedPaymentMethod = null;
    this.paymentMethods = [];
    this.dpFlag = false;
  }

  processPaymentResponse(response) {
    let selectedId;
    this.reset();

    if (!response || !response.data) {
      return {};
    }

    this.errorMessage = {
      errors: response.data.errors,
      status: response.data.status
    };

    if (response && response.data.status === 'FAILED') {
      return this.errorMessage;
    }

    selectedId = response.data.selectedId;

    this.paymentMethods = {
      creditCards: response.data.creditCards,
      electronicChecks: response.data.electronicChecks,
      status: response.data.status,
      defaultId: response.data.defaultId
    };

    if (selectedId) {
      this.paymentMethods.creditCards.forEach(pm => {
        if (pm.id === selectedId) {
          pm.selected = true;
          this.selectedPaymentMethod = pm;
        }
      });
      this.paymentMethods.electronicChecks.forEach(pm => {
        if (pm.id === selectedId) {
          pm.selected = true;
          this.selectedPaymentMethod = pm;
        }
      });
    }

    this.$rootScope.$broadcast('fk-payments-changed', { paymentMethods: this.paymentMethods });
    return this.paymentMethods;
  }

  setPaymentMethod(id, default_flag, dp_flag) {
    return this.fkHttp({
      method: 'POST',
      spinner: 'payment',
      url: this.API.setPaymentMethod,
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      data: this.fkUtils.postData({
        paymentMethodId: id,
        isAccountLevel: default_flag,
        dlvPassCart: dp_flag
      })
    }).then(response => {
      // update payment methods
      return this.processPaymentResponse(response);
    });
  }

  getPaymentMethods() {
    this.now = new Date();

    if (!this.promise || !this.lastUpdate || this.now - this.lastUpdate > PAYMENTUPDATE_INTERVAL) {
      this.lastUpdate = this.now;

      if (this.dpFlag) {
        this.promise = this.fkHttp({
            method: 'POST',
            spinner: 'payment',
            url: this.fkUtils.replaceURLParams(this.API.paymentMethods, { username: "username" }),
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            data: this.fkUtils.postData({
              dlvPassCart: true
            })
          }).then(response => this.processPaymentResponse(response))
          .catch((error) => {
            this.$log.error(error);
            return { error: error };
          });
      } else {

        this.promise = this.fkHttp({
            method: 'GET',
            spinner: 'payment',
            url: this.fkUtils.replaceURLParams(this.API.paymentMethods, { username: "username" })
          }).then(response => this.processPaymentResponse(response))
          .catch((error) => {
            this.$log.error(error);
            return { error: error };
          });

      }
    }
    return this.promise;
  }

  paymentMethodsRefresh() {
    return this.getPaymentMethods();
  }

  refreshPaymentMethodsCache(fetchData) {
    this.promise = null;
    return fetchData !== false ? this.getPaymentMethods() : null;

  }

  enableDpFlag(flag) {
    this.dpFlag = flag;
  }

}

FkPaymentMethodService.$inject = ['fkHttp', '$log', '$rootScope', 'fkUtils', 'API'];

export default FkPaymentMethodService;
