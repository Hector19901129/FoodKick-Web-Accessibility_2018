import angular from 'angular';

import AccountCtrl from './accountCtrl';
import AddressesCtrl from './addressesCtrl';
import EmailSettingsCtrl from './emailSettingsCtrl';
import Fk404Ctrl from './fk404Ctrl';
import FkAlcoholRestrictedCtrl from './fkAlcoholRestrictedCtrl';
import FkChangePasswordCtrl from './fkChangePasswordCtrl';
import FkDepartmentCtrl from './fkDepartmentCtrl';
import FkHelpDetailCtrl from './helpCtrl';
import FdHomeCtrl from './fdHomeCtrl';
import FkOrderHistoryCtrl from './fkOrderHistoryCtrl';
import FkPastItemsCtrl from './fkPastItemsCtrl';
import FkPastOrdersCtrl from './fkPastOrdersCtrl';
import FkPDPCtrl from './fkPDPCtrl';
import FkPLPCtrl from './fkPLPCtrl';
import FkReceiptPageCtrl from './fkReceiptPageCtrl';
import FkSearchCtrl from './fkSearchCtrl';
import FkSearchPageCtrl from './fkSearchPageCtrl';
import HelpCtrl from './helpCtrl';
import NotificationsCtrl from './notificationsCtrl';
import PasswordSettingsCtrl from './passwordSettingsCtrl';
import PaymentMethodsCtrl from './paymentMethodsCtrl';


export default angular.module('fdControllers', [])
  .controller('accountCtrl', AccountCtrl)
  .controller('addressesCtrl', AddressesCtrl)
  .controller('emailSettingsCtrl', EmailSettingsCtrl)
  .controller('fk404Ctrl', Fk404Ctrl)
  .controller('fkAlcoholRestrictedCtrl', FkAlcoholRestrictedCtrl)
  .controller('fkChangePasswordCtrl', FkChangePasswordCtrl)
  .controller('fkDepartmentCtrl', FkDepartmentCtrl)
  .controller('fkHelpDetailCtrl', FkHelpDetailCtrl)
  .controller('fdHomeCtrl', FdHomeCtrl)
  .controller('fkOrderHistoryCtrl', FkOrderHistoryCtrl)
  .controller('fkPastItemsCtrl', FkPastItemsCtrl)
  .controller('fkPastOrdersCtrl', FkPastOrdersCtrl)
  .controller('fkPDPCtrl', FkPDPCtrl)
  .controller('fkPLPCtrl', FkPLPCtrl)
  .controller('fkReceiptPageCtrl', FkReceiptPageCtrl)
  .controller('fkSearchCtrl', FkSearchCtrl)
  .controller('fkSearchPageCtrl', FkSearchPageCtrl)
  .controller('helpCtrl', HelpCtrl)
  .controller('notificationsCtrl', NotificationsCtrl)
  .controller('passwordSettingsCtrl', PasswordSettingsCtrl)
  .controller('paymentMethodsCtrl', PaymentMethodsCtrl)
  .name;
