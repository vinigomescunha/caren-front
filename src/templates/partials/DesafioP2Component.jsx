
import React from "react";
import '../../assets/DesafioP2.scss';
import { EVENTS } from '../../enums';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import assetBodyFront from '../../assets/body-front.jpg';
// esse Slider nao funciona corretamente ao inverso
// import Slider from '@material-ui/core/Slider';
import { MockAdapter } from '../../mocks';
import { Range } from 'rc-slider';
import 'rc-slider/assets/index.css';
import ButtonComponent from './DesafioP2/ButtonComponent';
import DialogComponent from './DesafioP2/DialogComponent';
import {
  getDateByYear,
  getMaxValue,
  getMinValue,
  getRemSize,
  filterDontRepeat
} from '../../libraries/utils';

// Tem uma regra de negocio que os slides tem que parar em seus respectivos pontos
// e nao nos ranges entre os pontos
// para isso e setado o step como nulo, de acordo com o doc do slider:
// o ponto zero e ignorado pelo slider, o primeiro valor
// @see https://www.npmjs.com/package/rc-slider#common-api
// pra isso foi corrigido com um fix adicional para que o slide funcione corretamente no primeiro valor

// TODO: Abrir fix no slider e remover fixAdditional dos locais onde foi necessario,
// apos release do pacote npm

const fixAdditional = 1;

export default class DesafioP2Component extends React.Component {
  constructor(props) {
    super(props);
    // por default seleciono o primeiro item do mock id=1
    this.state = { idSelected: null };
    this.state.data = [];
    // adiciono valor default ao filtro de anos
    this.state.value = [0 + fixAdditional, 100 + fixAdditional];
    this.setFilter = this.setFilter.bind(this);
    this.selectId = this.selectId.bind(this);
    // Trabalhando dessa forma tenho o elemento pra manipular 
    this.buttonRef = React.createRef();
    // nesse caso vai dar set nos refs nao seria a melhor escolha, poderia setar o tamanho do botao na mao
    this.buttonComponent = React.forwardRef((props, ref) => (
      <ButtonComponent
        innerRef={this.buttonRef}
        key={props.id}
        data={{
          id: props.data.id,
          title: props.data.title,
          isChildren: (this.state && this.state.idSelected === props.data.id ? true : false),
          callback: this.selectId,
          style: {
            right: props.data.style.position.right,
            top: `calc( ${props.data.style.position.top} - ${parseInt(getRemSize(this.buttonRef.current, this.defaultButtonHeight))}px )`,
          }
        }} />
    ));
    // Trabalhando dessa forma tenho o elemento pra manipular 
    this.dialogRef = React.createRef();
    this.dialogComponent = React.forwardRef((props, ref) => (
      <DialogComponent
        innerRef={this.dialogRef}
        data={props.data}
        buttonRef={this.buttonRef.current} />
    ));
    this.defaultButtonHeight = 110;
  }
  /**
   * Hook:
   * Obtenho os dados do mock ao iniciar o hook de componente 
   */
  componentDidMount() {
    MockAdapter.getDesafio2Mocks()
      .then(data => {
        this.setState({ data });
      });
  }
  /**
   * setFilter
   * @description Ao selecionar um range do slider, o(s) valor(es) do Slider/Range sao tracados nesse metodo
   * @param {Array.<Number>} newValue 
   * @returns {Void}
   */
  setFilter(newValue) {
    // caso um dos elementos esteja vazio seleciono o maior valor: caso reverso o primeiro item(data atual)
    const defaultEmptyValue = 100 + fixAdditional;
    // Caso 1 : Quebra se nao houver valor
    // Se nao houver um valor inicial de slider e no estado eu adiciono um valor para o estado, evita quebra se vier nulo
    if (!newValue[0] && !this.state.value[0])
      newValue[0] = defaultEmptyValue;
    // Caso 2: Slider iniciou sem valor inicial
    // se seto valor default mas o slider iniciou sem valor
    if (!newValue[0] && this.state.value[0]) {
      newValue[0] = this.state.value[0];
    }
    // Seto o novo valor do slider no estado
    this.setState({ value: newValue });
  };

  /**
   * selectId
   * @description Metodo para selecionar o id da doenca que quer ser apresentada
   * retorna um metodo que sera invocado pelo Componente de Botao
   * @param {String} id 
   * @returns {Void}
   */
  selectId(id) {
    console.log(this.buttonRef.current)
    console.log(getRemSize(this.buttonRef.current), this.dialogRef, 'REFB');
    return (ev) => {
      this.setState({ idSelected: id });
    }
  }
  /**
   * getSelected
   * @description Retorna o elemento selecionado 
   * @returns Object<any>
   */
  getSelected() {
    return this.state.data.filter(d => d.id === this.state.idSelected)[0];
  }
  /**
   * getData 
   * @description Retorna todos os dados setados pelo mock, filtrados pela data
   * @returns Array<any>
   */
  getData() {
    return this.state.data.filter((v) => {
      if (!this.state.value) return true; // nao filtro se nao quero filtrar
      const max = getMaxValue(this.getMarks());
      const min = getMinValue(this.getMarks());
      const total = (max - min);
      let firstItem, lastItem;
      // regra de tres pra ter porcentagem
      if (this.state.value[0] > this.state.value[1]) {
        firstItem = this.state.value[1] - fixAdditional;
        lastItem = this.state.value[0] - fixAdditional;
      } else {
        firstItem = this.state.value[0] - fixAdditional;
        lastItem = this.state.value[1] - fixAdditional;
      }
      const firstRange = parseInt(min + Math.ceil(firstItem * total / 100));
      const lastRange = parseInt(min + Math.ceil(lastItem * total / 100));
      // O range inico e fim estao invertidos porque o range e reverso
      const rangeInicio = getDateByYear(firstRange), rangeFim = getDateByYear(lastRange);
      // Regra: Caso conjunto contido
      const Regra1 = rangeInicio.getFullYear() >= v.date.start.getFullYear();
      // Regra: Caso conjunto contem Inicial
      const Regra2 = rangeInicio.getFullYear() <= v.date.start.getFullYear() && rangeFim.getFullYear() >= v.date.start.getFullYear();
      // Restricao: Range final e inicial antes do conjunto
      const Restricao1 = v.date.end ? rangeInicio.getFullYear() > v.date.start.getFullYear() && rangeInicio.getFullYear() > v.date.end.getFullYear() : false;
      // Restricao: Range final e inicial depois do conjunto
      const Restricao2 = v.date.end ? rangeFim.getFullYear() < v.date.start.getFullYear() && rangeFim.getFullYear() < v.date.end.getFullYear() : false;
      return (Regra1 || Regra2) && (!Restricao1 && !Restricao2);
    });
  }
  /**
   * getMarks
   * @description Lista todos os anos das doencas obtidas pelo mock, retorna array de anos
   * @returns Array<Number> 
   */
  getMarks() {
    // adiciono no final do stack o ano atual, para nao acontecer de criar um slider vazio
    const thisYear = [
      new Date().getFullYear()
    ];
    // const generateYears = () => {
    //   // mock de anos
    //   // Esse cara bloquearia o event loop, poderia ser uma recursao mas como e exemplo
    //   let year = 1940,
    //     years = [];
    //   while (year <= 2000) {
    //     years.push(year);
    //     year += 10;
    //   }
    //   return years;
    // };


    const lastYears = [];//generateYears(); // gerando anos para mock
    let mrks = thisYear.concat(lastYears)
      // concateno todas as datas de inicio 
      .concat(
        this.state.data
          // retorno o ano das datas iniciais
          .map(d => d.date.start.getFullYear()).filter(filterDontRepeat))
      // concateno todas as datas finais
      .concat(
        this.state.data
          // filtro das datas finais removendo as nulas
          .filter(d => d.date.end !== null)
          // retorno o ano das datas finais
          .map(d => d.date.end.getFullYear()).filter(filterDontRepeat))
    // caso esteja vazio adiciono dados do range inicial
    // .concat(this.state.data.length !== 0 ? [1970] : []);

    // faco um fix pra evitar que o slider seja apresentado com somente um elemento,
    // adicionando o ano anterior, assim o slide nao fica desconexo na tela
    if (mrks.length === 1) {
      mrks.push(parseInt(mrks[0]) - 1);
    }
    return mrks;
  }
  /**
   * getMarksObj
   * @description Obtenho os marcadores em anos e formato legivel para o slider
   * @returns Array<{label: String, value: String}>
   */
  getMarksObj() {
    const max = getMaxValue(this.getMarks());
    const min = getMinValue(this.getMarks());
    const total = (max - min);
    const formatMark = (d) => {
      return ({
        value: d + (d <= 2000 ? 's' : ''),
        label: parseInt(Math.floor((d - min) * 100 / total)) + fixAdditional
      });
    };
    const initialValue = {};

    return this.getMarks().map(formatMark).reduce((obj, item) => {
      return {
        ...obj,
        [item.label]: item.value,
      };
    }, initialValue);
  }
  /**
   * Hook
  */
  render() {
    return (
      <div className="desafio">
        <div className="modal" menu={EVENTS.DISPLAY_CHAT} onClick={this.props.data.listeners.switchMenu}></div>
        <div className="modal-container">
          <button className="fechar" menu={EVENTS.DISPLAY_CHAT} onClick={this.props.data.listeners.switchMenu}>Fechar</button>
          <Container maxWidth="lg">
            <Box my={4}>
              <div style={
                {
                  width: '70vw',
                  margin: '0 auto'
                }
              }>
                <div>ELLEN`S MEDICAL JOURNAL <div style={{ float: 'right' }}><button>BY DATE</button><button>BY CONDITION</button><button>BY TYPE</button></div></div>
                <div className="main-item" style={{ padding: '2rem 4rem', width: `calc(100% - 8rem)` }}>
                  <div style={{ maxWidth: '48%', width: '100%' }}>+</div>
                  <div style={{ maxWidth: '52%', width: '100%' }}>
                    <div>
                      {
                        (<Range reverse min={1} max={100} marks={this.getMarksObj()} step={null} onChange={this.setFilter} defaultValue={this.state.value} />)
                      }
                    </div>
                  </div>
                </div>
                <div className="main-item">
                  <div className="image-item">
                    <img src={assetBodyFront} alt="corpo" style={
                      {
                        width: '100%',
                        height: '100%'
                      }
                    }></img>
                    {
                      this.getData().map(
                        b =>
                          <this.buttonComponent key={b.id} data={b} />
                      )
                    }
                  </div>
                  <div className="dialog-item">
                    <this.dialogComponent data={this.getSelected()} />
                  </div>
                </div>
              </div>
            </Box>
          </Container>
        </div>
      </div>
    );
  }
}