class FkPastItemsService {
  constructor(fkHttp, $log, fkUtils, API) {
    this.fkHttp = fkHttp;
    this.$log = $log;
    this.fkUtils = fkUtils;
    this.API = API;

    this.items = [];
    this.category = {
      menuBoxes: {},
      sortOptions: {}
    };
  }

  reset() {
    this.items = [];
  }

  getItems(sortId, orderAsc, preferences, departments) {
    this.category.menuBoxes.menuBoxes = [];

    return this.fkHttp({
      spinner: 'get-past-items',
      method: 'POST',
      headers: {'Content-Type': 'application/x-www-form-urlencoded'},
      data: this.fkUtils.postData({timeFrame: "timeFrameAll", sortId: sortId || "freq", tabType: "TOP_ITEMS", orderAsc: orderAsc, filterIdList: preferences, deptIdList: departments, pageSize: '100'}),
      url: this.fkUtils.replaceURLParams(this.API.getPastItems, {username: "username"})
    }).then(response => {
      if (response.data.status === 'FAILED'){
        this.$log.warn('No past items yet.');
      }
      if (response.data && response.data.items) {
        let items;
        items = response.data.items.map(item => {
          item.id = item.productData.productId;
          return item;
        });
        this.items = items;
      }
      if (response.data && response.data.sorter.data) {
        this.category.sortOptions.sortOptions = response.data.sorter.data.map(sorter => {
          if (sorter.selected) {
            this.category.sortOptions.currentOrderAsc = sorter.orderAsc;
          }
          return {
            id: sorter.sortId,
            name: sorter.name,
            selected: sorter.selected,
            orderAscending: sorter.orderAsc
          };
        });
      }

      let getItemsArray = (obj, needAll) => {
        let items = [],
            sum = 0,
            selected = false,
            keys=Object.keys(obj);
        keys.forEach(key => {
          obj[key].map(e => {
            sum = sum + e.counter;
            if (e.selected) {
              selected = true;
            }
            return items.push({
              active: !e.hiden,
              filterId: e.filter,
              hitCount: e.counter,
              id: e.filter + e.filteringUrlValue,
              name: e.name,
              selected: e.selected,
              urlParameter: e.filteringUrlValue
            });
          });
        });

        if (needAll) {
          items.unshift({
            active: '',
            filterId: '',
            hitCount: '' + sum,
            id: 'all',
            name: 'ALL',
            selected: !selected,
            urlParameter: ''
          });
        }
        return items;
      };

      if (response.data && response.data.menu && response.data.menu.DEPARTMENTS) {
        this.category.menuBoxes.menuBoxes.push({
          name: 'DEPARTMENT',
          displayType: 'SIMPLE',
          selectionType: 'SINGLE',
          boxType: 'FILTER',
          id: 'DEPARTMENTS',
          items: getItemsArray(response.data.menu.DEPARTMENTS, true)
        });
      }
      if (response.data && response.data.menu && response.data.menu.PREFERENCES && getItemsArray(response.data.menu.PREFERENCES, false).length > 0) {
        this.category.menuBoxes.menuBoxes.push({
          name: 'ONLY SHOW',
          displayType: 'SIMPLE',
          selectionType: 'MULTI',
          boxType: 'FILTER',
          id: 'PREFERENCES',
          items: getItemsArray(response.data.menu.PREFERENCES, false)
        });
      }
      if (response.data && response.data.pager && response.data.pager.itemCount) {
        this.category.productsResult = response.data.pager.itemCount;
      }

      return this.items;
    }).catch(error => {
      this.$log.error(error);
      return {error: error};
    });
  }
}

FkPastItemsService.$inject = ['fkHttp', '$log', 'fkUtils', 'API'];

export default FkPastItemsService;
