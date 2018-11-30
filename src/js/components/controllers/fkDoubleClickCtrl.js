class FkDoubleClickCtrl {
  constructor () {
    this.loadDoubleClick();
  }

  loadDoubleClick() {
    if (!document.getElementById('gads-js')) {
      let gads = document.createElement('script'),
          node = document.getElementsByTagName('script')[0];
      gads.async = true;
      gads.id = 'gads-js';
      gads.type = 'text/javascript';
      gads.src = 'https://www.googletagservices.com/tag/js/gpt.js';
      node.parentNode.insertBefore(gads, node);
    }
  }
}

FkDoubleClickCtrl.$inject = [ '$scope', '$window', '$rootScope', 'fkDoubleClickService', 'CONFIG'];

export default FkDoubleClickCtrl;
