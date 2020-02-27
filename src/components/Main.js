import React from 'react';

// import scss file
import '../assets/Chat.scss';
import '../assets/Contact.scss';

// chamando TemplateBuilder para criar o inicial
import TemplateBuilder from '../templates/TemplateBuilder.jsx';

// enums
import {
  EVENTS,
  STATUS,
  TEMPLATE
} from '../enums';

// adapter mock
import {
  MockAdapter,
  userMe
} from '../mocks';

// domains model ... por ai 
import {
  Message,
  User
} from '../domain';

const scrollToDown = (ref) => ref.scrollTo(0, ref.scrollHeight);
// O SPA comeca aqui
export default class Main extends React.Component {
  // Construtor
  constructor(props) {
    super(props);
    // seto o status inicial
    this.state = {
      startDate: new Date(),
      status: STATUS.LOADED,
      messages: [],
      contacts: [],
      listeners: {
        addMessage: this.addMessage.bind(this),
        addContact: this.addContact.bind(this),
        switchMenu: this.switchMenu.bind(this),
        clearMessages: this.clearMessages.bind(this),
        setRef: this.setRef.bind(this)
      },
      eventMenu: EVENTS.DISPLAY_CHAT,
      ref: React.createRef()
    };
  }
  // Hook
  async componentDidMount() {
    this.setState({
      status: STATUS.LOADING
    });
    const messages = await MockAdapter.getAllMessages();
    const contacts = await MockAdapter.getAllContacts();

    this.setState({
      status: STATUS.LOADED,
      contacts,
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
  clearMessages() {
    this.setState({
      messages: []
    });
  }
  // TODO: Analise se vale a pena manter no Main ou no Chat Component
  // TODO: Desacoplar o envio e recebimento de mensagens do Evento
  // TODO: Desacoplar o event listener para o componente
  async addMessage(e) {
    // valido o evento de enter pra enviar, se nao for nem continuo
    if (e.key && e.key !== 'Enter') {
      return;
    }
    e.preventDefault();
    let target = (e.target ? e.target : e.target.querySelector('[data-chat-input]'));
    target.setAttribute('disabled', true);
    let {
      messages
    } = this.state;
    // status de espera pela msg
    this.setState({
      status: STATUS.WAITING_SEND
    });
    if (!target.value) return;
    // espero o mock retornar os dados
    const feedback = await MockAdapter.postMessage({
      body: target.value,
      date: Date.now(),
      user: userMe
    });
    feedback.forEach(m => {
      // adiciono ao stack de mensagens
      // TODO: AnAlise de melhor local para tratar as validacoes
      messages.push(new Message(m));
    });
    target.value = '';
    // done!
    this.setState({
      status: STATUS.LOADED,
      messages
    });
    target.removeAttribute('disabled');
    target.focus();
    scrollToDown(this.state.ref);
  }
  // TODO: Analise se vale a pena manter no Main ou no Contact Component
  async addContact(e) {
    e.preventDefault();
    let target = (e.target ? e.target : e.target.querySelector('[data-chat-input]'));
    const name = target.querySelector("[data-contact-name]").value;
    const picture = target.querySelector("[data-contact-picture]").value;
    this.setState({
      status: STATUS.WAITING_ADD
    });
    await MockAdapter.addContact(new User({
      name,
      picture
    }));
    // this.forceUpdate();
    // poderia ter adicionado ao state somente o ultimo com push, nesse caso substituo todos
    const contacts = await MockAdapter.getAllContacts();
    this.setState({
      contacts,
      status: STATUS.LOADED
    });
    return true;
  }
  setRef(input) {
    this.setState({
      ref: input
    })
  }
  // Adiciono os dados que quero passar ao template 
  getData() {
    return ({
      status: this.state.status,
      contacts: this.state.contacts,
      messages: this.state.messages,
      listeners: this.state.listeners,
      eventMenu: this.state.eventMenu,
      ref: this.state.ref
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
