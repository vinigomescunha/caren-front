
import React from "react";
import {
  getRemSize
} from '../../../libraries/utils';
import {
  ComposedChart, Line, Area, XAxis, YAxis, CartesianGrid, ResponsiveContainer
} from 'recharts';

export default class ButtonComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: this.props.data,
      indicatorStyle: this.props.indicatorStyle
    };
    this.indicatorRef = React.createRef();
    this.defaultButtonHeight = 110; // O tamanho do botao para compensar a altura do indicador
    this.defaultIndicatorHeight = 23; // o tamanho do indicador e 23px mas pode mudar de acordo com o dispositivo
  }
  getHistory() {
    return
  }
  // Atualizo quando atualiza as props
  componentDidUpdate(prevProps) {
    if (this.props.data !== prevProps.data) {
      this.setState({ data: this.props.data });
    }
  }
  /**
  * formatDateEnd
  * @description Apresenta o ano e caso nao tenha o valor entende-se como o dado ainda presente
  * @param {Object<{end: Date}>} data 
  * @returns {String}
  */
  formatDateEnd(data) {
    return data.end ? data.end.getFullYear() : 'present'; // como nao tem i18n vai ser na mao mesmo
  }

  getIndicatorPosition(percent) {
    const imageContainer = this.props.imageRef.current ? parseInt(getRemSize(this.props.imageRef.current)): 0;
    const size = ( imageContainer * parseInt(percent) / 100);
    const indicatorContainer = parseInt(getRemSize(this.indicatorRef.current, this.defaultIndicatorHeight))
    const buttonContainer = parseInt(getRemSize(this.props.buttonRef, this.defaultButtonHeight))
    return (size - buttonContainer/2 - indicatorContainer/2) + 'px' //(ibDifference + iiDifference) + 'px';
  }

  render() {
    return (
      <div className={"dialog-container"} ref={this.props.innerRef}>
        {
          this.state.data ? (
            <div>
              <span ref={this.indicatorRef} className="dialog-indicator" style={
                {
                  top: this.getIndicatorPosition(this.state.data ? this.state.data.style.position.top : 0 ),
                }
              }>
              </span>
              <div className="dialog-sub-container">
                <div className="dialog-window">
                  <div className="dialog-top-status">
                    <span style={{ display: 'block' }}>{this.state.data.date.end ? 'INACTIVE' : 'ACTIVE'}</span>
                    <span style={{ display: 'block', fontStyle: 'italic', letterSpacing: '.1rem' }}>{this.state.data.date.start.getFullYear()}-{this.formatDateEnd(this.state.data.date)}</span>
                  </div>
                  <div className="dialog-middle-status">
                    <div className="dialog-middle-info">
                      <h2 className="dialog-middle-title">{this.state.data.title}</h2>
                      <div className="dialog-middle-description">{this.state.data.description}</div>
                    </div>
                    <div className="dialog-middle-medications">
                      <div style={{ display: 'inline' }}>
                        <div className="dialog-middle-medications-container">
                          <span style={
                            {
                              color: '#75C4BE', 
                              fontFamily: 'NotoSansNormalSemiBold',
                              paddingBottom: '.5rem',
                              display: 'block'
                            }
                          }>YOUR MEDICATIONS</span>
                          <div style={
                            {
                              paddingLeft: '1rem',
                              height: '4rem',
                              overflowY: 'auto',
                              width: 'calc( 100% - 1rem )',
                              marginTop: 0,
                              color: 'gray',
                              fontStyle: 'italic'
                            }}>Lorem Ipsum</div>
                        </div>
                        <div className="dialog-middle-medications-container">
                          <span style={
                            {
                              color: '#75C4BE', fontFamily: 'NotoSansNormalSemiBold',
                              paddingLeft: '1rem',
                              paddingBottom: '.5rem',
                              display: 'block'
                            }
                          }>YOUR SYMPTOMS</span>
                          <ul style={
                            {
                              paddingLeft: '1rem',
                              height: '4rem',
                              overflowY: 'auto',
                              width: 'calc( 100% - 1rem )',
                              marginTop: 0,
                              color: 'gray',
                              fontStyle: 'italic'
                            }}>
                            {
                              this.state.data.symptoms.map((s, i) => (<li key={`${s}-${i}`}>{s}</li>))
                            }
                          </ul>
                        </div>
                      </div>
                    <div style={{padding: '.4rem 0'}}>
                       <button style={{ background: 'transparent', border: 0, fontSize: '.8rem', color: '#7F7F7F'}}>SEE PAST MEDICATIONS &#9660;</button>
                    </div>  
                    </div>
                  </div>
                  <div style={{ padding: '1rem' }}>
                    <span style={
                      {
                        color: '#75C4BE', fontFamily: 'NotoSansNormalSemiBold',
                        paddingLeft: '1rem'
                      }
                    }>YOUR HISTORY</span>
                    <div
                      style={{
                        width: '100%',
                        height: '10rem',
                      }}
                    >
                      <ResponsiveContainer maxHeight={'100%'} maxWidth={'10rem'}>
                        <ComposedChart
                          data={this.state.data.medications_history}
                          margin={{
                            top: 20, right: 20, bottom: 20, left: 20,
                          }}
                          style={{
                            fontSize: '.7rem'
                          }}>
                          <CartesianGrid stroke="#aaa" />
                          <XAxis padding={
                            {
                              left: 20,
                              right: 30
                            }
                          } dataKey="name" label={{ value: 'Duration', position: 'insideBottomRight', offset: -5 }} />
                          <YAxis label={{ value: 'Frequency', position: 'insideBottom', offset: -20 }} />
                          <Area
                            strokeWidth={2}
                            fillOpacity={0.4}
                            type="linear" dataKey="freq" fill="#DBDBDB" stroke="transparent" />
                          <Line margin={{ top: 5, left: 25, right: 25, bottom: 5 }} type="linear" dataKey="dur" stroke="green" />
                        </ComposedChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                  <div style={{ padding: '1rem' }}>

                  </div>
                </div>
              </div>
            </div>
          ) : (
              <div style={
                {
                  padding: '2rem'
                }
              }>
                <span>Selecione para prosseguir</span>
              </div>
            )
        }
      </div>
    );
  }
}
