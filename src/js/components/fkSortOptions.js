import fkSortOptions from './../../templates/fkSortOptions.html';
import './../../css/fkSortOptions.css';

export default {
  template: fkSortOptions,
  bindings: {
    sortOptions: '<'
  },
  controller: 'fkSortOptionsCtrl'
};
