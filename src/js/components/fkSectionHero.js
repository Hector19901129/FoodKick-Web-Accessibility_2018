import fkSectionHero from './../../templates/fkSectionHero.html';
import './../../css/fkSectionHero.css';

export default {
  template: fkSectionHero,
  controller: 'fkSectionHeroCtrl',
  bindings: {
    section: '<',
    module: '<',
    title: '<',
    useLazyImg: '<',
    column: '<',
    position: '<',
    products: '<',
    type:'<'
  },
  transclude: true
};
