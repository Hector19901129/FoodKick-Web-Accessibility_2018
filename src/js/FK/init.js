// Initialization of AngularJS modules

// external JS libraries
import angular from 'angular';
import uiRouter from 'angular-ui-router';
import ngSanitize from 'angular-sanitize';
import vcRecaptcha from 'angular-recaptcha';
import ngAnimate from 'angular-animate';
import 'angular-lazy-img';
import 'mousespeed.js';
import ngTouch from 'angular-touch';
import ngDialog from 'ng-dialog';
import '../../../node_modules/ng-dialog/css/ngDialog.css';
import '../../../node_modules/ng-dialog/css/ngDialog-theme-default.css';


// general css files
import 'init.css';

// SVG icons
import initIcons from './icons';
initIcons();

// our angular modules
import fkServices from '../services/fkServices';
import fkControllers from '../controllers/fkControllers';
import fkFilters from '../filters/fkFilters';
import fkProviders from '../providers/fkProviders';
import fkDirectives from '../directives/fkDirectives';
import fkComponents from '../components/fkComponents';

// constants
import SITEConstants from '../constants/FKSITE';
import MAPSKey from '../constants/MAPSKey';
import DELIVERYTYPES from '../constants/DELIVERYTYPES';
import FORMConstans from '../constants/FORMS';
import APIConstants from '../constants/API';
import CAPTCHAKEY from '../constants/CAPTCHAKEY';

import CONFIG from 'config';

import initApp from './app';

( function () {

  angular.module( 'foodkickAbstractApp', [
    uiRouter,
    ngSanitize,
    vcRecaptcha,
    fkControllers,
    fkDirectives,
    fkComponents,
    fkServices,
    fkFilters,
    fkProviders,
    ngAnimate,
    ngDialog,
    ngTouch,
    'angularLazyImg'
  ] )
  .constant('API', APIConstants)
  .constant('FORMS', FORMConstans)
  .constant('SITE', SITEConstants)
  .constant('MAPS_API_KEY', MAPSKey)
  .constant('CAPTCHAKEY', CAPTCHAKEY)
  .constant('DELIVERYTYPE', DELIVERYTYPES)
  .constant('CONFIG', CONFIG)
  .config( [ 'ngDialogProvider', function ( ngDialogProvider ) {
    ngDialogProvider.setDefaults( {
      className: 'ngdialog-theme-default ngdialog-theme-fk',
      showClose: false,
      closeByNavigation: true,
      preCloseCallback: () => {
        // remove focus from anything inside the closed popup
        if (document.activeElement) {
          document.activeElement.blur();
        }
      }
    } );
  } ] );


  angular.module( 'foodkickApp', [
    'foodkickAbstractApp'
  ] );

  initApp();

}() );
