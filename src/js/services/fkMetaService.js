class FkMetaService {
  constructor(fkGlobalNavService) {
    this.fkGlobalNavService = fkGlobalNavService;
    this.isHome = false;
    this.currentMetaInfo = {
      title: "Same-Day Food, Grocery + Alcohol Delivery NYC | FoodKick",
      metaDescription: "FoodKick delivers fresh food & cold alcohol for same-day delivery. Get easy meal ideas, fresh produce, home essentials, plus cold beer, wine, and spirits."
    };

    this.metaInfo = {
      aboutus: {
        title: "About FoodKick | Who We Are & What We Do",
        metaDescription: "At FoodKick, we travel near and far to bring our customers the very best, right to their front doors. Learn more about why we love delivering the best food to you."
      },

      faq: {
        title: "Frequently Asked Questions | FoodKick",
        metaDescription: "FoodKick delivers fresh food and cold alcohol for same-day delivery. Find answers to some of our customer’s most frequently asked questions."
      },

      foodSafety: {
        title: "FoodKick Food Safety | Storing & Handling Food Safely",
        metaDescription: "We take food safety seriously at FoodKick. Learn how to store and handle your produce in a safe way, and keep up to date on important information."
      },

      default: {
        title: "Same-Day Online Grocery Delivery & Alcohol Delivery - NYC | FoodKick",
        metaDescription: "FoodKick delivers fresh food & cold alcohol for same-day delivery. Get easy meal ideas, fresh produce, home essentials, plus cold beer, wine, and spirits."
      }
    };
  }

  setSeo(title, meta) {
    if (title) {
      document.title = title;
    }
    if (meta) {
      document.getElementsByName('description')[0].setAttribute('content', meta);
    }
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

FkMetaService.$inject = ['fkGlobalNavService'];

export default FkMetaService;
