
import React from "react";
import moment from "moment";
import { STATUS, USER } from '../../enums';

const getDateNow = (date) => moment(new Date(parseInt(date))).locale('pt-br').fromNow();
const getDateFormat = (date) => moment(new Date(parseInt(date))).locale('pt-br').format('DD/MM/YYYY h:mm:ss a');

export default class ChatComponent extends React.Component {
  constructor(props) {
    super(props);
    this.listeners = this.props.data.listeners;
  }

  render() {
    return (
      <div ref={this.props.data.listeners.setRef} className="chat-container">
        {this.props.data.messages.map(
          (m, index) => (
            <div key={`L${index}`} className="list" data-dialog={m.user.type === USER.LOGGED ? 'OWNER' : 'BOT'}>
              <span key={index}>
                {m.user.type !== USER.LOGGED ? <span data-picture><img alt={m.user.name} src={m.user.picture} /></span> : ''}
                <span data-content>{m.body}</span>
                <b title={getDateFormat(m.date)}>{getDateNow(m.date)}</b>
              </span>
            </div>
          )
        )}
        <span className="load">
          {this.props.data.status === STATUS.LOADED ? '' : this.props.data.status}
        </span>
        <form onSubmit={this.listeners.addMessage}>
          <p className="action">
            <input data-chat-input type="text"
              onKeyDown={this.listeners.addMessage}
              placeholder="Digite aqui..."
            />
          </p>
        </form>
      </div>
    );
  }
}