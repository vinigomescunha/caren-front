
import React from "react";
import {
  getRemSize
} from '../../../libraries/utils';
import {
  ComposedChart, Line, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';

export default class ButtonComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: this.props.data,
      indicatorStyle: this.props.indicatorStyle
    };

    this.data = [
      {
        name: 'JAN', uv: 5, amt: 14,
      },
      {
        name: 'FEV', uv: 8, amt: 15,
      },
      {
        name: 'MAR', uv: 13, amt: 9,
      },
      {
        name: 'ABR', uv: 14, amt: 12,
      },
      {
        name: 'MAI', uv: 15, amt: 11,
      },
      {
        name: 'JUN', uv: 14, amt: 17,
      },
    ];
    this.indicatorRef = React.createRef();
    this.defaultButtonHeight = 110; // O tamanho do botao para compensar a altura do indicador
    this.defaultIndicatorHeight = 23; // o tamanho do indicador e 23px mas pode mudar de acordo com o dispositivo
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

  render() {
    return (
      <div className={"dialog-container"} ref={this.props.innerRef}>
        {
          this.state.data ? (
            <div>
              <span ref={this.indicatorRef} className="dialog-indicator" style={
                {
                  top: `calc( ${this.state.data ? this.state.data.style.position.top : 0} + ${parseInt(getRemSize(this.indicatorRef.current, this.defaultIndicatorHeight))}px - ${parseInt(getRemSize(this.props.buttonRef, this.defaultButtonHeight))}px )`,
                }
              }>
              </span>
              <div style={{
                position: 'absolute',
                zIndex: 2,
                width: '100%',
                height: '100%',
                borderRadius: '10px'
              }}>
                <div>{this.state.data.date.end ? 'INACTIVE' : 'ACTIVE'}</div>
                <div>{this.state.data.date.start.getFullYear()}-{this.formatDateEnd(this.state.data.date)}</div>
                <div>{this.state.data.title}</div>
                <div
                  style={{
                    width: '30vw',
                    height: '30vh',
                  }}
                >
                  <ResponsiveContainer maxHeight={'20vw'} maxWidth={'100vw'}>
                    <ComposedChart
                      data={this.data}
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
                      <Tooltip />
                      <Area
                        strokeWidth={2}
                        fillOpacity={0.4}
                        type="linear" dataKey="amt" fill="gray" stroke="transparent" />
                      <Line margin={{ top: 5, left: 25, right: 25, bottom: 5 }} type="linear" dataKey="uv" stroke="green" />
                    </ComposedChart>
                  </ResponsiveContainer>
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
