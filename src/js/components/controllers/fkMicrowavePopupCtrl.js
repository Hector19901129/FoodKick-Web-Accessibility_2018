class FkMicrowavePopupCtrl {
  constructor($rootScope, ngDialog) {
    this.$rootScope = $rootScope;
    this.ngDialog = ngDialog;

    this.dialog = null;

    $rootScope.$on('fk-open-microwave-popup', () => {
      this.dialog = ngDialog.open({
        templateUrl: 'templates/fkMicrowavePopup.html',
        appendClassName: 'fk-microwave-popup narrow',
        showClose: false,
        ariaRole: 'dialog',
        data: {
          microwaveImage: '/media/brands/FreshDining/frshdng_pop_guide.jpg',
          triangleImage: '/media/brands/FreshDining/5_triangle_sm.jpg'
        },
        preCloseCallback: () => {
          this.dialog = null;
        }
      });

      this.$rootScope.$emit('fk-popup-opened', {
        name: 'fkMicrowavePopup',
        type: 'Info Page'
      });
    });
  }
}

FkMicrowavePopupCtrl.$inject = ['$rootScope', 'ngDialog'];

export default FkMicrowavePopupCtrl;
