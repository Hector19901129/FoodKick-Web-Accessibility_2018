import fkDoubleClickAd from './../../templates/fkDoubleClickAd.html';
import './../../css/fkDoubleClickAd.css';


export default {
  template: fkDoubleClickAd,
  controller: 'fkDoubleClickAdCtrl',
  bindings: {
    name: '@',
    targets: '<'
  }
};
