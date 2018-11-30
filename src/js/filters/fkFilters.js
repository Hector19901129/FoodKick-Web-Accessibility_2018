import angular from 'angular';

import fkSlug from './fkSlug';
import fkGreetingFilter from './fkGreetingFilter';
import { fkMoneyCvp, fkMoney } from './fkMoneyFilter';
import { fkTime, fkShortTime, fkDateTime, fkDeliveryTime, fkTimeDifference, fkDayDate, fkDate, fkRedemptionAmount, fkTimeSlot, fkOrderTime, fkHeaderDeliveryTime} from './fkTime';

import fkURL from './fkURLFilter';

export default angular.module('fkFilters', ['fkServices'])
  .filter('fkSlug', fkSlug)
  .filter('fkGreetingFilter', fkGreetingFilter)
  .filter('fkMoneyCvp', fkMoneyCvp)
  .filter('fkMoney', fkMoney)
  .filter('fkTime', fkTime)
  .filter('fkShortTime', fkShortTime)
  .filter('fkDateTime', fkDateTime)
  .filter('fkDeliveryTime', fkDeliveryTime)
  .filter('fkTimeDifference', fkTimeDifference)
  .filter('fkDayDate', fkDayDate)
  .filter('fkURL', fkURL)
  .filter('fkDate', fkDate)
  .filter('fkRedemptionAmount', fkRedemptionAmount)
  .filter('fkTimeSlot', fkTimeSlot)
  .filter('fkOrderTime', fkOrderTime)
  .filter('fkHeaderDeliveryTime', fkHeaderDeliveryTime)
  .name;
