import React from 'react';
import { TEMPLATE } from '../enums';

// ia fazer um factory mas ia ficar complexo a implementacao de sub templates
import { ContactComponent, ChatComponent, DesafioP2Component, MainComponent, NaoExisteComponent } from './partials';

const TemplateBuilder = (props) => {
  switch (props.type) {
    case TEMPLATE.MAIN:
      return <MainComponent data={props.data} />
    case TEMPLATE.CONTACT:
      return <ContactComponent data={props.data} />
    case TEMPLATE.CHAT:
      return <ChatComponent data={props.data} />
    case TEMPLATE.DESAFIO_P2:
      return <DesafioP2Component data={props.data} />
    default:
      // nao compoe um template 
      return <NaoExisteComponent />;
  }

};

export default TemplateBuilder;