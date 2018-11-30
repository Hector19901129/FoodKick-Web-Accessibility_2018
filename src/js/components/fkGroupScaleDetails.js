import fkGroupScaleDetails from './../../templates/fkGroupScaleDetails.html';
import './../../css/fkGroupScaleDetails.css';

export default {
  template: fkGroupScaleDetails,
  bindings: {
    dealInfo: '<',
    product: '<'
  },
  controller: 'fkGroupScaleDetailsCtrl'
};
