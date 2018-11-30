class FkAddressService {
  constructor(fkHttp, $log, $q, fkUtils, API, fkDeliveryTimeslotService, $rootScope) {
    this.fkHttp = fkHttp;
    this.$log = $log;
    this.$q = $q;
    this.fkUtils = fkUtils;
    this.API = API;
    this.fkDeliveryTimeslotService = fkDeliveryTimeslotService;
    this.$rootScope = $rootScope;

    this.selectedAddress = null;
    this.addresses = [];
  }

  _setSelectedAddress(id) {
    let selectedAddressIndex = this.addresses.map((address) => address.id).indexOf(id);
    if (selectedAddressIndex > -1) {
      this.selectedAddress = this.addresses[selectedAddressIndex];
      this.$rootScope.$broadcast('fk-selected-address-set', {});
    } else {
      this.selectedAddress = null;
    }
  }

  reset() {
    this.selectedAddress = null;
    this.addresses = [];
  }

  getAddresses() {
    return this.fkHttp({
      spinner: 'address',
      method: 'GET',
      url: this.fkUtils.replaceURLParams(this.API.checkoutAddresses, {username: "username"})
    }).then((response) => {
      if (response.data.status === 'FAILED'){
        this.$log.warn('No address yet.');
      }
      if (response.data.corporateAddresses && (response.data.corporateAddresses.length > 0 || response.data.residentialAddresses.length > 0)) {
        this.addresses = (response.data.residentialAddresses || []).concat(response.data.corporateAddresses || []);
        this._setSelectedAddress( response.data.selectedId || 0 );
      }
      else {
        this.reset();
      }
      return this.addresses;
    }).catch((error) => {
      this.$log.error(error);
      return {error: error};
    });
  }

  getSelectedDeliveryAddress() {
    return this.$q.resolve(this.selectedAddress);
  }

  setDeliveryAddress(id, type) {
    let oldId = this.selectedAddress && this.selectedAddress.id;
    this._setSelectedAddress(id);
    return this.fkHttp({
      spinner: 'address',
      method: 'POST',
      dispatch: true,
      url: this.fkUtils.replaceURLParams(this.API.setDeliveryAddress, {username: "username"}),
      headers: {'Content-Type': 'application/x-www-form-urlencoded'},
      data: this.fkUtils.postData({id: id, type: type})
    }).then((response) => {
      if (response.data.status === 'FAILED'){
        this.$log.warn('Invalid address.');
        this._setSelectedAddress(oldId);
        return {errors: response.data.errors};
      }
      return this.addresses;
    }).catch((error) => {
      this.$log.error(error);
      return {error: error};
    });
  }
}

FkAddressService.$inject = ['fkHttp', '$log', '$q', 'fkUtils', 'API', 'fkDeliveryTimeslotService', '$rootScope'];

export default FkAddressService;
