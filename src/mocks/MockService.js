import Message from "../domain/Message";
import {
  Bot
} from './UserBot';
import {
  doencasMock,
  getDefaultTimestamp
} from "./Desafio2";

export class MockService {
  get rawMessage() {
    return 'Lorem ipsum dolor sit amet consectetur adipiscing elit,Sed do eiusmod tempor lorem ipsum incididunt ut labore et dolore magna aliqua ipsum, Ut lorem ipsum enim ad minim veniam quis nostrud exercitation, Lorem Ullamco Lipsum laboris nisi dolor ut aliquip ex ea commodo consequat lorem ipsum, Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore, lorem ipsum eu fugiat nulla pariatur dolor sir amet, Lipsum excepteur sint occaecat cupidatat non proident sunt in culpa qui officia deserunt mollit lorem ipsum anim id est laborum.';
  }

  get splitedMessage() {
    return this.rawMessage.split(',');
  }

  get randomIndex() {
    return Math.floor(Math.random() * this.splitedMessage.length);
  }

  get randomNumber() {
    return Math.floor(Math.random() * 4000) + 1; // ate 5 s
  }

  get randomResponses() {
    return Math.floor(Math.random() * 2) + 1; // ate 10 s
  }
  // Esse servico eh mock que envia um array de respostas simulando uma api
  mockMessage(message) {
    return new Promise(resolve => {
      setTimeout(() => {
        const now = Date.now();
        const numResponses = this.randomResponses;
        let responses = [...Array(numResponses)].map((item, index) => {
          return new Message({
            body: `${this.splitedMessage[this.randomIndex]}`,
            date: now + (index * (parseInt(this.randomNumber / numResponses))), // Um mock para simular o tempo da resposta
            user: Bot.getCurrentBot()
          })
        });
        // insiro a mensagem do usuario no stack simulando serviço que buscou pilha de respostas
        responses.unshift(message);
        return resolve(responses);
      }, this.randomNumber);
    });
  };

  mockAllMessages() {
    let now = Date.now();
    now = now - 30000; // 30 seconds ago
    return new Promise((resolve) => {
      setTimeout(() => resolve(
        [
          new Message({
            body: `Ola eu sou o atendente ${Bot.getCurrentBot().name},
            para trocar de atendente use: ${Bot.getAllBots().map(b=> `/trocar $bot ${b.name}`).join(' ou ')}`,
            date: now,
            user: Bot.getCurrentBot()
          })
        ]
      ), 3000);
    })
  }

  static initializeAdditionalMocks() {
    // mock stack contacts
    MockService.contacts = [];
    Bot.getAllBots().forEach(bot => {
      MockService.contacts.push(bot);
    });
  }

  // simulando uma api simples de add 
  static mockContact(contact) {
    return new Promise(resolve => {
      setTimeout(() => {
        MockService.contacts.push(contact)
        resolve();
      }, 2000);
    })
  }

  static mockAllContacts() {
    return new Promise((resolve) => {
      setTimeout(() => resolve(MockService.contacts), 3000);
    })
  }

  static getContactSelected(botName) {
    return new Promise(resolve => {
      let contactList = Bot.getAllBots().concat(MockService.contacts);
      contactList.forEach(bot => {
        // brincadeira onde troco de bot
        if (bot.name.indexOf(botName) !== -1) {
          resolve(bot);
        }
      });
      // contato n encontrado
      resolve(null);
    });
  }

  static getDoencasMock() {
    return new Promise(resolve => {
      resolve(doencasMock);
    })
  }
  // Esse caso e redundante  mas se fosse um sistema externo que enviasse metodos seria dessa forma
  static getDefaultSelectedTimesTamp() {
    return getDefaultTimestamp
  }

}