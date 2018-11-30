import fdPager from './../../templates/fdPager.html';
import './../../css/fdPager.css';

export default {
  bindings: {
    pager: '<'
  },
  template: fdPager,
  controller: 'fdPagerCtrl'
};
