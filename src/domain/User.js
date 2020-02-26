import { USER } from "../enums";

export default class User {
  constructor(o) {
    this.type  = o && o.type ? o.type:USER.ANOTHER;
    this.name = o && o.name ? o.name : 'Anonymous';
    this.picture = o && o.picture ? o.picture : '/anonymous-mini.png';
    this.description = o && o.description ? o.description: '...';
  }
}