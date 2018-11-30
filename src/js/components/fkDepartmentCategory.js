import fkDepartmentCategory from './../../templates/fkDepartmentCategory.html';
import './../../css/fkDepartmentCategory.css';

export default {
  bindings: {
    category: '<',
    opened: '<',
    httpAsync: '<',
    httpLast: '<',
    useLazyImg: '<',
    onToggle: '&'
  },
  template: fkDepartmentCategory,
  controller: 'fkDepartmentCategoryCtrl'
};
