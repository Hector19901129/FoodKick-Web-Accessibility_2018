class FkEmailAndPasswordService {
  constructor(fkHttp, $log, fkUtils, API) {
    this.fkHttp = fkHttp;
    this.fkUtils = fkUtils;
    this.API = API;
    this.$log = $log;
  }

  sendChanges(oldUserName, newUserName, oldPassword, newPassword) {
    return this.fkHttp({
      dispatch: true,
      spinner: 'settings',
      headers: {'Content-Type': 'application/x-www-form-urlencoded'},
      method: 'POST',
      url: this.API.changeEmailAndPassword,
      data: this.fkUtils.postData({oldUserName, newUserName, oldPassword, newPassword})
    }).then(response => response.data)
    .catch((error) => {
      this.$log.error(error);
      return {error: error};
    });
  }

  setEmailAdress(oldUserName, newUserName, oldPassword) {
    return this.sendChanges(oldUserName, newUserName, oldPassword, "");
  }

  setPassword(oldUserName, oldPassword, newPassword) {
    return this.sendChanges(oldUserName, "", oldPassword, newPassword);
  }
}

FkEmailAndPasswordService.$inject = ['fkHttp', '$log', 'fkUtils', 'API'];

export default FkEmailAndPasswordService;
