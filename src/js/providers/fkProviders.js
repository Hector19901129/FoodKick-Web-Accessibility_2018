import angular from 'angular';

import signinError from './signinErrorProvider';

export default angular.module('fkProviders', [])
  .provider('signinError', signinError)
  .name;
