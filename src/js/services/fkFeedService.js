class FkFeedService {
  constructor(fkHttp, $rootScope, $timeout, $q, $log, API, fkUtils, fkProductService, fkUserService, fkMetaService) {
    this.FEEDUPDATE_INTERVAL = 600 * 1000; // 10 minutes

    this.fkHttp = fkHttp;
    this.$rootScope = $rootScope;
    this.$timeout = $timeout;
    this.$q = $q;
    this.$log = $log;
    this.API = API;
    this.fkUtils = fkUtils;
    this.fkProductService = fkProductService;
    this.fkUserService = fkUserService;
    this.fkMetaService = fkMetaService;

    this.cacheKey = {
      lastUpdate: null
    };

    this.feed = {};
  }
  constructPageFeed(pageFeedResponse, config = {}){
  let plantId = config.plantId || this.fkUserService.user && this.fkUserService.user.plantId;
  pageFeedResponse = pageFeedResponse || {};
  pageFeedResponse.sections = pageFeedResponse.sections || [];
  let f = {
    title: pageFeedResponse.title,
    type: pageFeedResponse.type,
    greeting: pageFeedResponse.greeting || pageFeedResponse.sections.filter(s => (s.displayType || '').toUpperCase() === 'GREETING')[0],
    sections: pageFeedResponse.sections.filter( section => section.products && section.products.length ),
    plantId: pageFeedResponse && pageFeedResponse.plantId || plantId
  };

  if (!config.noproducts) {

    // process product objects
      if (f.sections) {
        f.sections.forEach(function (section) {
          if (section.products) {
            section.products = section.products.filter(p => p.productData && p.productData.available);
          }
        });
      }
  }

    return f;
  }
  constructPickFeed(pickFeedResponse, config = {}){
    let plantId = config.plantId || this.fkUserService.user && this.fkUserService.user.plantId;

    pickFeedResponse = pickFeedResponse || {};
    pickFeedResponse.sections = pickFeedResponse.sections || [];

    let f = {
        title: "Today's Picks", // #FKW-522 title should be Today's Picks always, no matter what is configured as title
        type: pickFeedResponse && pickFeedResponse.type,
        sections: pickFeedResponse.sections.filter( section => section.products && section.products.length || (section.displayType || '').toUpperCase() === 'SHORTBANNER'), //FKW-633 ShortBanners should be displayed
        plantId: pickFeedResponse.plantId || plantId
      };


    if (f.sections) {
      f.sections.forEach(function (section) {
        if (section.products) {
          section.products = section.products.filter(p => p.productData && p.productData.available);
        }
      });
    }

    return f;
  }
  // constructFeed(resp, config = {}) {
  //   let f = {},
  //       plantId = config.plantId || this.fkUserService.user && this.fkUserService.user.plantId;
  //
  //   resp.page = resp.page || {};
  //   resp.page.sections = resp.page.sections || [];
  //   resp.pick = resp.pick || {};
  //   resp.pick.sections = resp.pick.sections || [];
  //
  //   f.page = {
  //     title: resp.page.title,
  //     type: resp.page.type,
  //     greeting: resp.page.greeting || resp.page.sections.filter(s => (s.displayType || '').toUpperCase() === 'GREETING')[0],
  //     sections: resp.page.sections.filter( section => section.products && section.products.length ),
  //     plantId: resp.page && resp.page.plantId || plantId
  //   };
  //
  //   f.pick = {
  //     // title: resp.pick && resp.pick.title,
  //     title: resp.pick && "Today's Picks", // #FKW-522 title should be Today's Picks always, no matter what is configured as title
  //     type: resp.pick && resp.pick.type,
  //     sections: resp.pick && resp.pick.sections.filter( section => section.products && section.products.length || (section.displayType || '').toUpperCase() === 'SHORTBANNER'), //FKW-633 ShortBanners should be displayed
  //     plantId: resp.pick && resp.pick.plantId || plantId
  //   };
  //
  //   if (!config.noproducts) {
  //
  //     // process product objects
  //     ['page', 'pick'].forEach(k => {
  //       if (f[k] && f[k].sections) {
  //         f[k].sections.forEach(function (section) {
  //           if (section.products) {
  //             section.products = section.products.filter(p => p.productData && p.productData.available);
  //           }
  //         });
  //       }
  //     });
  //   }
  //
  //   return f;
  // }

  isFeedValid() {
    let plantId = this.fkUserService.user && this.fkUserService.user.plantId,
        now = new Date(),
        feed = this.feed;

    return feed &&
           this.cacheKey.lastUpdate &&
           now - this.cacheKey.lastUpdate < this.FEEDUPDATE_INTERVAL &&
           feed.pageHeader &&
           feed.pageBody &&
           feed.pickHeader &&
           feed.pickBody &&
           plantId === feed.pageHeader.plantId &&
           plantId === feed.pageBody.plantId &&
           plantId === feed.pickHeader.plantId &&
           plantId === feed.pickBody.plantId;
  }

  setSeoMetaData(pageData) {
    if (pageData) {
      this.fkMetaService.setSeo(pageData.title, pageData.seoMetaDescription);
    }
  }

  getPageHeaderFeedByFeedId(fId, config = {}) {
      let now = new Date();

      if (config.force || !this.isFeedValid()) {
        this.cacheKey.lastUpdate = now;

        return this.fkHttp({
          dispatch: false,
          method: 'POST',
          url: config.url || this.API.getPageComponent,
          headers: {'Content-Type': 'application/x-www-form-urlencoded'},
          data: this.fkUtils.postData({
            requestedDate: this.cacheKey.lastUpdate.toISOString(),
            pageType: 'FeedHead',
            feedId: fId
          })
        }).then((response) => {
          this.feed.pageHeader = this.constructPageFeed(response.data.page);
          // set SEO title and metadata
          this.setSeoMetaData(response.data.page);
          return this.feed.pageHeader;
        }).catch(function (error) {
          this.$log.error(error);
          return {
            errors: {
              general: error
            }
          };
        });
      }

      return this.$q.when(this.feed.pageHeader);
    }

    getPageBodyFeedByFeedId(fId, config = {}) {
      let now = new Date();

      if (config.force || !this.isFeedValid()) {
        this.cacheKey.lastUpdate = now;

        return this.fkHttp({
          dispatch: false,
          method: 'POST',
          url: config.url || this.API.getPageComponent,
          headers: {'Content-Type': 'application/x-www-form-urlencoded'},
          data: this.fkUtils.postData({
            requestedDate: this.cacheKey.lastUpdate.toISOString(),
            pageType: 'FeedBody',
            feedId: fId
          })
        }).then((response) => {
          this.feed.pageBody = this.constructPageFeed(response.data.page);
          return this.feed.pageBody;
        }).catch(function (error) {
          this.$log.error(error);
          return {
            errors: {
              general: error
            }
          };
        });
      }

      return this.$q.when(this.feed.pageBody);
  }

  getPageHeaderFeed(config = {}) {
    let now = new Date();
    if (config.force || !this.isFeedValid()) {
      this.cacheKey.lastUpdate = now;

      return this.fkHttp({
        dispatch: false,
        method: 'POST',
        url: config.url || this.API.getPageComponent,
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        data: this.fkUtils.postData({
          requestedDate: this.cacheKey.lastUpdate.toISOString(),
          pageType: 'FeedHead'
        })
      }).then((response) => {
        this.feed.pageHeader = this.constructPageFeed(response.data.page);
        return this.feed.pageHeader;
      }).catch(function (error) {
        this.$log.error(error);
        return {
          errors: {
            general: error
          }
        };
      });
    }

    return this.$q.when(this.feed.pageHeader);
  }

  getPageBodyFeed(config = {}) {
    let now = new Date();
    if (config.force || !this.isFeedValid()) {
      this.cacheKey.lastUpdate = now;

      return this.fkHttp({
        dispatch: false,
        method: 'POST',
        url: config.url || this.API.getPageComponent,
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        data: this.fkUtils.postData({
          requestedDate: this.cacheKey.lastUpdate.toISOString(),
          pageType: 'FeedBody'
        })
      }).then((response) => {
        this.feed.pageBody = this.constructPageFeed(response.data.page);
        return this.feed.pageBody;
      }).catch(function (error) {
        this.$log.error(error);
        return {
          errors: {
            general: error
          }
        };
      });
    }

    return this.$q.when(this.feed.pageBody);
  }

  getPickHeaderFeed(config = {}) {

    let now = new Date();

    if (config.force || !this.isFeedValid()) {
      this.cacheKey.lastUpdate = now;

      return this.fkHttp({
        dispatch: false,
        method: 'POST',
        url: config.url || this.API.getPageComponent,
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        data: this.fkUtils.postData({
          requestedDate: this.cacheKey.lastUpdate.toISOString(),
          pageType: 'TodaysPickHead'
        })
      }).then((response) => {
        this.feed.pickHeader = this.constructPickFeed(response.data.pick);
        return this.feed.pickHeader;
      }).catch(function (error) {
        this.$log.error(error);
        return {
          errors: {
            general: error
          }
        };
      });
    }
    return this.$q.when(this.feed.pickHeader);
  }
  getPickBodyFeed(config = {}) {
    let now = new Date();
    if (config.force || !this.isFeedValid()) {
      this.cacheKey.lastUpdate = now;

      return this.fkHttp({
        dispatch: false,
        method: 'POST',
        url: config.url || this.API.getPageComponent,
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        data: this.fkUtils.postData({
          requestedDate: this.cacheKey.lastUpdate.toISOString(),
          pageType: 'TodaysPickBody'
        })
      }).then((response) => {
        this.feed.pickBody = this.constructPickFeed(response.data.pick);
        return this.feed.pickBody;
      }).catch(function (error) {
        this.$log.error(error);
        return {
          errors: {
            general: error
          }
        };
      });
    }
    return this.$q.when(this.feed.pickBody);
  }
}

FkFeedService.$inject = ['fkHttp', '$rootScope', '$timeout', '$q', '$log', 'API', 'fkUtils', 'fkProductService', 'fkUserService', 'fkMetaService'];

export default FkFeedService;
