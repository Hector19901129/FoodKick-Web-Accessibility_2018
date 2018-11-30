var DONTUPDATEONUSERCHANGE = window.DONTUPDATEONUSERCHANGE || false;

class FkUserService {
  constructor(fkHttp, $log, $timeout, $rootScope, API, fkUtils, fkAddressService, fkPaymentMethodService) {
    this.fkHttp = fkHttp;
    this.$log = $log;
    this.$timeout = $timeout;
    this.$rootScope = $rootScope;
    this.API = API;
    this.fkUtils = fkUtils;
    this.fkAddressService = fkAddressService;
    this.fkPaymentMethodService = fkPaymentMethodService;

    this.user = null;
    this.plantId = null;
    this.configuration = null;
    this.CaptchaList = null;

    this.$rootScope.$on('fk-dispatch-login', (ev, data) => {
      this.updateUser(data);
    });

    this.$rootScope.$on('fk-dispatch-configuration', (ev, data) => {
      this.updateConfiguration(data);
    });
  }

  handleLogin(endpoint, config) {
    config = config || {};
    let isRegister = endpoint === this.API.register;
    let headers = {'Content-Type': 'application/x-www-form-urlencoded'};
    if (!isRegister) {
      headers['X-FD-Extra-Response'] = 'INCLUDE_USERINFO,EXCLUDE_ADDRESS';
    }
    let promise = this.fkHttp({
      spinner: config.spinner || 'login',
      hideErrors: config.hideErrors,
      method: 'POST',
      dispatch: isRegister,

      url: this.fkUtils.replaceURLParams(endpoint, {
        username: config.username || config.data && config.data.username || "username"
      }),
      headers: headers,
      data: config.data || {}
    }).then((response) => {
      let responseData = response.data;
      if (!responseData || !responseData.login || responseData.login.status !== "SUCCESS") {
        this.updateUser(null);
      } else {
        this.updateUser(responseData.login);
        this.updateConfiguration(responseData.configuration);
      }
      return response.data;
    }).then((data) => {
      this.$rootScope.$broadcast('fk-user-login', {
        user: this.user,
        method: isRegister ? 'register' : 'login',
        status: data.status
      });

      return this.user || data;
    }).catch((error) => {
      this.$log.error(error);
      return {errors: {CLIENT_ERROR: error}};
    });

    return promise;
  }

  updateUser(user) {
    // plantId change check
    if (user && user.plantId !== this.plantId) {
      if (this.fkUtils.isDeveloper()) {
        this.$log.info('[plantId changed] '+this.plantId+' => '+user.plantId);
      }
      this.$rootScope.$broadcast('fk-plantid-change', {
        plantId: user.plantId,
        oldPlantId: this.plantId
      });
      this.plantId = user.plantId;
    }

    // user change check
    if (user && (!user.status || user.status === 'SUCCESS')) {

      if (!this.user || user.username !== this.user.username) {
        if (!DONTUPDATEONUSERCHANGE) {
          this.fkAddressService.getAddresses();
        }
        this.$rootScope.$broadcast('fk-user-change', {
          user: user
        });
      }

      this.user = user;
    } else {
      if (!DONTUPDATEONUSERCHANGE) {
        this.fkAddressService.reset();
      }
      this.$rootScope.$broadcast('fk-user-change', {
        user: null
      });
      this.user = null;
    }
  }

  updateConfiguration(configuration) {
    let oldCfg = this.configuration;

    this.configuration = configuration;

    if (!oldCfg ||
        this.configuration.apiCodeVersion !== oldCfg.apiCodeVersion ||
        this.configuration.storeVersion !== oldCfg.storeVersion ||
        this.configuration.middleTierUrl !== oldCfg.middleTierUrl) {
      this.$rootScope.$broadcast('fk-configuration', {
        configuration: configuration
      });
    }
  }

  login(username, password, captcha, rafclickid, rafpromocode, config) {
    config = config || {};
    config.data = this.fkUtils.postData({username: username, password: password, captchaToken: captcha, rafclickid: rafclickid, rafpromocode: rafpromocode});

    return this.handleLogin(this.API.login, config);
  }

  checkLogin(config) {
    config = config || {};

    return this.fkHttp({
      spinner: config.spinner || 'checklogin',
      url: this.API.checkLogin,
      method: 'GET',
      dispatch: true,
      hideErrors: config.hideErrors
    }).then((response) => {
      this.CaptchaList = response.data.login.displayedCaptchaList;
      return this.$timeout(() => null, 10);
    }).then(() => this.user);
  }

  logout(config) {
    config = config || {};

    if (!this.user) {
      return null;
    }

    return this.fkHttp({
      spinner: 'logout',
      method: 'POST',
      url: this.fkUtils.replaceURLParams(this.API.logout, {
        username: config.username || config.data && config.data.username || "username"
      })
    }).then(() => {
      this.$rootScope.$broadcast('fk-user-logout', {
        user: this.user
      });

      this.updateUser(null);

      return this.user;
    }).catch((error) => {
      this.updateUser(null);

      this.$log.error(error);
      return {errors: {CLIENT_ERROR: error}};
    });
  }

  register(email, password, captcha, firstname, lastname, rafclickid, rafpromocode, config) {
    config = config || {};
    config.data = this.fkUtils.postData({email: email, password: password, captchaToken: captcha, firstName: firstname || email, lastName: lastname || '@', rafclickid: rafclickid, rafpromocode: rafpromocode});

    return this.handleLogin(this.API.register, config);
  }

  getUser() {
    return this.user;
  }
}

FkUserService.$inject = ['fkHttp', '$log', '$timeout', '$rootScope', 'API', 'fkUtils', 'fkAddressService', 'fkPaymentMethodService'];

export default FkUserService;
