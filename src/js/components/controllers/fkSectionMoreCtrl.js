import './../../../css/fkSectionMorePopup.css';

class FkSectionMoreCtrl {
  constructor($rootScope, $scope, $timeout, ngDialog, fkUtils) {
    this.$rootScope = $rootScope;
    this.$scope = $scope;
    this.$timeout = $timeout;
    this.ngDialog = ngDialog;
    this.fkUtils = fkUtils;
    this.sectionMoreDialog = null;

    this.isDevice = this.decideIsMobile(fkUtils.getActiveBreakpoint());

    this.$postLink = () => {
      $scope.ismobile = fkUtils.isBreakpointActive('xs') || fkUtils.isBreakpointActive('sm');
      $scope.products = this.products;
      $scope.title = this.title;
      $scope.section = this.section;
      $scope.module = this.module;
    };

    $rootScope.$on('ngDialog.opened', (e, $dialog) => {
      let alertBar = document.querySelector('fk-modify-bar div');
      if (this.sectionMoreDialog && alertBar && this.sectionMoreDialog.id === $dialog.attr('id')) {
        let alertBarBottom = alertBar.getBoundingClientRect().bottom;
        if (this.isDevice) {
          document.querySelector('.ngdialog-overlay').style.top = alertBarBottom + 'px';
          document.querySelector('.ngdialog-content').style.top = alertBarBottom + 'px';
        } else {
          document.querySelector('.modify-bar-active').style.top = alertBarBottom + 'px';
        }
      }
    });

  }

  showPopup() {
    let appendClass = 'fk-section-more-dialog';
      if (document.querySelector('fk-modify-bar div')) {
        appendClass = "fk-section-more-dialog modify-bar-active";
      }

    this.sectionMoreDialog = this.ngDialog.open({
      template: 'templates/fkSectionMorePopup.html',
      showClose: false,
      appendClassName: appendClass,
      scope: this.$scope,
      ariaRole: 'dialog',
      closeByNavigation: true,
      onOpenCallback: () => {
        this.sectionMoreContainer = document.querySelector('.fk-section-more');
        this.sectionMoreContainer.addEventListener("scroll", this.lazyRefresh.bind(this), this.fkUtils.passiveSupported ? {passive : true} : false);
        this.lazyRefresh();
      },
      preCloseCallback: () => {
        this.sectionMoreDialog = null;
        this.sectionMoreContainer.removeEventListener("scroll", this.lazyRefresh.bind(this));
      }
    });
    this.$scope.$emit('fk-section-more-opened', {
      products: this.products,
      section: this.section,
      type: this.type
    });
  }

  lazyRefresh() {
    this.fkUtils.lazyLoadImage();
  }

  decideIsMobile (bp) {
    return bp === 'xs' || bp === 'sm';
  }

}

FkSectionMoreCtrl.$inject = ['$rootScope', '$scope', '$timeout', 'ngDialog', 'fkUtils'];

export default FkSectionMoreCtrl;
