class FkFooterCtrl {
  constructor(fkUtils) {
    this.fkUtils = fkUtils;

    this.$postLink = () => {
      this.footerContent = {
        top: "Back to top",
        message: "Stay in Touch. Be the first to find out about our offers and free food giveaways. Signup for our newsletter."
      };
    };

    this.goToTop = fkUtils.goToTop;
  }

}

FkFooterCtrl.$inject = ['fkUtils'];

export default FkFooterCtrl;
