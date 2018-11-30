class FkPromoCodeCtrl {
  constructor($scope, $element, fkCartService, fkPromoCodeService) {
    this.$scope = $scope;
    this.$element = $element;
    this.fkCartService = fkCartService;
    this.fkPromoCodeService = fkPromoCodeService;

    this.promoFormInit();
    this.dpPromoInit();
    this.$scope.code = {
      promoCode: null
    };

    $scope.$on('fk-promo-code-problem', (ev, data) => {
      if (data && data.warningMessage) {
        $scope.errorMessage = data.warningMessage;
      }
    });

    $scope.$on('fk-dp-promo-code-error', (ev, data) => {
      if (data && data.warningMessage) {
        $scope.dpError = data.warningMessage;
      }
    });
  }

  setPromoStatus(setClass, show, message, promoApplied) {
    this.promoStatus = {
      class: setClass,
      show: show,
      message: message
    };
    this.promoApplied = promoApplied;
  }

  promoFormInit() {
    this.fkCartService.viewCartlines().then(data => {
      let response = data;
      this.$scope.errorMessage = "";
      if (response.status === 200 && response.data.cartDetail.discounts.length > 0) {
        for (let i = 0; i < response.data.cartDetail.discounts.length; i++) {
          if (response.data.cartDetail.discounts[i].automatic === false) {
            this.$scope.code.promoCode = response.data.cartDetail.discounts[i].redemptionCode;
            this.setPromoStatus(true, true, "Applied", true);
          }
        }
      } else if (response.status === 200 && response.data.cartDetail.redemptionPromotions.length > 0) {
        for (let i = 0; i < response.data.cartDetail.redemptionPromotions.length; i++) {
          this.$scope.code.promoCode = response.data.cartDetail.redemptionPromotions[i].redemptionCode;
          this.$scope.errorMessage = response.data.cartDetail.redemptionPromotions[i].warningMessage;
          this.setPromoStatus(true, true, "Applied", true);
        }
      } else {
        this.$scope.code.promoCode = '';
      }
    });
  }

  dpPromoInit() {
    this.fkCartService.getDpCartlines().then(data => {
      let response = data;
      this.$scope.dpError = "";
      if (response.status === 200 && response.data.cartDetail.discounts.length > 0) {
        for (let i = 0; i < response.data.cartDetail.discounts.length; i++) {
          if (response.data.cartDetail.discounts[i].automatic === false) {
            this.$scope.code.promoCode = response.data.cartDetail.discounts[i].redemptionCode;
            this.setPromoStatus(true, true, "Applied", true);
          }
        }
      } else if (response.status === 200 && response.data.cartDetail.redemptionPromotions.length > 0) {
        for (let i = 0; i < response.data.cartDetail.redemptionPromotions.length; i++) {
          this.$scope.code.promoCode = response.data.cartDetail.redemptionPromotions[i].redemptionCode;
          this.$scope.dpError = response.data.cartDetail.redemptionPromotions[i].warningMessage;
          this.setPromoStatus(true, true, "Applied", true);
        }
      } else {
        this.$scope.code.promoCode = '';
      }
    });
  }

  applyPromoCode(promoCode, dpCart) {
    return this.fkPromoCodeService.validPromoCode(promoCode, dpCart).then(data => {
      if (data.status === 'SUCCESS') {
        if (this.dpCart){
          this.fkCartService.getDpCartlines();
        } else {
          this.fkCartService.getOrderDetail();
        }
        this.promoApplied = true;
        this.showApply = false;
        this.promoStatus = {
          class: true,
          show: true,
          message: "APPLIED"
        };
        this.$scope.errorMessage = "";
        this.$scope.dpError = "";
      } else {
        this.promoStatus = {
          class: false,
          show: false,
          message: ""
        };
        this.$scope.errorMessage = data.errors && Object.keys(data.errors).map(k => data.errors[k]).join('<br>');
        this.$scope.dpError = data.errors && Object.keys(data.errors).map(k => data.errors[k]).join('<br>');
      }

    });
  }

  removePromoCode(promoCode, dpCart) {
    return this.fkPromoCodeService.removePromoCode(promoCode, dpCart).then(data => {
      if (data.status === 'SUCCESS') {
        if (this.dpCart){
          this.fkCartService.getDpCartlines();
        } else {
          this.fkCartService.getOrderDetail();
        }
        this.$scope.code.promoCode = '';
        this.promoApplied = this.promoStatus.show = false;
        this.$scope.errorMessage = "";
        this.$scope.dpError = "";

      }
    });
  }

  validatePromo(promoCode, dpCart) {
    this.applyPromoCode(promoCode, dpCart);
  }

  removePromo(promoCode, dpCart) {
    this.removePromoCode(promoCode, dpCart);
  }

}

FkPromoCodeCtrl.$inject = ['$scope', '$element', 'fkCartService', 'fkPromoCodeService'];

export default FkPromoCodeCtrl;
