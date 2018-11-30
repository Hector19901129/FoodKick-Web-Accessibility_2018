import fkDeliveryAddressForm from './../../templates/fkDeliveryAddressForm.html';
import './../../css/fkDeliveryAddressForm.css';

export default {
  template: fkDeliveryAddressForm,
  bindings: {
    defaultAction: '@',
    hideDelete: '<',
    editData: '<',
    onAddressSaved: '&'
  },
  controller: 'fkDeliveryAddressFormCtrl'
};
