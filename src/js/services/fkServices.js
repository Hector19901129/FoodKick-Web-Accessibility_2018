import angular from 'angular';
import 'angular-cookies';

import fkHttpFactory from './fkHttp';

import FkUtils from './fkUtils';
import FkDeliveryTimeslotService from './fkDeliveryTimeslotService';
import FkAddressService from './fkAddressService';
import FkProductService from './fkProductService';
import FkUserService from './fkUserService';
import FkBoldChatService from './fkBoldChatService';
import FkCarouselService from './fkCarouselService';
import FkCartService from './fkCartService';
import FkCartUtilsService from './fkCartUtilsService';
import FkCategoryService from './fkCategoryService';
import FkDoubleClickService from './fkDoubleClickService';
import FkEmailAndPasswordService from './fkEmailAndPasswordService';
import FkFeedService from './fkFeedService';
import FkFoodSafetyService from './fkFoodSafetyService';
import FkGlobalNavService from './fkGlobalNavService';
import FkHelpPagesService from './fkHelpPagesService';
import FkMetaService from './fkMetaService';
import FkModifiableOrders from './fkModifiableOrders';
import FkNotificationsService from './fkNotificationsService';
import FkOrderModifyService from './fkOrderModifyService';
import FkOrderService from './fkOrderService';
import FkPastItemsService from './fkPastItemsService';
import FkRecommendationsService from './fkRecommendationsService';
import FkAlcoholRestrictedService from './fkAlcoholRestrictedService';
import FkTimeslotTimerService from './fkTimeslotTimerService';
import FkZipEmailNotificationService from './fkZipEmailNotificationService';
import FkSearchService from './fkSearchService';
import FkReceiptService from './fkReceiptService';
import FkPromoCodeService from './fkPromoCodeService';
import FkProductDetailService from './fkProductDetailService';
import FkPaymentMethodService from './fkPaymentMethodService';
import FkAnalyticsService from './fkAnalyticsService';
import FkReferalService from './fkReferalService';
import FkDeliveryPassService from './fkDeliveryPassService';
import FkBrowserService from './fkBrowserService';

export default angular.module('fkServices', ['ngCookies'])
  .factory('fkHttp', fkHttpFactory)
  .service('fkUtils', FkUtils)
  .service('fkBoldChatService', FkBoldChatService)
  .service('fkCarouselService', FkCarouselService)
  .service('fkCartService', FkCartService)
  .service('fkCartUtilsService', FkCartUtilsService)
  .service('fkCategoryService', FkCategoryService)
  .service('fkAlcoholRestrictedService', FkAlcoholRestrictedService)
  .service('fkDeliveryTimeslotService', FkDeliveryTimeslotService)
  .service('fkDoubleClickService', FkDoubleClickService)
  .service('fkAddressService', FkAddressService)
  .service('fkProductService', FkProductService)
  .service('fkEmailAndPasswordService', FkEmailAndPasswordService)
  .service('fkFeedService', FkFeedService)
  .service('fkFoodSafetyService', FkFoodSafetyService)
  .service('fkGlobalNavService', FkGlobalNavService)
  .service('fkHelpPagesService', FkHelpPagesService)
  .service('fkMetaService', FkMetaService)
  .service('fkModifiableOrders', FkModifiableOrders)
  .service('fkNotificationsService', FkNotificationsService)
  .service('fkOrderModifyService', FkOrderModifyService)
  .service('fkOrderService', FkOrderService)
  .service('fkPastItemsService', FkPastItemsService)
  .service('fkRecommendationsService', FkRecommendationsService)
  .service('fkUserService', FkUserService)
  .service('fkTimeslotTimerService', FkTimeslotTimerService)
  .service('fkZipEmailNotificationService', FkZipEmailNotificationService)
  .service('fkSearchService', FkSearchService)
  .service('fkReceiptService', FkReceiptService)
  .service('fkPromoCodeService', FkPromoCodeService)
  .service('fkProductDetailService', FkProductDetailService)
  .service('fkPaymentMethodService', FkPaymentMethodService)
  .service('fkAnalyticsService', FkAnalyticsService)
  .service('fkReferalService', FkReferalService)
  .service('fkDeliveryPassService', FkDeliveryPassService)
  .service('fkBrowserService', FkBrowserService)
  .name;
