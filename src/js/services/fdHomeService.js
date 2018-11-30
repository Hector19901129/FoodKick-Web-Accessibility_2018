class FdHomeService {
  constructor(fkHttp, fkUtils, API) {
    this.fkHttp = fkHttp;
    this.modules = [];
    this.API = API;
    this.fkUtils = fkUtils;
  }

  processModules(moduleConfig, moduleData) {
    Object.keys(moduleData).forEach(k => {
      let md = moduleData[k];

      if (md.products) {
        md.products = md.products.map(p => {
          return {
            productData: p
          };
        });
      }
    });
    let mcs = moduleConfig.map(mc => {
      if (mc.moduleId && mc.moduleId in moduleData) {
        mc.moduleData = moduleData[mc.moduleId];
      }
      return mc;
    });

    let mgrps = [];

    mgrps = mcs.reduce((p, c) => {
      if (c.moduleGroupTitle || c.moduleGroupTitleTextBanner || c.moduleTitle || c.moduleTitleTextBanner) {
        p.push({
          title: c.moduleGroupTitle || c.moduleTitle,
          banner: c.moduleGroupTitleTextBanner || c.moduleTitleTextBanner,
          viewAll: c.moduleGroupViewAllButtonLink || c.viewAllButtonLink,
          useViewAllPopup: c.useViewAllPopup,
          imageBanner: c.moduleGroupBanner
        });
      }

      if (c.moduleData) {
        if (p.length === 0) {
          p.push({
            title: c.moduleGroupTitle || c.moduleTitle,
            banner: c.moduleGroupTitleTextBanner || c.moduleTitleTextBanner,
            viewAll: c.moduleGroupViewAllButtonLink || c.viewAllButtonLink,
            useViewAllPopup: c.useViewAllPopup,
            imageBanner: c.moduleGroupBanner
          });

          c.dontShowTitles = true;
        }

        let modules = p[p.length-1].modules || [];

        modules.push(c);

        p[p.length-1].modules = modules;
      }

      return p;
    }, mgrps);
    return mgrps;
  }

  loadModules() {
    return this.fkHttp({
      dispatch: true,
      method: 'POST',
      spinner: 'homefeed',
      url: this.API.homeModule,
      headers: {'Content-Type': 'application/x-www-form-urlencoded'},
      data: this.fkUtils.postData({
          moduleContainerId: "ModuleContainer:currentUserModuleContainer"
      })
    }).then(response => {
      if (response.data && response.data.data) {
        this.modules = this.processModules(response.data.config, response.data.data);
      }
      return response;
    });
  }
}

FdHomeService.$inject = ['fkHttp', 'fkUtils', 'API'];

export default FdHomeService;
