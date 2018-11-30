import angular from 'angular';

import FkAddressBook from './fkAddressBook';
import FkAddressField from './fkAddressField';
import FkAddressPicker from './fkAddressPicker';
import FkAnalyticsCoremetrics from './fkAnalyticsCoremetrics';
import FkAnalyticsLogger from './fkAnalyticsLogger';
import FkAtcIncart from './fkAtcIncart';
import FkAtcIncDec from './fkAtcIncDec';
import FkAtcPdp from './fkAtcPdp';
import FkBankForm from './fkBankForm';
import FkCancelModifyChanges from './fkCancelModifyChanges';
import FkCarousel from './fkCarousel';
import FkCartContent from './fkCartContent';
import FkChangePasswordForm from './fkChangePasswordForm';
import FkCheckoutAtp from './fkCheckoutAtp';
import FkCheckout from './fkCheckout';
import FkClaimsInformation from './fkClaimsInformation';
import FkConfirmation from './fkConfirmation';
import FkConfirmButton from './fkConfirmButton';
import FkCreateAccount from './fkCreateAccount';
import FkCreditCardForm from './fkCreditCardForm';
import FkDeliveryAddressForm from './fkDeliveryAddressForm';
import FkDeliveryAddressSelection from './fkDeliveryAddressSelection';
import FdDeliveryTimeslots from './fdDeliveryTimeslots';
import FkDepartmentCategory from './fkDepartmentCategory';
import FkDepartmentList from './fkDepartmentList';
import FkEmailNotificationsForm from './fkEmailNotificationsForm';
import FkEmailSettings from './fkEmailSettings';
import FkETippingForm from './fkETippingForm';
import FkExampleWidget from './fkExampleWidget';
import FkFeedSelector from './fkFeedSelector';
import FkFooterApps from './fkFooterApps';
import FkFooterCenter from './fkFooterCenter';
import FkFooter from './fkFooter';
import FkFooterLinks from './fkFooterLinks';
import FkForgotPasswordForm from './fkForgotPasswordForm';
import FkForgotPassword from './fkForgotPassword';
import FkFormField from './fkFormField';
import FkForm from './fkForm';
import FkFreshFactorHelp from './fkFreshFactorHelp';
import FkGlobalChat from './fkGlobalChat';
import FkGlobalNavigationWidget from './fkGlobalNavigationWidget';
import FkGlobalNav from './fkGlobalNav';
import FkGroupScaleDetails from './fkGroupScaleDetails';
import FkGroupScaleSelector from './fkGroupScaleSelector';
import FkHeader from './fkHeader';
import FkHealthWarning from './fkHealthWarning';
import FkHelpMenu from './fkHelpMenu';
import FkIncartBadge from './fkIncartBadge';
import FkKosherInformation from './fkKosherInformation';
import FkLeftNav from './fkLeftNav';
import FkLogoutButton from './fkLogoutButton';
import FkMenu from './fkMenu';
import FkMobileNotificationsForm from './fkMobileNotificationsForm';
import FkMobileNumberForm from './fkMobileNumberForm';
import FkModificationTimeComplete from './fkModificationTimeComplete';
import FkModifyBar from './fkModifyBar';
import FkModifyWarning from './fkModifyWarning';
import FkNavigationBarWidget from './fkNavigationBarWidget';
import FkNgdialogClose from './fkNgdialogClose';
import FkNutrition from './fkNutrition';
import FkOneAll from './fkOneAll';
import FkOptimizely from './fkOptimizely';
import FkOrderCancelConfirmation from './fkOrderCancelConfirmation';
import FkOrderCancellationWarning from './fkOrderCancellationWarning';
import FkOrderConfirm from './fkOrderConfirm';
import FkOrderDetailFields from './fkOrderDetailFields';
import FkOrderMapUrl from './fkOrderMapUrl';
import FkOriginInformation from './fkOriginInformation';
import FkPageMenu from './fkPageMenu';
import FkPasswordSettings from './fkPasswordSettings';
import FkPastItemsButton from './fkPastItemsButton';
import FkPastOrderDetails from './fkPastOrderDetails';
import FkPastOrdersNav from './fkPastOrdersNav';
import FkPaymentMethod from './fkPaymentMethod';
import FkPaymentMethods from './fkPaymentMethods';
import FkPlantIdChange from './fkPlantIdChange';
import FkPopupCartContent from './fkPopupCartContent';
import FkPopupCart from './fkPopupCart';
import FkProductCarousel from './fkProductCarousel';
import FkProductDetailPopup from './fkProductDetailPopup';
import FkProductDetails from './fkProductDetails';
import FkProductTile from './fkProductTile';
import FkProductTileList from './fkProductTileList';
import FkProductVariant from './fkProductVariant';
import FkProductVariantList from './fkProductVariantList';
import FkProfileButton from './fkProfileButton';
import FkPromoCode from './fkPromoCode';
import FkQuantityDropDownSelector from './fkQuantityDropDownSelector';
import FkQuantitySelector from './fkQuantitySelector';
import FkRating from './fkRating';
import FkReceiptButton from './fkReceiptButton';
import FkReceipt from './fkReceipt';
import FkRefineButton from './fkRefineButton';
import FkSearchButton from './fkSearchButton';
import FkSearch from './fkSearch';
import FkSecondaryHeader from './fkSecondaryHeader';
import FkSectionHero from './fkSectionHero';
import FkSection from './fkSection';
import FkSectionMore from './fkSectionMore';
import FkSessionExpired from './fkSessionExpired';
import FkSignInButton from './fkSignInButton';
import FkSignInForm from './fkSignInForm';
import FkSignIn from './fkSignIn';
import FkSortOptions from './fkSortOptions';
import FkTab from './fkTab';
import FkTabs from './fkTabs';
import FkTermsPopup from './fkTermsPopup';
import FkWineInformation from './fkWineInformation';
import FkZipCheckForm from './fkZipCheckForm';
import FkZipCheck from './fkZipCheck';
import FkZipEmailNotification from './fkZipEmailNotification';
import FkZipEmailNotifyComplete from './fkZipEmailNotifyComplete';
import FkZipEmailRegistration from './fkZipEmailRegistration';
import FdModuleGroup from './fdModuleGroup';
import FdEditorialContent from './fdEditorialContent';
import FdProductCarousel from './fdProductCarousel';
import FdSection from './fdSection';
import FdIconTileList from './fdIconTileList';
import FdPager from './fdPager';
import FdDeliveryDays from './fdDeliveryDays';
import FdTimeslots from './fdTimeslots';
import FdWelcomePopup from './fdWelcomePopup';
import FdConfirmNewSite from './fdConfirmNewSite';
import FkReceiptPopup from './fkReceiptPopup';

import fdComponentsControllers from './fdComponentsControllers';

export default angular.module('fdComponents', [fdComponentsControllers])
  .component('fkAddressBook', FkAddressBook)
  .component('fkAddressField', FkAddressField)
  .component('fkAddressPicker', FkAddressPicker)
  .component('fkAnalyticsCoremetrics', FkAnalyticsCoremetrics)
	.component('fkAnalyticsLogger', FkAnalyticsLogger)
  .component('fkAtcIncart', FkAtcIncart)
  .component('fkAtcIncDec', FkAtcIncDec)
  .component('fkAtcPdp', FkAtcPdp)
  .component('fkBankForm', FkBankForm)
  .component('fkCancelModifyChanges', FkCancelModifyChanges)
  .component('fkCarousel', FkCarousel)
  .component('fkCartContent', FkCartContent)
  .component('fkChangePasswordForm', FkChangePasswordForm)
  .component('fkCheckoutAtp', FkCheckoutAtp)
  .component('fkCheckout', FkCheckout)
  .component('fkClaimsInformation', FkClaimsInformation)
  .component('fkConfirmation', FkConfirmation)
  .component('fkConfirmButton', FkConfirmButton)
  .component('fkCreateAccount', FkCreateAccount)
  .component('fkCreditCardForm', FkCreditCardForm)
  .component('fkDeliveryAddressForm', FkDeliveryAddressForm)
  .component('fkDeliveryAddressSelection', FkDeliveryAddressSelection)
  .component('fkDeliveryTimeslots', FdDeliveryTimeslots)
  .component('fkDepartmentCategory', FkDepartmentCategory)
  .component('fkDepartmentList', FkDepartmentList)
  .component('fkEmailNotificationsForm', FkEmailNotificationsForm)
  .component('fkEmailSettings', FkEmailSettings)
  .component('fkETippingForm', FkETippingForm)
  .component('fkExampleWidget', FkExampleWidget)
  .component('fkFeedSelector', FkFeedSelector)
  .component('fkFooterApps', FkFooterApps)
  .component('fkFooterCenter', FkFooterCenter)
  .component('fkFooter', FkFooter)
  .component('fkFooterLinks', FkFooterLinks)
  .component('fkForgotPasswordForm', FkForgotPasswordForm)
  .component('fkForgotPassword', FkForgotPassword)
  .component('fkFormField', FkFormField)
  .component('fkForm', FkForm)
  .component('fkFreshFactorHelp', FkFreshFactorHelp)
  .component('fkGlobalChat', FkGlobalChat)
  .component('fkGlobalNavigationWidget', FkGlobalNavigationWidget)
  .component('fkGlobalNav', FkGlobalNav)
  .component('fkGroupScaleDetails', FkGroupScaleDetails)
  .component('fkGroupScaleSelector', FkGroupScaleSelector)
  .component('fkHeader', FkHeader)
  .component('fkHealthWarning', FkHealthWarning)
  .component('fkHelpMenu', FkHelpMenu)
  .component('fkIncartBadge', FkIncartBadge)
  .component('fkKosherInformation', FkKosherInformation)
  .component('fkLeftNav', FkLeftNav)
  .component('fkLogoutButton', FkLogoutButton)
  .component('fkMenu', FkMenu)
  .component('fkMobileNotificationsForm', FkMobileNotificationsForm)
  .component('fkMobileNumberForm', FkMobileNumberForm)
  .component('fkModificationTimeComplete', FkModificationTimeComplete)
  .component('fkModifyBar', FkModifyBar)
  .component('fkModifyWarning', FkModifyWarning)
  .component('fkNavigationBarWidget', FkNavigationBarWidget)
  .component('fkNgdialogClose', FkNgdialogClose)
  .component('fkNutrition', FkNutrition)
  .component('fkOneAll', FkOneAll)
  .component('fkOptimizely', FkOptimizely)
  .component('fkOrderCancelConfirmation', FkOrderCancelConfirmation)
  .component('fkOrderCancellationWarning', FkOrderCancellationWarning)
  .component('fkOrderConfirm', FkOrderConfirm)
  .component('fkOrderDetailFields', FkOrderDetailFields)
  .component('fkOrderMapUrl', FkOrderMapUrl)
  .component('fkOriginInformation', FkOriginInformation)
  .component('fkPageMenu', FkPageMenu)
  .component('fkPasswordSettings', FkPasswordSettings)
  .component('fkPastItemsButton', FkPastItemsButton)
  .component('fkPastOrderDetails', FkPastOrderDetails)
  .component('fkPastOrdersNav', FkPastOrdersNav)
  .component('fkPaymentMethod', FkPaymentMethod)
  .component('fkPaymentMethods', FkPaymentMethods)
  .component('fkPlantIdChange', FkPlantIdChange)
  .component('fkPopupCartContent', FkPopupCartContent)
  .component('fkPopupCart', FkPopupCart)
  .component('fkProductCarousel', FkProductCarousel)
  .component('fkProductDetailPopup', FkProductDetailPopup)
  .component('fkProductDetails', FkProductDetails)
  .component('fkProductTile', FkProductTile)
  .component('fkProductTileList', FkProductTileList)
  .component('fkProductVariant', FkProductVariant)
  .component('fkProductVariantList', FkProductVariantList)
  .component('fkProfileButton', FkProfileButton)
  .component('fkPromoCode', FkPromoCode)
  .component('fkQuantityDropDownSelector', FkQuantityDropDownSelector)
  .component('fkQuantitySelector', FkQuantitySelector)
  .component('fkRating', FkRating)
  .component('fkReceiptButton', FkReceiptButton)
  .component('fkReceipt', FkReceipt)
  .component('fkRefineButton', FkRefineButton)
  .component('fkSearchButton', FkSearchButton)
  .component('fkSearch', FkSearch)
  .component('fkSecondaryHeader', FkSecondaryHeader)
  .component('fkSectionHero', FkSectionHero)
  .component('fkSection', FkSection)
  .component('fkSectionMore', FkSectionMore)
  .component('fkSessionExpired', FkSessionExpired)
  .component('fkSignInButton', FkSignInButton)
  .component('fkSignInForm', FkSignInForm)
  .component('fkSignIn', FkSignIn)
  .component('fkSortOptions', FkSortOptions)
  .component('fkTab', FkTab)
  .component('fkTabs', FkTabs)
  .component('fkTermsPopup', FkTermsPopup)
  .component('fkWineInformation', FkWineInformation)
  .component('fkZipCheckForm', FkZipCheckForm)
  .component('fkZipCheck', FkZipCheck)
  .component('fkZipEmailNotification', FkZipEmailNotification)
  .component('fkZipEmailNotifyComplete', FkZipEmailNotifyComplete)
  .component('fkZipEmailRegistration', FkZipEmailRegistration)
  .component('fdModuleGroup', FdModuleGroup)
  .component('fdEditorialContent', FdEditorialContent)
  .component('fdProductCarousel', FdProductCarousel)
  .component('fdSection', FdSection)
  .component('fdIconTileList', FdIconTileList)
  .component('fdPager', FdPager)
  .component('fdDeliveryDays', FdDeliveryDays)
  .component('fdTimeslots', FdTimeslots)
  .component('fdWelcomePopup', FdWelcomePopup)
  .component('fdConfirmNewSite', FdConfirmNewSite)
  .component('fkReceiptPopup', FkReceiptPopup)
  .name;
