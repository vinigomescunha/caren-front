export default class User {
  constructor(o) {
    this.name = o && o.name ? o.name : 'Anonymous';
    this.picture = o && o.picture ? o.picture : '';
  }
}