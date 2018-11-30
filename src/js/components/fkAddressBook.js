import fkAddressBookTemplate from './../../templates/fkAddressBook.html';
import './../../css/fkAddressBook.css';

export default {
  template: fkAddressBookTemplate,
  controller: 'fkAddressBookCtrl',
  bindings: {
    defaultCallback: '<',
    setAddress: '&'
  }
};
