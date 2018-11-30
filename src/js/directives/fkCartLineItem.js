import fkCartLineItemTemplate from './../../templates/fkCartLineItem.html';
import './../../css/fkCartLineItem.css';

const fkCartLineItem = () => {
  return {
    restrict: 'AE',
    template: fkCartLineItemTemplate,
    scope: {
      lineItem: '='
    },
    controller: ['$scope', '$rootScope', 'fkCartService', ($scope, $rootScope, fkCartService) => {
      let variationValues = {};
      $scope.fkCartService = fkCartService;

      $scope.$watch(() => $scope.lineItem, () => {
        if ($scope.lineItem && $scope.lineItem.productConfiguration && $scope.lineItem.productConfiguration.productPotato && $scope.lineItem.productConfiguration.productPotato.productData && $scope.lineItem.productConfiguration.productPotato.productData.variations) {
          $scope.lineItem.productConfiguration.productPotato.productData.variations
            .reduce((prev, variation) => prev.concat(variation.values), [])
            .reduce((prev, value) => {
              prev[value.name] = value.label;
              return prev;
            }, variationValues);
        }
      });

      if ($scope.lineItem && $scope.lineItem.dlvPassProduct) {
        $scope.$emit('fk-cart-dpItem', {lineItem: $scope.lineItem});
      }

      $scope.delete = () => {
        $scope.$emit('fk-cart-change', {lineItem: $scope.lineItem, method: 'delete'});
      };

      $scope.openPDP = (pdpFeedType, product, id, ev) => {
        if (ev && ev.preventDefault) {
          ev.preventDefault();
          ev.stopPropagation();

          // report product click event
          $scope.$emit('fk-product-tile-clicked', {product: product});
        }
        product.productData.productId = id;
        $rootScope.$broadcast('fk-pdp-open',{
          product: product,
          pdpFeedType: pdpFeedType
        });
      };

      $scope.$on('fk-quantity-change', (ev, data) => {
        $scope.lineItem.productConfiguration.quantity = data.quantity;
        $scope.$emit('fk-cart-change', {lineItem: $scope.lineItem, method: 'change'});
      });

      $scope.hasConfig = () => $scope.lineItem && Object.keys($scope.lineItem.productConfiguration.options).length > 0;

      $scope.renderOptions = () => {
        if ($scope.lineItem) {
          let options = $scope.lineItem.productConfiguration.options || {};
          return Object.keys(options).map(key => variationValues[options[key]]);
        }
        return '';
      };
    }]
  };
};

export default fkCartLineItem;
