// /**
//  * convertLabelValueArrayToObject
//  * @description Converte array de label e value para um objeto lista de indice e valor
//  * @param { {Array.<{label: String, value: String}>}} array 
//  */
// export const convertLabelValueArrayToObject = (array) => {
//   const initialValue = {};
//   return array.reduce((obj, item) => {
//     return {
//       ...obj,
//       [item.label]: item.value,
//     };
//   }, initialValue);
// };

/**
 * getDateByYear
 * @param {String} year 
 */
export const getDateByYear = (year) => {
  let date = new Date();
  date.setFullYear(year);
  date.setMonth(0);
  date.setDate(1);
  return date;
}

/**
 * getMinValue
 * @description Obtem o valor minimo de um array
 * @param {Array<Number} arr 
 */
export const getMinValue = (arr) => Math.min.apply(null, arr);

/**
 * getMaxValue
 * @description Obtem o valor maximo de um array
 * @param {Array<Number} arr 
 */
export const getMaxValue = (arr) => Math.max.apply(null, arr);

/**
 * getRemSize
 * @description calcula o tamanho da fonte de um elemento pelo elemento 
 * @param {Element} d 
 */
 // Obtenho o tamanho real computado pelo elemento principal
// Nesse caso Desafio2Component eu uso para analisar o tamanho medio da altura do botao e regular o local aproximado da seta
// No caso poderia ser um valor fixo em pixels tambem, mas teria que adaptar por dispositivo
export const getRemSize = (d, defaultSize) => {
  if (!d) return defaultSize ? defaultSize: 0; // caso nao tenha o elemento eu previno de quebrar a solucao, elemento n existe
  const doc = d; // or document.body caso queira alinhar pelo documento geral visivel
  return document.defaultView.getComputedStyle(doc, null).getPropertyValue('height');
}

/**
 * filterDontRepeat
 * @description funcao para filtrar array nao repetidos, a ser chamado pelo callback de filtro de um array
 * @see https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Array/filtro
 * @param {*} item  O elemento que está sendo processado no array.
 * @param {*} i O índice do elemento atual que está sendo processado no array.
 * @param {*} arr O array para qual filter foi chamada.
 * @returns {Array}
 */
export const filterDontRepeat = (item, i, arr) => arr.indexOf(item) === i;