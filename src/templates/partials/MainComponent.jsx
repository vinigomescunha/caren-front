
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
    this.listeners = this.props.data.listeners;
  }

  render() {
    return (
      <div className="main">
        <nav className="main-nav">
          <div className="item-nav" onClick={this.listeners.switchMenu} title="Contato">
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
              this.props.data.eventMenu === EVENTS.DISPLAY_CHAT ? TEMPLATE.CHAT : TEMPLATE.CONTACT
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


