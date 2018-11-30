class FdMetaService {
  constructor(fkGlobalNavService) {
    this.fkGlobalNavService = fkGlobalNavService;

    this.currentMetaInfo = {
      title: "Online Grocery Shopping and Grocery Delivery | FreshDirect",
      metaDescription: "FreshDirect makes online grocery shopping and delivery fast and easy. Find fresh, high quality food and meals, plus all your supermarket brand favorites."
    };

    this.metaInfo = {
      aboutus: {
        title: "About Freshdirect | Who We Are & What We Do",
        metaDescription: "At Freshdirect, we travel near and far to bring our customers the very best, right to their front doors. Learn more about why we love delivering the best food to you."
      },

      faq: {
        title: "Frequently Asked Questions | Freshdirect",
        metaDescription: "Find answers to some of our customer’s most frequently asked questions."
      },

      foodSafety: {
        title: "Freshdirect Food Safety | Storing & Handling Food Safely",
        metaDescription: "We take food safety seriously at Freshdirect. Learn how to store and handle your produce in a safe way, and keep up to date on important information."
      },

      default: {
        title: "Online Grocery Shopping and Grocery Delivery | FreshDirect",
        metaDescription: "FreshDirect makes online grocery shopping and delivery fast and easy. Find fresh, high quality food and meals, plus all your supermarket brand favorites."
      }
    };
  }

  setSeo(title, meta) {
    document.title = title;
    document.getElementsByName('description')[0].setAttribute('content', meta);
    document.getElementsByName('prerender-status-code')[0].setAttribute('content', "200");
  }

  setMetaInfo(state) {
    let title, meta;
    if (document.title && document.getElementsByName('description')[0]) {
      title = this.metaInfo.default.title;
      meta = this.metaInfo.default.metaDescription;

      if (state) {
        let navSeo = this.fkGlobalNavService.getItem(state).seo;

        if (this.metaInfo[state]) {
          title = this.metaInfo[state].title;
          meta = this.metaInfo[state].metaDescription;
        } else if (navSeo) {
          title = navSeo.pageTitle;
          meta = navSeo.seoMeta;
        }
      }

      this.setSeo(title, meta);
    }
  }
}

FdMetaService.$inject = ['fkGlobalNavService'];

export default FdMetaService;
