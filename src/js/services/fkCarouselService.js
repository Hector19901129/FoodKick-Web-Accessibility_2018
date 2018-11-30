class FkCarouselService {
  constructor($rootScope, $q, fkUtils, fkHttp, API) {
    this.fkHttp = fkHttp;
    this.fkUtils = fkUtils;
    this.API = API;
    this.$q = $q;
    this.fkUtils = fkUtils;
    this.carouselContent = {images: []};
    this.data = null;
  }
  getData() {
    if (this.data) {
      return this.$q.when(this.data);
    }
    return this.fkHttp({
      dispatch: true,
      method: 'POST',
      url: this.API.homeFeed,
      spinner: 'homeFeed',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'X-FD-Extra-Response': 'INCLUDE_USERINFO,INCLUDE_CART,INCLUDE_PAYMENT,EXCLUDE_ADDRESS'
      },
      data: this.fkUtils.postData({
      })
    }).then((response) => {
      var data = response.data && response.data.welcomeCarouselBanners;
      this.data = data;
      return this.data;
    });
  }

  setSource(item) {
    return item.image.path;
  }

  setLine(type, url, text) {
    let openTag = "<span>";
    let closeTag = "</span>";
    if (type === "Link" && url){
      openTag = "<a href=" + url + ">";
      closeTag = "</a>";
    }
    return openTag + text + closeTag;
  }

  setHtml(item){
    let lines = [
      this.setLine('Description', null, item.description),
      this.setLine(item.linkOneType, item.linkOneURL, item.linkOneText),
      this.setLine(item.linkTwoType, item.linkTwoURL, item.linkTwoText)
    ];

    return lines.join('<br>');
  }

  setContent(item) {
    let content = {
      source: this.setSource(item),
      html: this.setHtml(item)
    };

    return content;
  }

  setCarouselItems(items) {
    this.carouselContent.images = items.map(this.setContent.bind(this));
    return this.carouselContent;
  }

  getCarouselItems(){
    return this.carouselContent;
  }

}

FkCarouselService.$inject = ['$rootScope', '$q', 'fkUtils', 'fkHttp', 'API'];

export default FkCarouselService;
