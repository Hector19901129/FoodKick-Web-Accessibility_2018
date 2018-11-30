class FkDeliveryPassService {
  constructor(fkHttp, $log, fkUtils, API) {
    this.fkHttp = fkHttp;
    this.$log = $log;
    this.fkUtils = fkUtils;
    this.API = API;
    this.dpStatus = false;
  }

  checkResponse(response) {
    if (!response || !response.data || response.data.status === 'FAILED') {
      this.$log.warn('Error setting notification preferences');
    }
    return response;
  }

  getDpSettingsInfo() {
    return this.fkHttp({
        spinner: 'delivery-pass',
        method: 'GET',
        url: this.API.getDeliveryPassSettings
      })
      .then((response) => {
        if (response.data && response.data.deliveryPassStatus === 'Active') {
          this.dpStatus = true;
        } else {
          this.dpStatus = false;
        }
        return response;
      }).catch(function(error) {
        this.$log.error(error);
        return { error: error };
      });
  }

  setAutopayPreferences(toggle) {
    return this.fkHttp({
        spinner: 'delivery-pass',
        method: 'POST',
        url: this.API.setAutopayPreferences,
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        data: this.fkUtils.postData({ autoRenewFlag: toggle })
      })
      .then(this.checkResponse.bind(this))
      .then((response) => {
        return response;
      })
      .catch((error) => {
        this.$log.error(error);
        return { error: error };
      });
  }

  getDpPlans() {
    return this.fkHttp({
        spinner: 'delivery-pass',
        method: 'GET',
        url: this.API.getDeliveryPassPlans
      })
      .then((response) => {
        return response;
      }).catch(function(error) {
        this.$log.error(error);
        return { error: error };
      });
  }

}

FkDeliveryPassService.$inject = ['fkHttp', '$log', 'fkUtils', 'API'];

export default FkDeliveryPassService;
