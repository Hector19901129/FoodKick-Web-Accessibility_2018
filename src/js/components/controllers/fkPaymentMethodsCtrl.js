class FkPaymentMethodsCtrl {
  constructor($scope, fkPaymentMethodService, ngDialog, fkUserService) {
    this.$scope = $scope;
    this.fkPaymentMethodService = fkPaymentMethodService;
    this.ngDialog = ngDialog;
    this.paymentDialog = null;
    this.fkUserService = fkUserService;
    $scope.paymentMethods = fkPaymentMethodService.paymentMethods;
    fkPaymentMethodService.refreshPaymentMethodsCache(false);
    this.piDialog = null;
    $scope.checkPayment = (event, paymentMethod, index_num) => {
      if (event.keyCode === 13) {
        
        this.selectedPayMethod = paymentMethod;
        if (this.source === 'settings') {
          $scope.setDefault('Y');
        } else if (this.source === 'cart' || 'dp') {
          if ($scope.paymentMethods.electronicChecks.length + $scope.paymentMethods.creditCards.length > 1 && (paymentMethod.cardType === 'ECheck' || paymentMethod.debitCard) && $scope.paymentMethods.defaultId !== this.selectedPayMethod.id && fkUserService.configuration.dcsenabled) {
            this.piDialog = this.ngDialog.open({
              templateUrl: 'templates/fkDefaultPaymentPopup.html',
              appendClassName: 'fk-default-payment narrow',
              showClose: false,
              scope: $scope
            });
            this.$scope.$emit('fk-popup-opened', {
              name: 'fkDefaultPaymentPopup',
              type: 'Info Page'
            });
          } else {
            $scope.setDefault();
          }
        } else {
          $scope.setDefault();
        }
        
        var ell = angular.element(document.querySelector("#panell"+index_num));
        
        angular.forEach(ell, function(value){
          value.setAttribute("aria-selected", "true");
        });
      }
    };
    $scope.closePi = () => {
      if (this.piDialog) {
        this.piDialog.close();
      }
    };

    $scope.addEdit = (validation, paymentMethod) => {
      let pm = null;

      if (paymentMethod !== null) {
        pm = paymentMethod;
      }

      this.openPaymentDialog(pm, this.paymentType, validation);
    };


    $scope.creditCardChange = () => {
      if (this.paymentDialog && this.paymentDialog.close) {
        this.paymentDialog.close();
      }
      return fkPaymentMethodService.refreshPaymentMethodsCache().then(() => this.refresh());
    };

    $scope.$on('fk-payments-changed', (e, data) => {
      $scope.paymentMethods = data.paymentMethods;
    });

    $scope.select = (paymentMethod, index_num) => {
      this.selectedPayMethod = paymentMethod;
      if (this.source === 'settings') {
        $scope.setDefault('Y');
      } else if (this.source === 'cart' || 'dp') {
        if ($scope.paymentMethods.electronicChecks.length + $scope.paymentMethods.creditCards.length > 1 && (paymentMethod.cardType === 'ECheck' || paymentMethod.debitCard) && $scope.paymentMethods.defaultId !== this.selectedPayMethod.id && fkUserService.configuration.dcsenabled) {
          this.piDialog = this.ngDialog.open({
            templateUrl: 'templates/fkDefaultPaymentPopup.html',
            appendClassName: 'fk-default-payment narrow',
            showClose: false,
            scope: $scope
          });
          this.$scope.$emit('fk-popup-opened', {
            name: 'fkDefaultPaymentPopup',
            type: 'Info Page'
          });
        } else {
          $scope.setDefault();
        }
      } else {
        $scope.setDefault();
      }
      var ell = angular.element(document.querySelector("#panell"+index_num));
        
        angular.forEach(ell, function(value){
          value.setAttribute("aria-selected", "true");
        });
    };

    $scope.setDefault = (answer) => {
      fkPaymentMethodService.setPaymentMethod(this.selectedPayMethod.id, answer, this.dpPayment).then((response) => {
        if (response.status === "SUCCESS") {

          if (this.dpPayment) {
            fkPaymentMethodService.enableDpFlag(this.dpPayment);
          }

          this.refresh();
          this.setPayment({ type: 'payment', data: this.selectedPayMethod, errors: response.errors || {} });

        } else {
          this.paymentFailed = response.errors;
          this.piDialog = this.ngDialog.open({
            templateUrl: 'templates/fkPaymentMethodFailed.html',
            appendClassName: 'fk-failed-pm narrow',
            showClose: false,
            scope: $scope
          });
          this.$scope.$emit('fk-popup-opened', {
            name: 'fkPaymentMethodFailed',
            type: 'Info Page'
          });
        }
      });

      if (this.piDialog) {
        this.piDialog.close();
      }
    };

    $scope.addEditMethod = (validation, paymentMethod) => {
      this.piDialog.close();
      let pm = null;

      if (paymentMethod !== null) {
        pm = paymentMethod;
      }
      this.openPaymentDialog(pm, this.paymentType, validation);

    };

  }

  refresh() {
    this.fkPaymentMethodService.refreshPaymentMethodsCache().then(paymentMethods => {
      this.$scope.paymentMethods = paymentMethods;
    });
  }

  openPaymentDialog(paymentMethod, paymentType, validation) {
    let template = "";
    this.$scope.validation = validation;

    if (paymentType === "electronicChecks") {
      template = !paymentMethod ? 'templates/fkPaymentPopupAddBank.html' : 'templates/fkPaymentPopupEditBank.html';
    } else {
      template = !paymentMethod ? 'templates/fkPaymentPopupAdd.html' : 'templates/fkPaymentPopup.html';
    }

    this.$scope.$emit(paymentMethod ? 'fk-payment-edit-opened' : 'fk-payment-add-opened', { paymentType, paymentMethod });

    this.$scope.paymentToEdit = paymentMethod;
    this.paymentDialog = this.ngDialog.open({
      templateUrl: template,
      appendClassName: 'fk-checkout-form narrow',
      showClose: false,
      ariaRole: 'dialog',
      scope: this.$scope
    });
  }

}

FkPaymentMethodsCtrl.$inject = ['$scope', 'fkPaymentMethodService', 'ngDialog', 'fkUserService'];

export default FkPaymentMethodsCtrl;
