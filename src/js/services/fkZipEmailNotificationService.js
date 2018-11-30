class FkZipEmailNotificationService {
  constructor(fkHttp, $log, fkUtils, API) {
    this.fkHttp = fkHttp;
    this.$log = $log;
    this.fkUtils = fkUtils;
    this.API = API;
    this.email = '';
    this.zipCode = '';
  }

  sendEmailNotify () {
    return this.fkHttp({
        dispatch: true,
        spinner: 'settings',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        method: 'POST',
        url: this.API.zipEmailNotification,
        data: this.fkUtils.postData({ email: this.email, zipCode: this.zipCode })
      }).then(response => response.data)
      .catch(error => {
        this.$log.error(error);
        return { error: error };
      });
  }
}

FkZipEmailNotificationService.$inject = ['fkHttp', '$log', 'fkUtils', 'API'];

export default FkZipEmailNotificationService;
