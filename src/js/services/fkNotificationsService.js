class FkNotificationsService {
  constructor(fkHttp, $log, fkUtils, API) {
    this.fkHttp = fkHttp;
    this.$log = $log;
    this.fkUtils = fkUtils;
    this.API = API;

    this.mobileStatuses = {
        mobileNumber: '',
        deliveryUpdates: false,
        orderStatus: false,
        offers: false
    };
    this.emailStatus = 'N';
  }

  resetMobileStatuses() {
    this.mobileStatuses = {
      mobileNumber: '',
      deliveryUpdates: false,
      orderStatus: false,
      offers: false
    };
  }

  resetEmailStatus() {
    this.emailStatus = 'N';
  }

  checkResponse(response) {
    if (!response || !response.data || response.data.status === 'FAILED') {
      this.$log.warn('Error setting notification preferences');
    }
    return response;
  }

  getMobilePreferences() {
    return this.fkHttp({
        spinner: 'notifications',
        method: 'GET',
        url: this.API.getMobilePreferences
      })
      .then(this.checkResponse)
      .then((response) => {
        if (response.data) {
          this.mobileStatuses.mobileNumber = response.data.mobile_number || '';
          this.mobileStatuses.deliveryUpdates = response.data.order_notices || false;
          this.mobileStatuses.orderStatus = response.data.order_exceptions || false;
          this.mobileStatuses.offers = response.data.offers || false;
        } else {
          this.resetMobileStatuses();
        }
        return this.mobileStatuses;
      }).catch((error) => {
        this.$log.error(error);
        return {error: error};
      });
  }

  contactUsInit() {
    return this.fkHttp({
        spinner: 'notifications',
        method: 'GET',
        url: this.API.contactUsInit
      })
      .then(this.checkResponse)
      .then((response) => {
        if (response.data) {
          this.contactUsInitData = response.data;
        } else {
          this.contactUsInitData ={};
          //this.resetMobileStatuses();
        }
        return this.contactUsInitData;
      }).catch((error) => {
        this.$log.error(error);
        return {error: error};
      });
  }

  getEmailPreferences() {
    return this.fkHttp({
        spinner: 'notifications',
        method: 'GET',
        url: this.API.getEmailPreferences
      })
      .then(this.checkResponse.bind(this))
      .then((response) => {
        if (response.data.email_subscribed) {
          this.emailStatus = response.data.email_subscribed;
        } else {
          this.resetEmailStatus();
        }
        return this.emailStatus;
      }).catch(function (error) {
        this.$log.error(error);
        return {error: error};
      });
  }

  setMobilePreferences(mobile_number, order_notices, order_exceptions, offers) {
    return this.fkHttp({
        spinner: 'notifications',
        method: 'POST',
        url: this.API.setMobilePreferences,
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        data: this.fkUtils.postData({mobile_number: mobile_number, order_notices: order_notices ? 'Y' : 'N', order_exceptions: order_exceptions ? 'Y' : 'N', offers: offers ? 'Y' : 'N'})
      })
      .then(this.checkResponse.bind(this))
      .catch((error) => {
        this.$log.error(error);
        return {error: error};
      });
  }

  setMobilePreferences(mobile_number, order_notices, order_exceptions, offers) {
    return this.fkHttp({
        spinner: 'notifications',
        method: 'POST',
        url: this.API.setMobilePreferences,
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        data: this.fkUtils.postData({mobile_number: mobile_number, order_notices: order_notices ? 'Y' : 'N', order_exceptions: order_exceptions ? 'Y' : 'N', offers: offers ? 'Y' : 'N'})
      })
      .then(this.checkResponse.bind(this))
      .catch((error) => {
        this.$log.error(error);
        return {error: error};
      });
  }

  setEmailPreferences(email_subscribed) {
    return this.fkHttp({
        spinner: 'notifications',
        method: 'POST',
        url: this.API.setEmailPreferences,
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        data: this.fkUtils.postData({email_subscribed: email_subscribed ? 'Y' : 'N'})
      })
      .then(this.checkResponse.bind(this))
      .catch((error) => {
        this.$log.error(error);
        return {error: error};
      });
  }


}

FkNotificationsService.$inject = ['fkHttp', '$log', 'fkUtils', 'API'];

export default FkNotificationsService;
