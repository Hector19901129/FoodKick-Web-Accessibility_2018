import './../../css/404.css';

class Fk404Ctrl {
  constructor(fkBoldChatService) {
    this.fkBoldChatService = fkBoldChatService;

    document.getElementsByName('prerender-status-code')[0].setAttribute('content', '404');
    document.getElementsByName('description')[0].setAttribute('content', "Product not found");
  }

  triggerChat() {
    this.fkBoldChatService.triggerChat();
  }

}

Fk404Ctrl.$inject = ['fkBoldChatService'];

export default Fk404Ctrl;
