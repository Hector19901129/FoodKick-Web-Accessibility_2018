class FkFeedSelectorCtrl {
  constructor(fkUtils) {
    this.fkUtils = fkUtils;

    this.body = document.getElementById('fakebody');
    this.header = document.querySelector('fk-secondary-header');
    this.stickyRef = document.querySelector('.feed-sticky-ref');
    this.feedSelector = document.querySelector('fk-feed-selector');

    this.$onInit = () => {
      this.isSticky();
      this.body.addEventListener("scroll", this.isSticky.bind(this), fkUtils.passiveSupported ? {passive : true} : false);
    };

    this.$onDestroy = () => {
      this.body.removeEventListener("scroll", this.isSticky.bind(this));
    };
  }

  changeFeed(selectedFeed) {
    let stickyRefTop = this.stickyRef.getBoundingClientRect().top;
    let headerBottom = this.header.getBoundingClientRect().bottom;

    this.body.scrollTop = this.body.scrollTop + stickyRefTop - headerBottom;
    this.feedType = selectedFeed;
  }

  isSticky() {
    if (this.feedSelector) {
      let headerBottom = this.header.getBoundingClientRect().bottom || 50;

      if (this.stickyRef) {
        if (this.stickyRef.getBoundingClientRect().top < headerBottom) {
          this.feedSelector.style.top = headerBottom + 'px';
          this.feedSelector.classList.add('sticky');
          this.stickyRef.style.height = this.feedSelector.clientHeight + 'px';
        }
        else {
          this.feedSelector.classList.remove('sticky');
          this.stickyRef.style.height = '0px';
        }
      }
    }
  }

}

FkFeedSelectorCtrl.$inject = ['fkUtils'];

export default FkFeedSelectorCtrl;
