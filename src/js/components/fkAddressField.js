export default {
  template: "<span ng-if='$ctrl.address.street1'>{{$ctrl.address.street1}}{{$ctrl.address.apartment ? ' apt ' + $ctrl.address.apartment + ', ' : ', '}}{{$ctrl.address.city}}</span>",
  bindings: {
    address: '<'
  }
};
