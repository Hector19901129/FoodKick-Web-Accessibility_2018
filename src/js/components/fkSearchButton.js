import fkSearchButton from './../../templates/fkSearchButton.html';
import './../../css/fkSearchButton.css';

export default {
  bindings: {
    onOpen:'&',
    onClose: '&'
  },
  template: fkSearchButton,
  controller: 'fkSearchButtonCtrl'
};
