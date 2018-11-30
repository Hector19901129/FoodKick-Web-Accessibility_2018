import fkAtcIncartTemplate from './../../templates/fkAtcIncart.html';
import './../../css/fkAtcIncart.css';

export default {
  template: fkAtcIncartTemplate,
  controller: 'fkAtcIncartCtrl',
  bindings: {
    product: '<'
  }
};
