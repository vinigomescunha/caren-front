import {
  MockService
} from './MockService';
const service = new MockService();
export class MockAdapter {
  static getAllMessages() {
    return service.mockAllMessages();
  }
  static postMessage(message) {
    return service.mockMessage(message);
  }
}