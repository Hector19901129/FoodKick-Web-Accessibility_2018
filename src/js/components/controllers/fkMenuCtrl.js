class FkMenuCtrl {
  constructor($rootScope, fkUserService, fkBoldChatService) {
    this.$rootScope = $rootScope;
    this.userService = fkUserService;
    this.fkBoldChatService = fkBoldChatService;

    this.items = {
      BROWSE: 1,
      ACCOUNT: 2,
      CHAT: 3
    };

    this.selected = this.items.BROWSE;
  }

  isSelected(item) {
    return item === this.selected;
  }

  setSelected(item) {
    this.selected = item;

    return item;
  }

  navigate(itemId) {
    this.onNavigate({itemId: itemId});
  }

  closeMenu(itemId) {
    document.getElementById('page-content').focus();
    this.onNavigate({itemId: itemId});
  }

  leaveMenu() {
    this.onLeave();
  }

  signIn() {
    this.onLeave();
    this.$rootScope.$broadcast( 'fk-account-signIn', {} );
  }

  signUp() {
    this.$rootScope.$broadcast( 'fk-account-signUp', {} );
  }

  triggerChatPopup() {
    this.$rootScope.$broadcast( 'open-contact-us', {} );
  }

}

FkMenuCtrl.$inject = ['$rootScope', 'fkUserService', 'fkBoldChatService'];

export default FkMenuCtrl;
