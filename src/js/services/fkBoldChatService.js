var DONTINJECTBOLDCHAT = window.DONTINJECTBOLDCHAT || false;

class FkBoldChatService {
  constructor() {
    this.bccbId = 0.3629552135412766;
  }

  getBoldChat() {
    if (DONTINJECTBOLDCHAT) {
      return;
    }

    window._bcvma = window._bcvma || [];
    window._bcvma.push(["setAccountID", "447701025416363034"]);
    window._bcvma.push(["setParameter", "WebsiteID", "444647496184228008"]);
    window._bcvma.push(["addStatic", {
      type: "chat",
      bdid: "444670122774590237",
      id: this.bccbId
    }]);

    var bcLoad = function() {
      if (window.bcLoaded) {
        return;
      }

      window.bcLoaded = true;
      var vms = document.createElement("script");
      vms.type = "text/javascript";
      vms.async = true;
      vms.src = ('https:' === document.location.protocol ? 'https://' : 'http://') + "vmss.boldchat.com/aid/447701025416363034/bc.vms4/vms.js";
      var s = document.getElementsByTagName('script')[0];
      s.parentNode.insertBefore(vms, s);
    };

    window.pageViewer = window.pageViewer;

    if (window.pageViewer && window.pageViewer.load) {
      window.pageViewer.load();
    } else if (document.readyState === "complete") {
      bcLoad();
    } else if (window.addEventListener) {
      window.addEventListener('load', bcLoad, false);
    } else {
      window.attachEvent('onload', bcLoad);
    }
  }

  triggerChat() {
/*    if (document.querySelector('#bc-chat-container') === null ) {
      var bcbutton = document.querySelector('.bcStatic a');
      bcbutton.click();
    }*/
  }
}

export default FkBoldChatService;
