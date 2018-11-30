import fkProductTileList from './../../templates/fkProductTileList.html';
import './../../css/fkProductTileList.css';

export default {
  template: fkProductTileList,
  controller: 'fkProductTileListCtrl',
  bindings: {
    gsdpage: '<',
    products: '<',
    displaytype: '<',
    useLazyImg: '<',
    itemClass: '<',
    orientation:'@',
    pdpFeedType: '=',
    // #AN-105 for 'list' parameter in product impressions
    channel: '<',
    location: '<',
    listTitle: '<'
  }
};
