import angular from 'angular';

import FkAddressBook from './fkAddressBook';
import FkAddressField from './fkAddressField';
import FkAddressPicker from './fkAddressPicker';
import FkAnalyticsCoremetrics from './fkAnalyticsCoremetrics';
import FkAnalyticsGoogleTagManager from './fkAnalyticsGoogleTagManager';
import FkAnalyticsLogger from './fkAnalyticsLogger';
import FkAtcIncart from './fkAtcIncart';
import FkAtcIncDec from './fkAtcIncDec';
import FkAtcPdp from './fkAtcPdp';
import FkBankForm from './fkBankForm';
import FkCancelModifyChanges from './fkCancelModifyChanges';
import FkCarousel from './fkCarousel';
import FkCartContent from './fkCartContent';
import FkCartRecommenders from './fkCartRecommenders';
import FkCartTabbedRecommenders from './fkCartTabbedRecommenders';
import FkCartRecommendersSelector from './fkCartRecommendersSelector';
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
import FkDeliveryTimeslots from './fkDeliveryTimeslots';
import FkDepartmentCategory from './fkDepartmentCategory';
import FkDepartmentList from './fkDepartmentList';
import FkDoubleClick from './fkDoubleClick';
import FkDoubleClickAd from './fkDoubleClickAd';
import FkEmailNotificationsForm from './fkEmailNotificationsForm';
import FkEmailSettings from './fkEmailSettings';
import FkETippingForm from './fkETippingForm';
import FkExampleWidget from './fkExampleWidget';
import FkFeedSelector from './fkFeedSelector';
import FkFlowerCarePopup from './fkFlowerCarePopup';
import FkFooterApps from './fkFooterApps';
import FkFooterCenter from './fkFooterCenter';
import FkFooter from './fkFooter';
import FkFooterLinks from './fkFooterLinks';
import FkForgotPasswordForm from './fkForgotPasswordForm';
import FkForgotPassword from './fkForgotPassword';
import FkFormField from './fkFormField';
import FkForm from './fkForm';
import FkFreshFactorHelp from './fkFreshFactorHelp';
import FkGlobalAlertBar from './fkGlobalAlertBar';
import FkGlobalChat from './fkGlobalChat';
import FkGlobalNavigationWidget from './fkGlobalNavigationWidget';
import FkGlobalNav from './fkGlobalNav';
import FkGroupScaleDetails from './fkGroupScaleDetails';
import FkGroupScaleSelector from './fkGroupScaleSelector';
import FkGuaranteedFreshPopup from './fkGuaranteedFreshPopup';
import FkHeader from './fkHeader';
import FkHealthWarning from './fkHealthWarning';
import FkHelpMenu from './fkHelpMenu';
import FkHelpOptions from './fkHelpOptions';
import FkIncartBadge from './fkIncartBadge';
import FkKosherInformation from './fkKosherInformation';
import FkLeftNav from './fkLeftNav';
import FkLogoutButton from './fkLogoutButton';
import FkMenu from './fkMenu';
import FkMicrowavePopup from './fkMicrowavePopup';
import FkMobileNotificationsForm from './fkMobileNotificationsForm';
import FKMobileNumber from './fkMobileNumber';
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
import FkReceiptPopup from './fkReceiptPopup';
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
import FkTimeslots from './fkTimeslots';
import FkWineInformation from './fkWineInformation';
import FkZipCheckForm from './fkZipCheckForm';
import FkZipCheck from './fkZipCheck';
import FkZipCodeChange from './fkZipCodeChange';
import FkZipEmailNotification from './fkZipEmailNotification';
import FkZipEmailNotifyComplete from './fkZipEmailNotifyComplete';
import FkZipEmailRegistration from './fkZipEmailRegistration';
import FdPager from './fdPager';
import FkBrowserNotification from './fkBrowserNotification';
import FkSupportMessageSection from './fkSupportMessageSection';
import FkCredits from './fkCredits';
import FkSigninAtp from './fkSigninAtp';
import FkProductCard from './fkProductCard';
import FkAtpNotification from './fkAtpNotification';
import FkRafRegistrationForm from './fkRafRegistrationForm';
import FkDeliveryPassConfirmation from './fkDeliveryPassConfirmation';
import FkDeliverypassSettings from './fkDeliverypassSettings';
import FkDeliverypassComponent from './fkDeliverypassComponent';
import FkRecaptcha from './fkRecaptcha';

import fkComponentsControllers from './fkComponentsControllers';

export default angular.module('fkComponents', [fkComponentsControllers])
  .component('fkAddressBook', FkAddressBook)
  .component('fkAddressField', FkAddressField)
  .component('fkAddressPicker', FkAddressPicker)
  .component('fkAnalyticsCoremetrics', FkAnalyticsCoremetrics)
	.component('fkAnalyticsGoogleTagManager', FkAnalyticsGoogleTagManager)
	.component('fkAnalyticsLogger', FkAnalyticsLogger)
  .component('fkAtcIncart', FkAtcIncart)
  .component('fkAtcIncDec', FkAtcIncDec)
  .component('fkAtcPdp', FkAtcPdp)
  .component('fkBankForm', FkBankForm)
  .component('fkCancelModifyChanges', FkCancelModifyChanges)
  .component('fkCarousel', FkCarousel)
  .component('fkCartContent', FkCartContent)
  .component('fkCartRecommenders', FkCartRecommenders)
  .component('fkCartTabbedRecommenders', FkCartTabbedRecommenders)
  .component('fkCartRecommendersSelector', FkCartRecommendersSelector)
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
  .component('fkDeliveryTimeslots', FkDeliveryTimeslots)
  .component('fkDepartmentCategory', FkDepartmentCategory)
  .component('fkDepartmentList', FkDepartmentList)
  .component('fkDoubleClick', FkDoubleClick)
  .component('fkDoubleClickAd', FkDoubleClickAd)
  .component('fkEmailNotificationsForm', FkEmailNotificationsForm)
  .component('fkEmailSettings', FkEmailSettings)
  .component('fkETippingForm', FkETippingForm)
  .component('fkExampleWidget', FkExampleWidget)
  .component('fkFeedSelector', FkFeedSelector)
  .component('fkFlowerCarePopup', FkFlowerCarePopup)
  .component('fkFooterApps', FkFooterApps)
  .component('fkFooterCenter', FkFooterCenter)
  .component('fkFooter', FkFooter)
  .component('fkFooterLinks', FkFooterLinks)
  .component('fkForgotPasswordForm', FkForgotPasswordForm)
  .component('fkForgotPassword', FkForgotPassword)
  .component('fkFormField', FkFormField)
  .component('fkForm', FkForm)
  .component('fkFreshFactorHelp', FkFreshFactorHelp)
  .component('fkGlobalAlertBar', FkGlobalAlertBar)
  .component('fkGlobalChat', FkGlobalChat)
  .component('fkGlobalNavigationWidget', FkGlobalNavigationWidget)
  .component('fkGlobalNav', FkGlobalNav)
  .component('fkGroupScaleDetails', FkGroupScaleDetails)
  .component('fkGroupScaleSelector', FkGroupScaleSelector)
  .component('fkGuaranteedFreshPopup', FkGuaranteedFreshPopup)
  .component('fkHeader', FkHeader)
  .component('fkHealthWarning', FkHealthWarning)
  .component('fkHelpMenu', FkHelpMenu)
  .component('fkHelpOptions', FkHelpOptions)
  .component('fkIncartBadge', FkIncartBadge)
  .component('fkKosherInformation', FkKosherInformation)
  .component('fkLeftNav', FkLeftNav)
  .component('fkLogoutButton', FkLogoutButton)
  .component('fkMenu', FkMenu)
  .component('fkMicrowavePopup', FkMicrowavePopup)
  .component('fkMobileNotificationsForm', FkMobileNotificationsForm)
  .component('fkMobileNumber', FKMobileNumber)
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
  .component('fkReceiptPopup', FkReceiptPopup)
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
  .component('fkTimeslots', FkTimeslots)
  .component('fkWineInformation', FkWineInformation)
  .component('fkZipCheckForm', FkZipCheckForm)
  .component('fkZipCheck', FkZipCheck)
  .component('fkZipCodeChange', FkZipCodeChange)
  .component('fkZipEmailNotification', FkZipEmailNotification)
  .component('fkZipEmailNotifyComplete', FkZipEmailNotifyComplete)
  .component('fkZipEmailRegistration', FkZipEmailRegistration)
  .component('fdPager', FdPager)
  .component('fkBrowserNotification', FkBrowserNotification)
  .component('fkSupportMessageSection', FkSupportMessageSection)
  .component('fkCredits', FkCredits)
  .component('fkSigninAtp', FkSigninAtp)
  .component('fkProductCard', FkProductCard)
  .component('fkAtpNotification', FkAtpNotification)
  .component('fkRafRegistrationForm', FkRafRegistrationForm)
  .component('fkDeliveryPassConfirmation', FkDeliveryPassConfirmation)
  .component('fkDeliverypassSettings', FkDeliverypassSettings)
  .component('fkDeliverypassComponent', FkDeliverypassComponent)
  .component('fkRecaptcha', FkRecaptcha)
  .name;
