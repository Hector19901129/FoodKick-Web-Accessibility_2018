import fkAtcIncDecTemplate from './../../templates/fkAtcIncDec.html';
import './../../css/fkAtcIncDec.css';

export default {
  template: fkAtcIncDecTemplate,
  controller: 'fkAtcIncDecCtrl',
  bindings: {
    product: '<',
    position: '<'
  }
};
