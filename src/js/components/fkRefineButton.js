import fkRefineButton from './../../templates/fkRefineButton.html';
import './../../css/fkRefineButton.css';

export default {
  template: fkRefineButton,
  bindings: {
    category: '<',
    hideCategories: '<',
    filterString: '<',
    showResult: '<'
  },
  controller: 'fkRefineButtonCtrl'
};
