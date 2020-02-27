import React from "react";
import { MockAdapter } from '../../mocks';
import { STATUS } from '../../enums';

export default class ContactComponent extends React.Component {
  // eslint-disable-next-line no-useless-constructor
  constructor(props) {
    super(props);
    this.contact = React.createRef();
    this.showHide = this.showHide.bind(this);
    this.useBot = this.useBot.bind(this);
    this.addContact = this.addContact.bind(this);
    // this.listeners = this.props.data.listeners; perde o bind
  }
  // helper criado p ordenar contatos
  orderHelper(stack) {
    return stack.sort((a, b) => a.name.localeCompare(b.name));
  }
  // pertinente somente a esse componente
  showHide(e) {
    e.preventDefault();
    if (this.contact.current) {
      this.contact.current.querySelectorAll('[data-display]').forEach(e => {
        const dataDisplay = e.getAttribute('data-display');
        const isDisplay = dataDisplay === true || dataDisplay === "true";
        e.setAttribute('data-display', !isDisplay);
      });
    }
  }
  addContact(e) {
    e.persist();
    this.props.data.listeners.addContact(e)
      .then(res => {
        this.showHide(e);
      });
  }
  // TODO: Analise de melhor local pra inserir os tratamentos de dados
  useBot(e) {
    MockAdapter.setCurrentBot(e)
      .then(res => {
        this.props.data.listeners.clearMessages(new Event('click')); // aqui esta disperso, criar um modelo para manipular
        this.props.data.listeners.switchMenu(new Event('click')); // nesses casos o evento click nao precisa acontecer por padrao
      }); // nao vou colocar catch porque no momento esta como mock
  }

  render() {

    return (
      <div className="contact" ref={(ref) => { this.contact.current = ref }}>
        <div className="modal" onClick={this.props.data.listeners.switchMenu}></div>
        <div className="modal-container">

          <button className="fechar" onClick={this.props.data.listeners.switchMenu}>Fechar</button>
          {this.props.data.status === STATUS.LOADED ? '' : this.props.data.status}
          <form data-display={false} onSubmit={this.addContact}>
            <button className="cancelar" onClick={this.showHide}>Cancelar</button>
            <h2>Adicionar Contato</h2>
            <p>
              <input data-contact-name type="text" placeholder="Nome" />
            </p>
            <p>
              <input data-contact-picture type="text" placeholder="Imagem" />
            </p>
            <p>
              <input data-contact-description type="text" placeholder="Descricao" />
            </p>
            <p>
              <button type="Submit">CADASTRAR</button>
            </p>
          </form>
          <div data-display={true} className="lista-contatos">
            <button className="novo-contato" onClick={this.showHide}>Novo Contato</button>
            <h2>Lista de Contatos</h2>
            <div className="lista-container">
              {this.orderHelper(this.props.data.contacts).map(
                (m, index) => (
                  <div className="lista-item" key={index}>
                    <div>
                      <img className="item-picture" title={m.name} alt={m.name} src={m.picture} />
                      <div className="item-name">{m.name}</div>
                      <div title="Conversar com esse Bot" use-name={m.name} onClick={() => this.useBot(m.name)}> Usar</div>
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}