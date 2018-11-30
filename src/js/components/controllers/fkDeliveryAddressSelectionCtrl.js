class FkDeliveryAddressSelectionCtrl {
  constructor($scope, $state, fkAddressService, fkDeliveryTimeslotService, ngDialog) {
    this.$scope = $scope;
    this.$state = $state;
    this.fkAddressService = fkAddressService;
    this.fkDeliveryTimeslotService = fkDeliveryTimeslotService;
    this.ngDialog = ngDialog;

    $scope.fkDeliveryTimeslotService = fkDeliveryTimeslotService;
    $scope.fkAddressService = fkAddressService;
    $scope.selectedTimeslot = null;
    $scope.show = null;
    $scope.expired = null;
    $scope.errors = {};

    $scope.isHidden = type => $scope.show !== null && $scope.show !== type ? 'hidden' : '';

    $scope.isError = variable => variable && $scope.error() ? 'error' : '';

    $scope.isSelected = type => $scope.show === type ? 'selected' : '';

    $scope.isSelectedDone = type => $scope.show === type ? 'selected-done' : '';

    $scope.isSelectedElem = type => $scope.show === type ? 'done' : 'hidden';

    $scope.elemSelector = type => $scope.show === type ? '' : 'hidden';

    $scope.hideElement = type => $scope.show === type ? 'hidden' : '';

    if (fkAddressService.selectedAddress) {
      fkDeliveryTimeslotService.getTimeslots().then((responsData) => {
        $scope.selectedTimeslot = responsData.selectedTimeslot;
        $scope.timeSlotsAlert = [];
        responsData.deliveryRestrictions.forEach(function(item){
          $scope.timeSlotsAlert.push(item.message);
        });
      });
    }

    fkDeliveryTimeslotService.refreshTimeslotsCache();

    this.intervalID = null;

    $scope.$on('timeslot-selected', () => {
      if (!this.intervalID) {
        this.intervalID = setInterval(() => {
          this.setRemainingTime();
        }, 1000);
      }
    });

    $scope.open = (type) => {
      if ($scope.show !== type) {
        $scope.$emit('fk-show-delivery-option', { type });
      }

      if (type !== 'tip') {
        $scope.show = type;
        $scope.tip = false;
      } else {
        $scope.tip = true;
      }
    };

    $scope.done = (ev) => {
      if (ev && ev.stopPropagation) {
        ev.stopPropagation();
      }
      $scope.show = null;
      $scope.tip = false;
    };

    $scope.learnMore = () =>{
      this.dialog = ngDialog.open({
        templateUrl: 'templates/fkDeliveryRestrictionAlert.html',
        appendClassName: 'fk-delivery-time-warning narrow',
        showClose: false,
        ariaRole: 'dialog',
        scope: $scope,
        preCloseCallback: () => {
          this.dialog = null;
        }
      });
      this.$scope.$emit('fk-popup-opened', {
        name: 'fkDeliveryRestrictionAlert',
        type: 'Info Page'
      });
    };

    $scope.setSelected = (type, data) => {
      $scope.show = null;
      if (type === 'timeslot') {
        $scope.selectedTimeslot = data;
        $scope.timeslot = false;
        $scope.expired = null;
      }
      if (type === 'address') {
        fkDeliveryTimeslotService.refreshTimeslotsCache();
      }
    };

    $scope.accounts = () => {
      $state.go('account.detail', { partial: 'addresses' });
    };

    this.$onDestroy = () => {
      clearInterval(this.intervalID);
      this.intervalID = null;
    };
  }

  setRemainingTime() {
    this.$scope.remainingTime = Math.max(this.fkDeliveryTimeslotService.timeslot.selectedTimeslot.cutoffDateDate - Date.now(), 0);
  }
}

FkDeliveryAddressSelectionCtrl.$inject = ['$scope', '$state', 'fkAddressService', 'fkDeliveryTimeslotService', 'ngDialog'];

export default FkDeliveryAddressSelectionCtrl;
