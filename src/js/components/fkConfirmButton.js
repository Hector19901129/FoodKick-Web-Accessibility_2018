export default {
  template: '<button class="{{$ctrl.buttonClass}}" ng-click="$ctrl.openPopup()" type="button"><fk-icon ng-if="$ctrl.icon" fk-icon-id="{{$ctrl.icon}}"></fk-icon><ng-transclude></ng-transclude></button>',
  transclude: true,
  controller: 'fkConfirmButtonCtrl',
  bindings: {
    icon: '@',
    buttonClass: '@',
    title: '@',
    message: '@',
    buttons: '<',
    confirm: '<'
  }
};
