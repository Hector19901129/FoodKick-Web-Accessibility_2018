import fdIconTileList from './../../templates/fdIconTileList.html';
import './../../css/fdIconTileList.css';

export default {
  template: fdIconTileList,
  controller: 'fdIconTileListCtrl',
  restrict: "A",
  bindings: {
    module: '<',
    limit: '<',
    products: '<',
    itemClass: '@'
  }
};
