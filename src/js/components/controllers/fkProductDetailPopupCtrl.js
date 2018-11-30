class FkProductDetailPopupCtrl {
  constructor($rootScope, $scope, fkProductDetailService, ngDialog, SITE, fkUtils) {
    this.$rootScope = $rootScope;
    this.$scope = $scope;
    this.fkProductDetailService = fkProductDetailService;
    this.ngDialog = ngDialog;
    this.SITE = SITE;
    this.fkUtils = fkUtils;
    this.ismobile = this.decideIsMobile(fkUtils.getActiveBreakpoint());

    this.pdpPopup = null;

    $rootScope.$on('fk-pdp-open', ($event, data) => {
      if (data && data.product && data.pdpFeedType) {
        fkProductDetailService.product = data.product;
        fkProductDetailService.pdpFeedType = data.pdpFeedType;
        this.pdpOpen();
      }
    });

    $rootScope.$on('fk-pdp-close', () => {
      if (this.pdpPopup){
        this.pdpPopup.close();
      }
    });

    $rootScope.$on('ngDialog.opened', (e, $dialog) => {
      let alertBar = document.querySelector('fk-modify-bar div');
      if (this.pdpPopup && alertBar && this.pdpPopup.id === $dialog.attr('id')) {
        let alertBarBottom = alertBar.getBoundingClientRect().bottom;
        if (this.ismobile) {
          document.querySelector('.ngdialog-overlay').style.top = alertBarBottom + 'px';
          document.querySelector('.ngdialog-content').style.top = alertBarBottom + 'px';
        }
      }
    });
  }

  pdpOpen() {
    this.usq = null;
    this.content = null;

    if (this.fkProductDetailService.product && this.fkProductDetailService.product.productData) {
      this.usq = this.fkProductDetailService.product.productData.usq;
    }
    this.icon = this.usq ? 'fd-bottle' : this.SITE.Logo;
    this.content = this.usq ? '<span><b>WINES</b>&SPIRITS</span>' : '';

    let appendClass = 'fk-pdp';
    if (document.querySelector('fk-modify-bar div')) {
      appendClass = "fk-pdp modify-bar-active";
    }

    if (!this.pdpPopup) {
      this.pdpPopup = this.ngDialog.open({
        template: '<fk-product-details class="container"></fk-product-details><fk-ngdialog-close icon="{{$ctrl.icon}}" close="closeThisDialog()">' + this.content + '</fk-ngdialog-close>',
        plain: true,
        closeByNavigation: true,
        appendClassName: appendClass,
        showClose: false,
        ariaRole: 'dialog',
        scope: this.$scope,
        preCloseCallback: () => {
          this.pdpPopup = null;
        }
      });
      this.$scope.$emit('fk-pdp-opened');
    }
  }

  decideIsMobile (bp) {
    return bp === 'xs' || bp === 'sm';
  }
}

FkProductDetailPopupCtrl.$inject = ['$rootScope', '$scope', 'fkProductDetailService', 'ngDialog', 'SITE', 'fkUtils'];

export default FkProductDetailPopupCtrl;
