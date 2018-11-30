import fkProductVariantList from './../../templates/fkProductVariantList.html';
import './../../css/fkProductVariantList.css';

export default {
  template: fkProductVariantList,
  bindings: {
    variations: '<',
    missingVariants: '<',
    onSelect: '&'
  },
  controller: 'fkProductVariantListCtrl'
};
