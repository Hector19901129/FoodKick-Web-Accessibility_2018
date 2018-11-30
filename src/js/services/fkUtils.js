class FkUtils {
  constructor($cookies, $log, $filter, $rootScope, $timeout, ngDialog) {
    this.$cookies = $cookies;
    this.$log = $log;
    this.$filter = $filter;
    this.$timeout = $timeout;
    this.$rootScope = $rootScope;
    this.ngDialog = ngDialog;

    this.DEVKEY = 'developer';

    this.hasTouch = false;
    this.rafID = null;
    this.body = document.getElementById('fakebody');

    this.passiveSupported = false;
    this.detectPassiveListenerOption();

    this.focusElement = this.debounce(this.focusElementNow.bind(this), 200);

    // unveil set/unset developer flag
    window._setDeveloper = this.setDeveloper;
    window._unsetDeveloper = this.unsetDeveloper;

    // optimized resize event for breakpoint changes
    this.throttleEvent('resize', 'optimizedResize');
    this._lastBreakpoint = 'unknown';
    this.lazyLoadImageEventId = null;
    window.addEventListener('optimizedResize', () => {
      let bp = this.getActiveBreakpoint();

      if (bp !== this._lastBreakpoint) {
        $rootScope.$broadcast('breakpoint-change', {
          breakpoint: bp,
          oldBreakpoint: this._lastBreakpoint
        });
        this._lastBreakpoint = bp;
      }
    }, this.passiveSupported ? {passive : true} : false);

    if (!Array.from) {
      Array.from = function (object) {
        // 'use strict';
        return [].slice.call(object);
      };
    }
  }

  setDeveloper() {
    this.$cookies.put(this.DEVKEY, true);
  }

  unsetDeveloper() {
    this.$cookies.remove(this.DEVKEY);
  }

  isDeveloper() {
    return this.$cookies.get(this.DEVKEY);
  }

  debounce(func, wait, immediate) {
    var timeout;

    return function () {
      var ctx = this, args = arguments;

      var later = function () {
        timeout = null;
        if (!immediate) {
          func.apply(ctx, args);
        }
      };
      var callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) {
        func.apply(ctx, args);
      }
    };
  }

  throttleEvent(type, name, obj) {
    obj = obj || window;
    var running = false;

    var func = function() {
        if (running) { return; }
        running = true;
        requestAnimationFrame(function() {
          obj.dispatchEvent(new CustomEvent(name));
          running = false;
        });
    };
    obj.addEventListener(type, func, this.passiveSupported ? {passive : true} : false);
  }

  flattenCategoryProducts (sections = []) {
    let products = [];

    sections.forEach((section) => {
      if (section.products) {
        products = products.concat(section.products);
      }
      if (section.sections) {
        products = products.concat(this.flattenCategoryProducts(section.sections));
      }
    });

    return products;
  }

  goToTop() {
    document.getElementById('fakebody').scrollTop = 0;
  }

  slugify(text) {
    return text.toString().toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^\w\-]+/g, '')
      .replace(/\-\-+/g, '-')
      .replace(/^-+/, '')
      .replace(/-+$/, '');
  }

  params(o) {
    return Object.keys(o).map(function (k) {
      return encodeURIComponent(k) + '=' + encodeURIComponent(o[k]);
    }).join('&');
  }

  postData(o) {
    return this.params({data: JSON.stringify(o)});
  }

  getAPIEndpoint(endPoint, apiHost, config) {
    config = config || {};
    apiHost = config.noHost ? '' : window.FOODKICK_DEV && typeof window.FOODKICK_DEV.APIhost !== 'undefined' ? window.FOODKICK_DEV.APIhost : apiHost || this.getFrontendURL(null, {page: '/', pathname: ''});

    if (apiHost && endPoint && endPoint.indexOf('http') !== 0 && endPoint.indexOf('//') !== 0) {
      return apiHost.replace(/\/+$/, '') + '/' + endPoint.replace(/^\/+/, '');
    }

    return endPoint;
  }

  getFrontendURL(page, config) {
    config = config || {};
    let l = window.location;

    return l.protocol + '//' + l.host + (config.pathname === '' ? '' : config.pathname || l.pathname) + (config.page || (page ? page : l.hash));
  }

  filtersToString(filters) {
    return filters ? Object.keys(filters).map(k => {
      return k + '|' + filters[k].join(',');
    }).join(';') : '';
  }

  filtersFromString(filterString) {
    return (filterString || '').split(';').reduce((res, f) => {
      let fparts = f.split('|'),
          key = fparts[0],
          values = fparts[1].split(',');

      res[key] = values;

      return res;
    }, {});
  }

  filtersToOrdinalNumber(number) {
    if (number > 3 && number < 21) {
      return number + 'th';
    }

    switch (number % 10) {
      case 1: return number + "st";
      case 2: return number + "nd";
      case 3: return number + "rd";
      default: return number + "th";
    }
  }

  getActiveBreakpoint() {
    let el = Array.from(document.querySelectorAll('.breakpointdetect div')).filter(x => x.offsetParent)[0];

    if (el) {
      return el.className;
    }

    return 'unknown';
  }

  isBreakpointActive(breakpoint) {
    let el = document.querySelector('.breakpointdetect .'+breakpoint);
    if (el) {
      return el.offsetParent;
    }

    return false;
  }

  replaceURLParams(url, config) {
    Object.keys(config).forEach(function (k) {
      //using if clause here prevents javascript error
      if (url) {
        url = url.replace('['+k+']', config[k]);
      }
    });
    return url;
  }

  generateDate(dateTime, timeRange) {
    let date = new Date(dateTime),
        dateString = date.toDateString(),
        todayString = new Date().toDateString(),
        tomorrow = new Date(),
        tomorrowString,
        result = '';

    tomorrow.setDate(tomorrow.getDate()+1);
    tomorrowString = tomorrow.toDateString();

    if (dateString === todayString) {
      result += 'Today,';
    } else if (dateString === tomorrowString) {
      result += 'Tomorrow,';
    } else {
      result += dateString;
    }

    result += ' ' + timeRange;
    return result;
  }

  generateDay(dateTime) {
    let date = new Date(dateTime),
        dateString = date.toDateString(),
        todayString = new Date().toDateString(),
        tomorrow = new Date(),
        tomorrowString,
        result = '';

    tomorrow.setDate(tomorrow.getDate()+1);
    tomorrowString = tomorrow.toDateString();

    if (dateString === todayString) {
      result += 'Today';
    } else if (dateString === tomorrowString) {
      result += 'Tomorrow';
    } else {
      result += this.$filter('date')(date,'EEEE');
    }

    return result;
  }

  isSticky(element) {
    if (this.body.scrollTop > 40) {
      element.addClass('sticky');
    }
    else {
      element.removeClass('sticky');
    }
    this.rafID = null;
    return this.rafID;
  }

  focusElementNow(elToFocus) {
    // check if el is an actual element, fall back to id
    let el = elToFocus.focus ? elToFocus : document.getElementById(elToFocus);

    // fall back to css selector
    if (!el) {
      try {
        el = document.querySelector(elToFocus);
      } catch (e) {
        this.$log.warn(e);
      }
    }

    if (el) {
      el.focus();
    }
  }

  detectPassiveListenerOption() {
    try {
      var passiveSupported;
      var options = Object.defineProperty({}, "passive", {
        get: function() {
          passiveSupported = true;
        }
      });

      window.addEventListener("test", null, options);
      if (passiveSupported) {
        this.passiveSupported = passiveSupported;
      }
    } catch (err) {
      this.$log.warn(err);
    }
  }

  lazyLoadImage() {
    if (!this.lazyLoadImageEventId) {
      this.lazyLoadImageEventId = this.$timeout(()=>{
        this.$rootScope.$emit('lazyImg:refresh');
        this.lazyLoadImageEventId = null;
      });
    }
  }

}

FkUtils.$inject = ['$cookies', '$log', '$filter', '$rootScope', '$timeout', 'ngDialog'];

export default FkUtils;
