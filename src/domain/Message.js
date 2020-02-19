// sem interface mas...
import User from './User';
export default class Message {
  constructor(o) {
    if (!o) throw new Error('Mensagem Vazia');
    this.body = o.body ? o.body : ' - ';
    this.date = o.date ? o.date.toString() : new Date().toString();
    this.user = o.user ? o.user : new User();
  }
}