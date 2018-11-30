import angular from 'angular';

import fkAddressBookCtrl from './controllers/fkAddressBookCtrl';
import fkAddressPickerCtrl from './controllers/fkAddressPickerCtrl';
import fkAnalyticsCoremetricsCtrl from './controllers/fkAnalyticsCoremetricsCtrl';
import fkAnalyticsLoggerCtrl from './controllers/fkAnalyticsLoggerCtrl';
import fkAtcIncartCtrl from './controllers/fkAtcIncartCtrl';
import fkAtcIncDecCtrl from './controllers/fkAtcIncDecCtrl';
import fkAtcPdpCtrl from './controllers/fkAtcPdpCtrl';
import fkBankFormCtrl from './controllers/fkBankFormCtrl';
import fkCancelModifyChangesCtrl from './controllers/fkCancelModifyChangesCtrl';
import fkCarouselCtrl from './controllers/fkCarouselCtrl';
import fkCartContentCtrl from './controllers/fkCartContentCtrl';
import fkChangePasswordFormCtrl from './controllers/fkChangePasswordFormCtrl';
import fkCheckoutAtpCtrl from './controllers/fkCheckoutAtpCtrl';
import fkCheckoutCtrl from './controllers/fkCheckoutCtrl';
import fkConfirmationCtrl from './controllers/fkConfirmationCtrl';
import fkConfirmButtonCtrl from './controllers/fkConfirmButtonCtrl';
import fkCreateAccountCtrl from './controllers/fkCreateAccountCtrl';
import fkCreditCardFormCtrl from './controllers/fkCreditCardFormCtrl';
import fkDeliveryAddressFormCtrl from './controllers/fkDeliveryAddressFormCtrl';
import fkDeliveryAddressSelectionCtrl from './controllers/fkDeliveryAddressSelectionCtrl';
import fkDepartmentCategoryCtrl from './controllers/fkDepartmentCategoryCtrl';
import fkDepartmentListCtrl from './controllers/fkDepartmentListCtrl';
import fkEmailNotificationsFormCtrl from './controllers/fkEmailNotificationsFormCtrl';
import fkEmailSettingsCtrl from './controllers/fkEmailSettingsCtrl';
import fkETippingFormCtrl from './controllers/fkETippingFormCtrl';
import fkExampleWidgetCtrl from './controllers/fkExampleWidgetCtrl';
import fkFeedSelectorCtrl from './controllers/fkFeedSelectorCtrl';
import fkFooterAppsCtrl from './controllers/fkFooterAppsCtrl';
import fkFooterCtrl from './controllers/fkFooterCtrl';
import fkFooterLinksCtrl from './controllers/fkFooterLinksCtrl';
import fkForgotPasswordFormCtrl from './controllers/fkForgotPasswordFormCtrl';
import fkForgotPasswordCtrl from './controllers/fkForgotPasswordCtrl';
import fkFormFieldCtrl from './controllers/fkFormFieldCtrl';
import fkFormCtrl from './controllers/fkFormCtrl';
import fkFreshFactorHelpCtrl from './controllers/fkFreshFactorHelpCtrl';
import fkGlobalChatCtrl from './controllers/fkGlobalChatCtrl';
import fkGlobalNavigationWidgetCtrl from './controllers/fkGlobalNavigationWidgetCtrl';
import fkGlobalNavCtrl from './controllers/fkGlobalNavCtrl';
import fkGroupScaleDetailsCtrl from './controllers/fkGroupScaleDetailsCtrl';
import fkGroupScaleSelectorCtrl from './controllers/fkGroupScaleSelectorCtrl';
import fkHeaderCtrl from './controllers/fkHeaderCtrl';
import fkHealthWarningCtrl from './controllers/fkHealthWarningCtrl';
import fkHelpMenuCtrl from './controllers/fkHelpMenuCtrl';
import fkIncartBadgeCtrl from './controllers/fkIncartBadgeCtrl';
import fkLeftNavCtrl from './controllers/fkLeftNavCtrl';
import fkLogoutButtonCtrl from './controllers/fkLogoutButtonCtrl';
import fkMenuCtrl from './controllers/fkMenuCtrl';
import fkMobileNotificationsFormCtrl from './controllers/fkMobileNotificationsFormCtrl';
import fkMobileNumberFormCtrl from './controllers/fkMobileNumberFormCtrl';
import fkModificationTimeCompleteCtrl from './controllers/fkModificationTimeCompleteCtrl';
import fkModifyBarCtrl from './controllers/fkModifyBarCtrl';
import fkModifyWarningCtrl from './controllers/fkModifyWarningCtrl';
import fkNavigationBarWidgetCtrl from './controllers/fkNavigationBarWidgetCtrl';
import fkNgdialogCloseCtrl from './controllers/fkNgdialogCloseCtrl';
import fkOneAllCtrl from './controllers/fkOneAllCtrl';
import fkOptimizelyCtrl from './controllers/fkOptimizelyCtrl';
import fkOrderCancelConfirmationCtrl from './controllers/fkOrderCancelConfirmationCtrl';
import fkOrderCancellationWarningCtrl from './controllers/fkOrderCancellationWarningCtrl';
import fkOrderConfirmCtrl from './controllers/fkOrderConfirmCtrl';
import fkPageMenuCtrl from './controllers/fkPageMenuCtrl';
import fkPasswordSettingsCtrl from './controllers/fkPasswordSettingsCtrl';
import fkPastItemsButtonCtrl from './controllers/fkPastItemsButtonCtrl';
import fkPastOrdersNavCtrl from './controllers/fkPastOrdersNavCtrl';
import fkPaymentMethodsCtrl from './controllers/fkPaymentMethodsCtrl';
import fkPlantIdChangeCtrl from './controllers/fkPlantIdChangeCtrl';
import fkPopupCartContentCtrl from './controllers/fkPopupCartContentCtrl';
import fkPopupCartCtrl from './controllers/fkPopupCartCtrl';
import fkProductCarouselCtrl from './controllers/fkProductCarouselCtrl';
import fkProductDetailPopupCtrl from './controllers/fkProductDetailPopupCtrl';
import fkProductDetailsCtrl from './controllers/fkProductDetailsCtrl';
import fkProductTileCtrl from './controllers/fkProductTileCtrl';
import fkProductVariantCtrl from './controllers/fkProductVariantCtrl';
import fkProductVariantListCtrl from './controllers/fkProductVariantListCtrl';
import fkProfileButtonCtrl from './controllers/fkProfileButtonCtrl';
import fkPromoCodeCtrl from './controllers/fkPromoCodeCtrl';
import fkQuantityDropDownSelectorCtrl from './controllers/fkQuantityDropDownSelectorCtrl';
import fkQuantitySelectorCtrl from './controllers/fkQuantitySelectorCtrl';
import fkReceiptButtonCtrl from './controllers/fkReceiptButtonCtrl';
import fkReceiptCtrl from './controllers/fkReceiptCtrl';
import fkRefineButtonCtrl from './controllers/fkRefineButtonCtrl';
import fkSearchButtonCtrl from './controllers/fkSearchButtonCtrl';
import fkSearchCtrl from './controllers/fkSearchCtrl';
import fkSecondaryHeaderCtrl from './controllers/fkSecondaryHeaderCtrl';
import fkSectionHeroCtrl from './controllers/fkSectionHeroCtrl';
import fkSectionCtrl from './controllers/fkSectionCtrl';
import fkSectionMoreCtrl from './controllers/fkSectionMoreCtrl';
import fkSessionExpiredCtrl from './controllers/fkSessionExpiredCtrl';
import fkSignInButtonCtrl from './controllers/fkSignInButtonCtrl';
import fkSignInFormCtrl from './controllers/fkSignInFormCtrl';
import fkSignInCtrl from './controllers/fkSignInCtrl';
import fkSortOptionsCtrl from './controllers/fkSortOptionsCtrl';
import fkTabCtrl from './controllers/fkTabCtrl';
import fkTabsCtrl from './controllers/fkTabsCtrl';
import fkTermsPopupCtrl from './controllers/fkTermsPopupCtrl';
import fkZipCheckFormCtrl from './controllers/fkZipCheckFormCtrl';
import fkZipCheckCtrl from './controllers/fkZipCheckCtrl';
import fkZipEmailNotificationCtrl from './controllers/fkZipEmailNotificationCtrl';
import fkZipEmailNotifyCompleteCtrl from './controllers/fkZipEmailNotifyCompleteCtrl';
import fkZipEmailRegistrationCtrl from './controllers/fkZipEmailRegistrationCtrl';
import fdModuleGroupCtrl from './controllers/fdModuleGroupCtrl';
import fdEditorialContentCtrl from './controllers/fdEditorialContentCtrl';
import fdProductCarouselCtrl from './controllers/fdProductCarouselCtrl';
import fdSectionCtrl from './controllers/fdSectionCtrl';
import fdIconTileListCtrl from './controllers/fdIconTileListCtrl';
import fdDeliveryTimeslotsCtrl from './controllers/fdDeliveryTimeslotsCtrl';
import fdDeliveryDaysCtrl from './controllers/fdDeliveryDaysCtrl';
import fdTimeslotsCtrl from './controllers/fdTimeslotsCtrl';
import fdPagerCtrl from './controllers/fdPagerCtrl';
import fdWelcomePopupCtrl from './controllers/fdWelcomePopupCtrl';
import fdConfirmNewSiteCtrl from './controllers/fdConfirmNewSiteCtrl';
import fkReceiptPopupCtrl from './controllers/fkReceiptPopupCtrl';

export default angular.module('fdComponentsControllers', [])
  .controller('fkAddressBookCtrl', fkAddressBookCtrl)
  .controller('fkAddressPickerCtrl', fkAddressPickerCtrl)
  .controller('fkAnalyticsCoremetricsCtrl', fkAnalyticsCoremetricsCtrl)
	.controller('fkAnalyticsLoggerCtrl', fkAnalyticsLoggerCtrl)
  .controller('fkAtcIncartCtrl', fkAtcIncartCtrl)
  .controller('fkAtcIncDecCtrl', fkAtcIncDecCtrl)
  .controller('fkAtcPdpCtrl', fkAtcPdpCtrl)
  .controller('fkBankFormCtrl', fkBankFormCtrl)
  .controller('fkCancelModifyChangesCtrl', fkCancelModifyChangesCtrl)
  .controller('fkCarouselCtrl', fkCarouselCtrl)
  .controller('fkCartContentCtrl', fkCartContentCtrl)
  .controller('fkChangePasswordFormCtrl', fkChangePasswordFormCtrl)
  .controller('fkCheckoutAtpCtrl', fkCheckoutAtpCtrl)
  .controller('fkCheckoutCtrl', fkCheckoutCtrl)
  .controller('fkConfirmationCtrl', fkConfirmationCtrl)
  .controller('fkConfirmButtonCtrl', fkConfirmButtonCtrl)
  .controller('fkCreateAccountCtrl', fkCreateAccountCtrl)
  .controller('fkCreditCardFormCtrl', fkCreditCardFormCtrl)
  .controller('fkDeliveryAddressFormCtrl', fkDeliveryAddressFormCtrl)
  .controller('fkDeliveryAddressSelectionCtrl', fkDeliveryAddressSelectionCtrl)
  .controller('fkDepartmentCategoryCtrl', fkDepartmentCategoryCtrl)
  .controller('fkDepartmentListCtrl', fkDepartmentListCtrl)
  .controller('fkEmailNotificationsFormCtrl', fkEmailNotificationsFormCtrl)
  .controller('fkEmailSettingsCtrl', fkEmailSettingsCtrl)
  .controller('fkETippingFormCtrl', fkETippingFormCtrl)
  .controller('fkExampleWidgetCtrl', fkExampleWidgetCtrl)
  .controller('fkFeedSelectorCtrl', fkFeedSelectorCtrl)
  .controller('fkFooterAppsCtrl', fkFooterAppsCtrl)
  .controller('fkFooterCtrl', fkFooterCtrl)
  .controller('fkFooterLinksCtrl', fkFooterLinksCtrl)
  .controller('fkForgotPasswordFormCtrl', fkForgotPasswordFormCtrl)
  .controller('fkForgotPasswordCtrl', fkForgotPasswordCtrl)
  .controller('fkFormFieldCtrl', fkFormFieldCtrl)
  .controller('fkFormCtrl', fkFormCtrl)
  .controller('fkFreshFactorHelpCtrl', fkFreshFactorHelpCtrl)
  .controller('fkGlobalChatCtrl', fkGlobalChatCtrl)
  .controller('fkGlobalNavigationWidgetCtrl', fkGlobalNavigationWidgetCtrl)
  .controller('fkGlobalNavCtrl', fkGlobalNavCtrl)
  .controller('fkGroupScaleDetailsCtrl', fkGroupScaleDetailsCtrl)
  .controller('fkGroupScaleSelectorCtrl', fkGroupScaleSelectorCtrl)
  .controller('fkHeaderCtrl', fkHeaderCtrl)
  .controller('fkHealthWarningCtrl', fkHealthWarningCtrl)
  .controller('fkHelpMenuCtrl', fkHelpMenuCtrl)
  .controller('fkIncartBadgeCtrl', fkIncartBadgeCtrl)
  .controller('fkLeftNavCtrl', fkLeftNavCtrl)
  .controller('fkLogoutButtonCtrl', fkLogoutButtonCtrl)
  .controller('fkMenuCtrl', fkMenuCtrl)
  .controller('fkMobileNotificationsFormCtrl', fkMobileNotificationsFormCtrl)
  .controller('fkMobileNumberFormCtrl', fkMobileNumberFormCtrl)
  .controller('fkModificationTimeCompleteCtrl', fkModificationTimeCompleteCtrl)
  .controller('fkModifyBarCtrl', fkModifyBarCtrl)
  .controller('fkModifyWarningCtrl', fkModifyWarningCtrl)
  .controller('fkNavigationBarWidgetCtrl', fkNavigationBarWidgetCtrl)
  .controller('fkNgdialogCloseCtrl', fkNgdialogCloseCtrl)
  .controller('fkOneAllCtrl', fkOneAllCtrl)
  .controller('fkOptimizelyCtrl', fkOptimizelyCtrl)
  .controller('fkOrderCancelConfirmationCtrl', fkOrderCancelConfirmationCtrl)
  .controller('fkOrderCancellationWarningCtrl', fkOrderCancellationWarningCtrl)
  .controller('fkOrderConfirmCtrl', fkOrderConfirmCtrl)
  .controller('fkPageMenuCtrl', fkPageMenuCtrl)
  .controller('fkPasswordSettingsCtrl', fkPasswordSettingsCtrl)
  .controller('fkPastItemsButtonCtrl', fkPastItemsButtonCtrl)
  .controller('fkPastOrdersNavCtrl', fkPastOrdersNavCtrl)
  .controller('fkPaymentMethodsCtrl', fkPaymentMethodsCtrl)
  .controller('fkPlantIdChangeCtrl', fkPlantIdChangeCtrl)
  .controller('fkPopupCartContentCtrl', fkPopupCartContentCtrl)
  .controller('fkPopupCartCtrl', fkPopupCartCtrl)
  .controller('fkProductCarouselCtrl', fkProductCarouselCtrl)
  .controller('fkProductDetailPopupCtrl', fkProductDetailPopupCtrl)
  .controller('fkProductDetailsCtrl', fkProductDetailsCtrl)
  .controller('fkProductTileCtrl', fkProductTileCtrl)
  .controller('fkProductVariantCtrl', fkProductVariantCtrl)
  .controller('fkProductVariantListCtrl', fkProductVariantListCtrl)
  .controller('fkProfileButtonCtrl', fkProfileButtonCtrl)
  .controller('fkPromoCodeCtrl', fkPromoCodeCtrl)
  .controller('fkQuantityDropDownSelectorCtrl', fkQuantityDropDownSelectorCtrl)
  .controller('fkQuantitySelectorCtrl', fkQuantitySelectorCtrl)
  .controller('fkReceiptButtonCtrl', fkReceiptButtonCtrl)
  .controller('fkReceiptCtrl', fkReceiptCtrl)
  .controller('fkRefineButtonCtrl', fkRefineButtonCtrl)
  .controller('fkSearchButtonCtrl', fkSearchButtonCtrl)
  .controller('fkSearchCtrl', fkSearchCtrl)
  .controller('fkSecondaryHeaderCtrl', fkSecondaryHeaderCtrl)
  .controller('fkSectionHeroCtrl', fkSectionHeroCtrl)
  .controller('fkSectionCtrl', fkSectionCtrl)
  .controller('fkSectionMoreCtrl', fkSectionMoreCtrl)
  .controller('fkSessionExpiredCtrl', fkSessionExpiredCtrl)
  .controller('fkSignInButtonCtrl', fkSignInButtonCtrl)
  .controller('fkSignInFormCtrl', fkSignInFormCtrl)
  .controller('fkSignInCtrl', fkSignInCtrl)
  .controller('fkSortOptionsCtrl', fkSortOptionsCtrl)
  .controller('fkTabCtrl', fkTabCtrl)
  .controller('fkTabsCtrl', fkTabsCtrl)
  .controller('fkTermsPopupCtrl', fkTermsPopupCtrl)
  .controller('fkZipCheckFormCtrl', fkZipCheckFormCtrl)
  .controller('fkZipCheckCtrl', fkZipCheckCtrl)
  .controller('fkZipEmailNotificationCtrl', fkZipEmailNotificationCtrl)
  .controller('fkZipEmailNotifyCompleteCtrl', fkZipEmailNotifyCompleteCtrl)
  .controller('fkZipEmailRegistrationCtrl', fkZipEmailRegistrationCtrl)
  .controller('fdModuleGroupCtrl', fdModuleGroupCtrl)
  .controller('fdEditorialContentCtrl', fdEditorialContentCtrl)
  .controller('fdProductCarouselCtrl', fdProductCarouselCtrl)
  .controller('fdSectionCtrl', fdSectionCtrl)
  .controller('fdIconTileListCtrl', fdIconTileListCtrl)
  .controller('fdDeliveryTimeslotsCtrl', fdDeliveryTimeslotsCtrl)
  .controller('fdDeliveryDaysCtrl', fdDeliveryDaysCtrl)
  .controller('fdTimeslotsCtrl', fdTimeslotsCtrl)
  .controller('fdPagerCtrl', fdPagerCtrl)
  .controller('fdWelcomePopupCtrl', fdWelcomePopupCtrl)
  .controller('fdConfirmNewSiteCtrl', fdConfirmNewSiteCtrl)
  .controller('fkReceiptPopupCtrl', fkReceiptPopupCtrl)
  .name;
