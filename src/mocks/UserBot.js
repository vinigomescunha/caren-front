import {
  User
} from '../domain';
import {
  USER
} from '../enums';
// mock de usuario bot
export const userBot = new User({
  type: USER.ANOTHER,
  name: 'BOT',
  picture: '/bot-mini.png',
  description: `/trocar $bot BOT`
});

export const userBot2 = new User({
  type: USER.ANOTHER,
  name: 'BOT 2',
  picture: '/bot2-mini.png',
  description: `/trocar $bot BOT 2`
});

export const userBot3 = new User({
  type: USER.ANOTHER,
  name: 'BOT 3',
  picture: '/bot3-mini.png',
  description: `/trocar $bot BOT 3`
});

export class Bot {

  static getAllBots() {
    return [userBot, userBot2, userBot3];
  }

  static setCurrentBot(bot) {
    Bot.current = bot;
  }
  static getCurrentBot() {
    return Bot.current;
  }
}
export const userMe = new User({
  type: USER.LOGGED,
  name: 'Eu',
  picture: '' // Nao sera usado, chat n mostra foto do usuario atual fica bizarro
});