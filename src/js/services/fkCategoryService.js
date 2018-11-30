class FkCategoryService {
  constructor(fkHttp, $log, API, fkUtils) {
    this.fkHttp = fkHttp;
    this.$log = $log;
    this.API = API;
    this.fkUtils = fkUtils;
  }

  getCategory(categoryId, filters, sortBy, orderAscending, config = {}) {
    let data = {
      id: categoryId,
      pageType: 'BROWSE',
      pageSize: 20,
      all: typeof config.all !== 'undefined' ? config.all : true,
      aggregateCategories: typeof config.aggregateCategories !== 'undefined' ? config.aggregateCategories : true,
      activePage: config.activePage || 0,
      populateSectionsOnly : !!config.sectionsDataOnly
    };

    if (filters) {
      data.requestFilterParams = filters;
    }
    if (sortBy) {
      data.sortBy = sortBy;
    }
    if (orderAscending) {
      data.orderAscending = true;
    }

    return this.fkHttp({
      dispatch: false,
      method: 'POST',
      spinner: config.spinner || 'category',
      url: config.url || this.API.categoryData,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'X-FD-Extra-Response':'EXCLUDE_ADDRESS'
      },
      data: this.fkUtils.postData(data),
      async: config.async,
      last: config.last
    }).then((response) => {
      if (response.data.browse) {
        let category = response.data.browse;

        // flatten recursive category structure, transform products to objects w/ pPotatoes
        if (category.sections) {
          category.products = this.fkUtils.flattenCategoryProducts(category.sections.sections).map(p => { return {productData: p}; });
          if (config.onlyAvailable) {
            category.products = category.products.filter(p => p.productData && p.productData.available);
          }
        }
        this.fkUtils.goToTop();
        return category;
      }
      return null;
    }).catch((error) => {
      this.$log.error(error);
      return null;
    });
  }
}

FkCategoryService.$inject = ['fkHttp', '$log', 'API', 'fkUtils'];

export default FkCategoryService;
