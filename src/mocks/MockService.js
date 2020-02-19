import Message from "../domain/Message";
import User from "../domain/User";
import moment from "moment";
const userBot = new User({
  name: 'Bot',
  picture: ''
});
const getDateNow = (date) => moment(date).locale('pt-br').fromNow();
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
    message.date = getDateNow(message.date);
    return new Promise(resolve => {
      setTimeout(() => {
        const now = Date.now();
        const numResponses = this.randomResponses;
        let responses = [...Array(numResponses)].map((item, index) => {
          return new Message({
            body: `${this.splitedMessage[this.randomIndex]}`,
            date: getDateNow(now + (index * 1000)),
            user: userBot
          })
        });
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
            body: 'Ola Fulano de tal, aqui esta um mock',
            date: getDateNow(now),
            user: userBot
          })
        ]
      ), 3000);
    })
  }
}