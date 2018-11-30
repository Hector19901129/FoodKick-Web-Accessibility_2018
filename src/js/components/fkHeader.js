import fkHeader from './../../templates/fkHeader.html';
import './../../css/fkHeader.css';

export default {
  bindings: {
    type: '@'
  },
  template: fkHeader,
  controller: 'fkHeaderCtrl'
};
