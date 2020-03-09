export const getYearsTimestamp = (years) => Date.now() - (86400 * 1000 * 365 * years);
export const getDefaultTimestamp = () => {
  return [
    new Date(getYearsTimestamp(20)).getFullYear(),
    new Date(getYearsTimestamp(30)).getFullYear()
  ];
};
// lista de doencas em mock
export const doencasMock = [{
    id: 1,
    title: 'Asma ',
    description: 'uma das doenças respiratórias crônicas mais comuns, juntamente com a rinite alérgica e a doença pulmonar obstrutiva crônica. As principais características dessa doença pulmonar são dificuldade de respirar, chiado e aperto no peito, respiração curta e rápida',
    date: {
      start: new Date(getYearsTimestamp(30)), // data de inicio da doenca 30 anos atras
      end: null // caso nao tenha sido erradicada
    },
    medications: [{
      title: '',
      description: '',
      date: {
        start: '',
        end: null
      }
    }],
    symptoms: [
      'Tosse com ou sem produção de escarro (muco)',
      'Repuxar a pele entre as costelas durante a respiração (retrações intercostais)',
      'Deficiência respiratória que piora com exercício ou atividade',
      'Chiado',
      'Falta de ar',
      'Aperto no peito',
    ],
    medications_history: [{
      date: {
        start: '',
        end: null // nesse caso vou manter a estrutura de data mas nao vou atender 
      }
    }],
    condition: '',
    type: '',
    style: {
      position: {
        right: '20%',
        top: '80%'
      }
    }
  },
  {
    id: 2,
    title: 'Diabete com Colicas',
    description: 'Diabete is a cronic...',
    date: {
      start: new Date(getYearsTimestamp(10)), // data de inicio da doenca 10 anos atras(mock) 
      end: new Date(getYearsTimestamp(5)) // caso tenha sido erradicada 5 anos atras
    },
    medications: [{
      title: '',
      description: '',
      date: {
        start: '',
        end: null
      }
    }],
    symptoms: [
      'Mal estar'
    ],
    medications_history: [{
      date: {
        start: '',
        end: null // nesse caso vou manter a estrutura de data mas nao vou atender 
      }
    }],
    condition: '',
    type: '',
    style: {
      position: {
        right: '40%',
        top: '60%'
      }
    }
  },
  {
    id: 3,
    title: 'Meningite',
    description: 'Meningite is a cronic...',
    date: {
      start: new Date(getYearsTimestamp(10)), // data de inicio da doenca 10 anos atras
      end: null // caso tenha sido erradicada
    },
    medications: [{
      title: '',
      description: '',
      date: {
        start: '',
        end: null
      }
    }],
    symptoms: [
      'Mal estar'
    ],
    medications_history: [{
      date: {
        start: '',
        end: null // nesse caso vou manter a estrutura de data mas nao vou atender 
      }
    }],
    condition: '',
    type: '',
    style: {
      position: {
        right: '20%',
        top: '100%'
      }
    }
  }
];