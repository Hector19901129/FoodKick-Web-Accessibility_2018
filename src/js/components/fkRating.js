import fkRating from './../../templates/fkRating.html';
import './../../css/fkRating.css';

export default {
  template: fkRating,
  bindings: {
    product: '<',
    templateRating: '<'
  }
};
