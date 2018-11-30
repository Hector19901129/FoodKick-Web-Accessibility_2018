class FkGlobalNavService {
  constructor(API, fkUtils, fkHttp, $state, $rootScope) {
    this.API = API;
    this.fkUtils = fkUtils;
    this.fkHttp = fkHttp;
    this.$state = $state;
    this.$rootScope = $rootScope;

    this.departments = [];
    this.index = {};
    this.plantId = null;
    this.currentItem = '';

    this.loadGlobalNav();

    this.$rootScope.$on('fk-plantid-change', (ev, data) => {
      if (data && data.oldPlantId) {
        this.plantId = data && data.plantId;
        this.loadGlobalNav();
      }
    });
  }

  flatten(prev, current) {
    let name = current.name;
    let id = current.id;
    let wine = current.sections && current.sections[0] && current.sections[0].wineDepartment || false;
    let breadcrumb = current.breadcrumb ? current.breadcrumb.concat([{id: id, name: name}]) : [{id: id, name: name}];
    let categories;

    if (current.sections) {
      categories = current.sections.reduce((flattenCategories, currentSection) => flattenCategories.concat(currentSection.categories), []);
    } else {
      categories = current.categories || [];
    }

    categories.forEach(c => {
      c.breadcrumb = breadcrumb;
    });

    prev[id] = {
      id: id,
      name: name,
      children: categories.map(category => category.id),
      breadcrumb: breadcrumb,
      wine: wine,
      seo: {
        pageTitle: current.pageTitle || name + ' | FoodKick',
        seoMeta: current.seoMetaDescription || 'FoodKick has just what you need for today and tomorrow. Order now for same-day delivery!'
      }
    };
    if (current.images && current.images.length) {
      prev[id].image = current.images[0].source;
    }
    categories.reduce(this.flatten.bind(this), prev);
    return prev;
  }

  loadGlobalNav() {
    let GLOBALNAV_PROMISE = this.fkHttp({
      spinner: 'global-nav',
      method: 'GET',
      url: this.fkUtils.replaceURLParams(this.API.navigationMenu, {username: "username"})
    }).then(response => response.data.departments);

    GLOBALNAV_PROMISE
      .then(nav => nav && nav.map ? nav.map(department => department.id) : [])
      .then(departments => {
        this.departments = departments;
        return departments;
      });

    GLOBALNAV_PROMISE
      .then(nav => nav && nav.reduce ? nav.reduce(this.flatten.bind(this), {}) : {})
      .then(index => {
        this.index = index;
        return index;
      });

    this.loaded = GLOBALNAV_PROMISE.then(() => true);
  }

  getItem(id) {
    return this.index[id] || {id: '', name: '', children: [], breadcrumb: [] };
  }

  longestMenu() {
    return Math.max.apply(Math, Object.keys(this.index)
      .map(key => this.index[key].children.length));
  }

  navigateObj(itemId) {
    let stateParams = {}, state;

    stateParams.id = itemId;

    if (this.departments.indexOf(itemId) === -1) {
      state = 'browse';
    } else {
      state = 'department';
    }
    return {state: state, stateParams: stateParams};
  }

  setCurrentItem(itemId) {
    this.currentItem = itemId;
    return this.currentItem;
  }

  navigate(itemId) {
    let navigateObj = this.navigateObj(itemId);

    this.setCurrentItem(itemId);
    this.$state.go(navigateObj.state, navigateObj.stateParams);
  }

  navigateUrl(itemId) {
    let navigateObj = this.navigateObj(itemId);

    return '/' + navigateObj.state + '/' + navigateObj.stateParams.id;
  }

  getParents(itemId) {
    return this.getItem(itemId).breadcrumb;
  }

  getParentIds(itemId) {
    return this.getParents(itemId).map(parent => parent.id);
  }

}

FkGlobalNavService.$inject = ['API', 'fkUtils', 'fkHttp', '$state', '$rootScope'];

export default FkGlobalNavService;
