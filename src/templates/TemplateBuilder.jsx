import React from 'react';
import { TEMPLATE } from '../enums/Templates';
import { STATUS } from '../enums/Status';
import EVENTS from '../enums/Events';
import logo from '../assets/logo.png';
import contact from '../assets/contact.png';
import camera from '../assets/camera.png';

const TemplateBuilder = (props) => {
  switch (props.type) {
    case TEMPLATE.MAIN:
      return (
        <div>
          <nav className="main-nav">
            <div className="item-nav" onClick={props.data.listeners.switchMenu} title="Contato">
              <img className="main-logo" alt="Contato medico" src={contact} />
            </div>
            <div className="item-nav">
              <img className="main-logo" alt="cruz de enfermaria" title="Logo" src={logo} />
            </div>
            <div className="item-nav">
              <img className="main-logo" alt="titar-foto" title="Camera tirar foto" src={camera} />
            </div>
          </nav>
          <header className="main-header">
            <TemplateBuilder
              type={
                props.data.eventMenu === EVENTS.DISPLAY_CHAT ? TEMPLATE.CHAT : TEMPLATE.CONTACT
              }
              data={
                props.data
              }
            />
          </header>
        </div>
      );
    case TEMPLATE.CONTACT:
      return (
        <div>
          <div className="modal" onClick={props.data.listeners.switchMenu}></div>
          <div className="modal-container">
            Lista de contatos
          {props.data.contacts.map((m, index) => (<li key={index}>{m.name} {m.picture}</li>))}
          </div>
        </div>
      );
    case TEMPLATE.CHAT:
      return (
        <div className="chat-container">
          {props.data.messages.map((m, index) => (<div key={`L${index}`} className="list" data-dialog={m.user.name === 'OWNER' ? 'OWNER': 'BOT'}><span key={index}>{m.body} <b>{m.date}</b></span></div>))}
          <span className="load">{props.data.status === STATUS.LOADED ? '' : props.data.status}</span>
          <form onSubmit={props.data.listeners.add}>
            <p className="action">
              <input data-chat-input type="text"
                onKeyDown={props.data.listeners.add}
                ref={(ref) => props.data.ref = ref}
                placeholder="Digite aqui..."
              />
            </p>
          </form>
        </div>
      );
    default:
      // nao compoe um template 
      return ('TEMPLATE RENDERIZADO INCORRETAMENTE');
  }

};

export default TemplateBuilder;