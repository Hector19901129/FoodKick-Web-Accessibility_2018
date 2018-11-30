class FkTabsCtrl {
  constructor() {
    this.tabs = [];
  }

  addTab(tab) {
    if (!this.selected && this.tabs.length === 0 || this.selected === tab.tabId) {
      this.selectTab(tab);
    }

    tab.index = this.tabs.length;
    this.tabs.push(tab);
  }

  selectTab(tab) {
    this.tabs.forEach((t) => {
      t.unselect();
    });

    tab.select();
  }

}

export default FkTabsCtrl;
