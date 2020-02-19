import React from 'react';
import '../assets/Chat.scss';
import TemplateBuilder from '../templates/TemplateBuilder.jsx';
import {
  STATUS
} from '../enums/Status';
import {
  TEMPLATE
} from '../enums/Templates.js';
import {
  MockAdapter
} from '../mocks/MockAdapter';
import Message from '../domain/Message.js';
import EVENTS from '../enums/Events';
import User from '../domain/User';
// O SPA comeca aqui
class Main extends React.Component {
  // Construtor
  constructor(props) {
    super(props);
    this.state = {
      startDate: new Date(),
      status: STATUS.LOADED,
      messages: [],
      contacts: [],
      listeners: {
        add: this.add.bind(this),
        switchMenu: this.switchMenu.bind(this)
      },
      eventMenu: EVENTS.DISPLAY_CHAT
    };
  }
  // Hook
  async componentDidMount() {
    this.setState({
      status: STATUS.LOADING
    });
    let messages = await MockAdapter.getAllMessages();
    this.setState({
      status: STATUS.LOADED,
      messages
    });
  }
  // Hook
  componentWillUnmount() {}
  // Hook
  componentDidUpdate(prevProps, prevState) {}
  async switchMenu(e) {
    e.preventDefault();
    let {
      eventMenu
    } = this.state;
    eventMenu = eventMenu === EVENTS.DISPLAY_CHAT ? EVENTS.DISPLAY_CONTACT : EVENTS.DISPLAY_CHAT;
    this.setState({
      eventMenu
    });
  }
  async add(e) {
    // valido o evento de enter pra enviar, se nao for nem continuo
    if (e.key && e.key !== 'Enter') {
      return;
    }
    e.preventDefault();
    let target = (e.target ? e.target : e.target.querySelector('[data-chat-input]'));
    let {
      messages,
      status
    } = this.state;
    status = STATUS.WAITING_SEND;
    this.setState({
      status
    });
    if(!target.value) return;
    // espero o mock retornar os dados
    const feedback = await MockAdapter.postMessage({
      body: target.value,
      date: new Date(),
      user: new User({
        name: 'OWNER',
        picture: ''
      })
    });
    feedback.forEach(m => {
      // adiciono ao stack de mensagens
      messages.push(new Message({
        body: m.body,
        date: m.date,
        user: m.user
      }));
    });
    target.value=''
    status = STATUS.LOADED;
    this.setState({
      status,
      messages
    });
  }
  // Adiciono os dados que quero passar ao template 
  getData() {
    return ({
      status: this.state.status,
      contacts: this.state.contacts,
      messages: this.state.messages,
      listeners: this.state.listeners,
      eventMenu: this.state.eventMenu
    });
  }
  // Renderizador, onde busco o template Builder e passo o tipo de template e os dados
  render() {
    return <TemplateBuilder
    type = {
      TEMPLATE.MAIN
    }
    data = {
      this.getData()
    }
    />;
  }
}
export default Main;