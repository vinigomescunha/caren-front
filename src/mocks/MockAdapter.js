import {
  MockService
} from './MockService';
import {
  userBot,
  Bot
} from './UserBot';
//adiciono o bot default
Bot.setCurrentBot(userBot);
// inicializo com mocks adicionais
MockService.initializeAdditionalMocks();
const service = new MockService();

export class MockAdapter {
  static isSwitch(message) {
    // poderia ser uma lista de regex e tratar cada uma como o Gherkin faz por debaixo dos panos
    return /\/trocar \$bot ([0-9A-Za-z ]*)/.exec(message.body);
  }
  static getAllMessages() {
    return service.mockAllMessages();
  }
  static async postMessage(message) {
    // verifico se e mensagem de troca de bot
    const switchMsg = MockAdapter.isSwitch(message);
    if (switchMsg) {
      await MockAdapter.setCurrentBot(switchMsg[1]);
    }
    return service.mockMessage(message);
  }
  static addContact(contact) {
    return MockService.mockContact(contact);
  }
  static getAllContacts() {
    return MockService.mockAllContacts();
  }
  static async setCurrentBot(name) {
    return new Promise(async resolve => {
      const contact = await MockService.getContactSelected(name);
      if (contact) {
        Bot.setCurrentBot(contact);
        resolve(true);
      }
    });
  }
  static getCurrentBot() {
    return Bot.getCurrentBot();
  }
  static async getDesafio2Mocks() {
   return MockService.getDoencasMock();
  }
  static defaultTimestamp() {
    return MockService.getDefaultSelectedTimesTamp();
  }
}