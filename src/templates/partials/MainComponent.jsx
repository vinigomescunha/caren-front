
import React from "react";
// poderia ter um local que controlasse os assets mas isso poderia ser problematico se usasse um varnishcache ou sistema de criacao de preset cacheado 
import logo from '../../assets/logo.png';
import contact from '../../assets/contact.png';
import camera from '../../assets/camera.png';

import TemplateBuilder from '../TemplateBuilder';
import { TEMPLATE, EVENTS } from '../../enums';

export default class MainComponent extends React.Component {
  // eslint-disable-next-line no-useless-constructor
  constructor(props) {
    super(props);
  }
  // analise do evento disparado e o template esperado
  getTemplateNameByEvent() {
    switch (this.props.data.eventMenu) {
      case EVENTS.DISPLAY_CHAT:
        return TEMPLATE.CHAT;
      case EVENTS.DISPLAY_CONTACT:
        return TEMPLATE.CONTACT;
      case EVENTS.DISPLAY_DESAFIO_P2:
        return TEMPLATE.DESAFIO_P2;
      default:
        return TEMPLATE.CHAT;
    }
  }

  render() {
    return (
      <div className="main">
        <nav className="main-nav">
          <div className="item-nav" menu={EVENTS.DISPLAY_CONTACT} onClick={this.props.data.listeners.switchMenu} title="Contato">
            <img className="main-logo" alt="Contato Medico" src={contact} />
          </div>
          <div className="item-nav" menu={EVENTS.DISPLAY_DESAFIO_P2} onClick={this.props.data.listeners.switchMenu} title="Desafio Parte 2">
            <img className="main-logo" alt="Cruz de Enfermaria" title="Logo" src={logo} />
          </div>
          <div className="item-nav" >
            <img className="main-logo" alt="Tirar foto" title="Camera tirar foto" src={camera} />
          </div>
        </nav>
        <header className="main-header">
          <TemplateBuilder
            type={
              this.getTemplateNameByEvent()
            }
            data={
              this.props.data
            }
          />
        </header>
      </div>
    );
  }

}


