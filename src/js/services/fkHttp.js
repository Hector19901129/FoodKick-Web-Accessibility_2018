const fkHttpFactory = ($http, $log, $rootScope, $q, fkUtils, API, CONFIG) => {
  const SESSION_REFRESH = 1000 * 60 * 10; // 10 minutes

  let asyncDefer,
      lastResponse = 0,
      sessionInitiation = null,
      requestQueue = [];

  let hideExceptions = (errors) => {
        Object.keys(errors).forEach((k) => {
          if (k === 'ERR_SYSTEM' || errors[k].match(/^Exception:/)) {
            errors[k] = "Something went wrong.";
          }
        });

        return errors;
      },
      handleErrors = (errors, responseData, config) => {
        Object.keys(errors).forEach(errorKey => {
          let ek = errorKey.replace(/[^\w]/g, '');
          $log.warn('API error ['+ek+']: '+errors[errorKey]);
          $rootScope.$broadcast('fk-error', { key: ek, originalKey: errorKey, error: errors[errorKey], responseData: responseData, config: config });
          $rootScope.$broadcast('fk-error-'+ek, { key: ek, originalKey: errorKey, error: errors[errorKey], responseData: responseData, config: config });
        });
      },
      fkHttp = (config = {}) => {
        // set custom header for FK backend
        config.headers = config.headers || {};
        // if X-FD-Extra-Response is not in the config header, set the default value.
        if (!config.headers['X-FD-Extra-Response']) {
          config.headers['X-FD-Extra-Response'] = 'INCLUDE_USERINFO,INCLUDE_CART,INCLUDE_FEEDS,INCLUDE_PAYMENT,EXCLUDE_ADDRESS';
        }

        // store element to focus after response
        config.elementToFocus = typeof config.elementToFocus !== 'undefined' ? config.elementToFocus : document.activeElement && document.activeElement.id;

        // preprend API host
        config.url = fkUtils.getAPIEndpoint(config.url, API.APIhost || CONFIG.APIhost, config);

        // start spinner
        document.body.setAttribute('network-spinner' + (config.spinner ? '-' + config.spinner : ''), '');
        let httpRequest;
        if (config.async !== false) {
          httpRequest = $http(config);
        } else if (!asyncDefer) {
          asyncDefer = $q.defer();
          httpRequest = $http(config);
          httpRequest.then(asyncDefer.resolve);
        } else {
          httpRequest = asyncDefer.promise.then($http.bind(null, config));
          if (config.last) {
            asyncDefer = null;
          }
        }
        return httpRequest.then((response) => {

          lastResponse = +new Date();

          document.body.removeAttribute('network-spinner' + (config.spinner ? '-' + config.spinner : ''));

          if (config.elementToFocus) {
            fkUtils.focusElement(config.elementToFocus);
          }

          if (response.data && response.data.errors) {
            response.data.errors = hideExceptions(response.data.errors);
          }

          if (!config.hideErrors && response.data && response.data.errors && Object.keys(response.data.errors).length) {
            handleErrors(response.data.errors, response.data, config);
          }

          if (config.dispatch && response.data) {
            Object.keys(response.data).forEach(k => {
              $rootScope.$broadcast('fk-dispatch-'+k, response.data[k]);
            });
          }

          return response;
        }).catch((error) => {
          let errors = error.data && error.data.errors && hideExceptions(error.data.errors);

          document.body.removeAttribute('network-spinner' + (config.spinner ? '-' + config.spinner : ''));

          if (config.elementToFocus) {
            fkUtils.focusElement(config.elementToFocus);
          }

          $log.warn('Error during API call: ', error);
          return {
            error: error,
            data: {
              errors: errors || {NETWORK_ERROR: error.statusText || error.status === -1 ? 'Network error. Try again later.': error}
            }
          };
        });
      },
      playQueuedRequests = () => {
        requestQueue.forEach(rq => {
          $log.info('Starting deferred request', rq.config.url);
          fkHttp(rq.config).then(response => {
            rq.deferred.resolve(response);
          }).catch(e => {
            rq.deferred.reject(e);
          });
        });

        requestQueue = [];
      },
      queueHttpRequest = (config = {}) => {
        let now = +new Date();

        if (now - lastResponse > SESSION_REFRESH) {
          let deferred = $q.defer();

          requestQueue.push({
            config,
            deferred
          });

          if (!sessionInitiation) {
            sessionInitiation = fkHttp({
              spinner: config.spinner || 'checklogin',
              url: API.initSession,
              method: 'GET',
              dispatch: true,
              hideErrors: true
            }).then(resp => {
              sessionInitiation = null;

              if (resp.error) {
                $log.error('Error during session initiation', resp.error);
              } else {
                // start requests waiting in the queue
                playQueuedRequests();
              }
            });
          }

          return deferred.promise;
        }
        return fkHttp(config);
      },
      getRequestQueueData = () => {
        return {
          playQueuedRequests,
          requestQueue,
          lastResponse
        };
      };

  queueHttpRequest.getRequestQueueData = getRequestQueueData;

  if (fkUtils.isDeveloper()) {
    window.FoodKick = window.FoodKick || {};
    window.FoodKick.fkHttp = queueHttpRequest;
  }

  return queueHttpRequest;
};

fkHttpFactory.$inject = ['$http', '$log', '$rootScope', '$q', 'fkUtils', 'API', 'CONFIG'];

export default fkHttpFactory;
