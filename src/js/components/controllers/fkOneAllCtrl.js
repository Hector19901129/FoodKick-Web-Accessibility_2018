class FkOneAllCtrl {
  constructor() {
    this.$postLink = () => {
      this.loadOneall();
    };
  }

  loadOneall() {
    var s;
    var oneall_subdomain = 'freshdirect';
    var oa = document.createElement('script');

    oa.type = 'text/javascript';
    oa.async = true;
    oa.src = '//' + oneall_subdomain + '.api.oneall.com/socialize/library.js';
    s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(oa, s);
  }
}

export default FkOneAllCtrl;
