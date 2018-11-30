import angular from 'angular';

import fkA11yClick from './fkA11yClick';
import fkCartLineItem from './fkCartLineItem';
import fkChange from './fkChange';
import fkHref from './fkHref';
import fkIcon from './fkIcon';
import fdLogo from './fdLogo';
import fkMouseSlow from './fkMouseSlow';
import fkTrackClick from './fkTrackClick';
import fkTouch from './fkTouch';
import fkFormFieldCompare from './fkFormFieldCompare';
import fkClick from './fkClick';


export default angular.module('fkDirectives', ['ngCookies'])
  .directive('fkA11yClick', fkA11yClick)
  .directive('fkCartLineItem', fkCartLineItem)
  .directive('fkChange', fkChange)
  .directive('fkHref', fkHref)
  .directive('fkIcon', fkIcon)
  .directive('fkLogo', fdLogo)
  .directive('fkMouseSlow', fkMouseSlow)
  .directive('fkTrackClick', fkTrackClick)
  .directive('fkTouch', fkTouch)
  .directive('fkFormFieldCompare', fkFormFieldCompare)
  .directive('fkClick', fkClick)
  .name;
