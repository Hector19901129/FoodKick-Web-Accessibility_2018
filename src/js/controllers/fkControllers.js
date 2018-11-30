import angular from 'angular';

import AccountCtrl from './accountCtrl';
import AddressesCtrl from './addressesCtrl';
import EmailSettingsCtrl from './emailSettingsCtrl';
import Fk404Ctrl from './fk404Ctrl';
import FkAlcoholRestrictedCtrl from './fkAlcoholRestrictedCtrl';
import FkChangePasswordCtrl from './fkChangePasswordCtrl';
import FkDepartmentCtrl from './fkDepartmentCtrl';
import FkHelpDetailCtrl from './fkHelpDetailCtrl';
import FkHomeCtrl from './fkHomeCtrl';
import FkMobileNumberController from './fkMobileNumberController';
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
import CreditsCtrl from './creditsCtrl';
import FkReferalPageCtrl from './fkReferalPageCtrl';
import FkDeliveryPassLandingCtrl from './fkDeliveryPassLandingCtrl';
import DeliveryPassCtrl from './deliveryPassCtrl';
import FkFeedCtrl from './fkFeedCtrl';

export default angular.module('fkControllers', [])
  .controller('accountCtrl', AccountCtrl)
  .controller('addressesCtrl', AddressesCtrl)
  .controller('emailSettingsCtrl', EmailSettingsCtrl)
  .controller('fk404Ctrl', Fk404Ctrl)
  .controller('fkAlcoholRestrictedCtrl', FkAlcoholRestrictedCtrl)
  .controller('fkChangePasswordCtrl', FkChangePasswordCtrl)
  .controller('fkDepartmentCtrl', FkDepartmentCtrl)
  .controller('fkHelpDetailCtrl', FkHelpDetailCtrl)
  .controller('fkHomeCtrl', FkHomeCtrl)
  .controller('fkMobileNumberController', FkMobileNumberController)
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
  .controller('creditsCtrl', CreditsCtrl)
  .controller('fkReferalPageCtrl', FkReferalPageCtrl)
  .controller('fkDeliveryPassLandingCtrl', FkDeliveryPassLandingCtrl)
  .controller('deliveryPassCtrl', DeliveryPassCtrl)
  .controller('fkFeedCtrl', FkFeedCtrl)
  .name;
