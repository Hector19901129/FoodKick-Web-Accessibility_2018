import fkProductVariant from './../../templates/fkProductVariant.html';
import './../../css/fkProductVariant.css';

export default {
  template: fkProductVariant,
  bindings: {
    variant: '<',
    open: '<',
    selected: '<',
    onClose: '&',
    onSelect: '&',
    missing: '<'
  },
  controller: 'fkProductVariantCtrl'
};
