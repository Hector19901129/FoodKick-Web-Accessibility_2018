import fkFeedSelector from './../../templates/fkFeedSelector.html';
import './../../css/fkFeedSelector.css';

export default {
  template: fkFeedSelector,
  bindings: {
    feedType: '='
  },
  controller: 'fkFeedSelectorCtrl'
};
