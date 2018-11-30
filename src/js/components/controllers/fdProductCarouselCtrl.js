class FdProductCarouselCtrl {
  constructor($rootScope, $element, fkGlobalNavService, fkUtils) {
    this.$rootScope = $rootScope;
    this.$element = $element;
    this.fkGlobalNavService = fkGlobalNavService;
    this.fkUtils = fkUtils;
    this.element = $element[0];
    this.currentPosition = 0;
    this.isFirstPage = true;
    this.isLastPage = false;
    this.checker = null;

    this.updateClass = () => {
      this.products = this.getProducts();
      this.wDim = this.getWindowDimensions();
      this.lastProduct = this.products[this.products.length - 1];
      this.isLastPage = true;

      this.checker = null;

      if (this.lastProduct) {
        this.lastProductDim = this.lastProduct.getBoundingClientRect();
        this.isLastPage = this.lastProductDim.left + this.lastProductDim.width < this.wDim.left + this.wDim.width;
      }

      this.isFirstPage = this.currentPosition === 0;

      if (!this.checker) {
        this.checker = window.requestAnimationFrame(this.updateClass);
      }
    };

    this.$onInit = () => {
      this.updateClass();
    };

    this.$onDestroy = () => {
      if (this.checker) {
        window.cancelAnimationFrame(this.checker);
      }
    };
  }

  getWindowDimensions() {
    return this.element.querySelector('ng-transclude').getBoundingClientRect();
  }

  getWindowWidth() {
    return this.getWindowDimensions().width;
  }

  getCarouselItems() {
    return this.element.querySelector('.carousel-items');
  }

  getProducts() {
    let carouselItems = this.getCarouselItems();

    if (carouselItems) {
      return [].slice.call(carouselItems.children);
    }
    return [];
  }

  getElementWidth(element) {
    let elementStyle = window.getComputedStyle(element);
    return element.clientWidth + parseFloat(elementStyle.marginLeft) + parseFloat(elementStyle.marginRight);
  }

  setPosition(e, pos) {
    e.style.marginLeft = pos + 'px';
  }

  updatePosition(direction) {
    this.carouselItems = this.getCarouselItems();
    this.products = this.getProducts();
    this.newPosition = this.currentPosition;
    this.windowWidth = this.getWindowWidth();

    if (direction < 0) {
      if (!this.isLastPage) {
        this.products.some(carouselItem => {
          this.itemWidth = this.getElementWidth(carouselItem);
          if (this.newPosition + this.itemWidth > this.windowWidth) {
            return true;
          }
          this.newPosition += this.itemWidth;
          return false;
        });
        this.currentPosition -= this.newPosition;
      }
    } else {
      this.currentPosition = Math.min(0, this.currentPosition + this.windowWidth);
    }

    this.fkUtils.lazyLoadImage();
    this.setPosition(this.carouselItems, this.currentPosition);
  }

  back() {
    this.updatePosition(1);
  }

  forward() {
    this.updatePosition(-1);
  }

  seeAll() {
    this.fkGlobalNavService.navigate(this.itemId);
  }

}

FdProductCarouselCtrl.$inject = ['$rootScope', '$element', 'fkGlobalNavService', 'fkUtils'];

export default FdProductCarouselCtrl;
