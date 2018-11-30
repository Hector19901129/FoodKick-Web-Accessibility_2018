class FkETippingFormCtrl {
  constructor($scope, fkCartService, fkUserService) {
    this.$scope = $scope;
    this.fkCartService = fkCartService;
    this.fkUserService = fkUserService;

    this.tipRange = fkUserService.configuration && fkUserService.configuration.tipRange || '0,25,0.5;';

    $scope.tipData = {
      amount: {value: fkCartService.cartDetail && fkCartService.cartDetail.tip || "0"}
    };

    $scope.formDescriptor = {
      id: 'etipping',
      actions: [
        {
          name: "submit",
          type: "submit",
          action: (desc, data, origData, helpers) => {
            fkCartService.setTip(data.amount.value).then(rData => {
              helpers.handleErrors(rData);

              if (rData.status && rData.status === 'SUCCESS') {
                $scope.$emit('fk-tip-set', {tip: data.amount.value});
              }
            });
          },
          label: "Ok"
        }
      ],
      fields: [
        {
          name: 'amount',
          type: 'select',
          noEmptyOption: true,
          options: this.generateAmounts(...this.tipRange.substring(0, this.tipRange.length-1).split(',').map(e => +e))
        }
      ]
    };

    $scope.$on('fk-configuration', (e, data) => {
      this.setTipRange(data.configuration.tipRange);
    });

    $scope.$on('fk-cart-changed', (e, data) => {
      $scope.tipData.amount = {value: data && data.tip || 0};
    });
  }

  generateAmounts(min, max, inc) {
    let i, amounts = [];

    min = min || 0;
    max = max || 25;
    inc = inc || .5;

    for (i = min; i <= max; i+=inc) {
      amounts.push({
        name: "$"+i.toFixed(2),
        value: ""+i
      });
    }

    return amounts;
  }

  setTipRange(tr) {
    if (tr !== this.tipRange) {
      this.tipRange = tr;
      this.$scope.formDescriptor.fields[0].options = this.generateAmounts(...tr.substring(0, tr.length-1).split(',').map(e => +e));
    }
  }

}

FkETippingFormCtrl.$inject = ['$scope', 'fkCartService', 'fkUserService'];

export default FkETippingFormCtrl;
