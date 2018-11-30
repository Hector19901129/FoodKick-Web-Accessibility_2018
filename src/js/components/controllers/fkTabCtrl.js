class FkTabCtrl {
  constructor($element) {
    this.$element = $element;
    this.selected = null;

    this.$postLink = () => {
      let heading = $element.find('fk-tabheading').remove();

      this.heading = heading.length ? heading.html() : $element.attr('tabheading');
      this.tabs.addTab(this);
    };
  }

  select() {
    this.selected = true;
    this.$element.attr('selected', true);
    this.tabs.selected = this.tabId;
    if (this.tabs.selectHistory) {
      this.tabs.selectHistory[this.tabId] = true;
    }
  }

  unselect() {
    this.selected = false;
    this.$element.attr('selected', null);
  }

}

FkTabCtrl.$inject = ['$element'];

export default FkTabCtrl;
