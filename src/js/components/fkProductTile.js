import fkProductTile from './../../templates/fkProductTile.html';
import './../../css/fkProductTile.css';

export default {
  template: fkProductTile,
  controller: 'fkProductTileCtrl',
  bindings: {
    gsdpage: '<',
    pdpFeedType: '=',
    position: '<',
    product: '<',
    useLazyImg: '<',
    orientation: '@'
  }
};
