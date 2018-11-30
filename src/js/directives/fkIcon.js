import './../../css/fkIcon.css';

const fkIcon = () => {
  return {
    restrict:'AE',
    template: '<svg><use xlink:href="{{fkIconId}}"></use></svg><ng-transclude></ng-transclude>',
    scope: {
      fkIconId:'@'
    },
    transclude:true
  };
};

export default fkIcon;
