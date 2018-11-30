import fkDepartmentList from './../../templates/fkDepartmentList.html';
import './../../css/fkDepartmentList.css';

export default {
  bindings: {
    onSelect: '&',
    onNavigate: '&',
    selected: '='
  },
  template: fkDepartmentList,
  controller: 'fkDepartmentListCtrl'
};
