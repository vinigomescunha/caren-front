export const getYearsTimestamp = (years) => Date.now() - (86400 * 1000 * 365 * years);
// lista de doencas em mock
export const doencasMock = [{
    id: 1,
    title: 'Asma ',
    description: 'uma das doenças respiratórias crônicas mais comuns, juntamente com a rinite alérgica e a doença pulmonar obstrutiva crônica. As principais características dessa doença pulmonar são dificuldade de respirar, chiado e aperto no peito, respiração curta e rápida.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent vel leo at turpis hendrerit scelerisque vitae ut turpis. Nullam at commodo ipsum. Morbi nec dictum leo. Duis pellentesque odio ut lorem scelerisque finibus. Nulla vel suscipit purus, vitae consectetur nisl. Nunc eget lobortis lacus. Maecenas dictum libero sit amet congue fringilla',
    date: {
      start: new Date(getYearsTimestamp(30)), // data de inicio da doenca 30 anos atras
      end: null // caso nao tenha sido erradicada
    },
    medications: [{
      title: 'Symbicort',
      use: 'One spray in each nostril as need',
      date: {
        start: '',
        end: null
      }
    }],
    symptoms: [
      'Tosse',
      'Muco',
      'Chiado',
      'Falta de ar'
    ],
    medications_history: [ // imagino como se o back end ja mandasse formatado
      {
        name: 'JAN',
        dur: 5,
        freq: 14,
      },
      {
        name: 'FEV',
        dur: 8,
        freq: 15,
      },
      {
        name: 'MAR',
        dur: 13,
        freq: 9,
      },
      {
        name: 'ABR',
        dur: 14,
        freq: 12,
      },
      {
        name: 'MAI',
        dur: 15,
        freq: 11,
      },
      {
        name: 'JUN',
        dur: 14,
        freq: 17,
      },
    ],
    last_checks: [{
        name: 'Visit to Asthma checkuop',
        description: 'Dr Henry',
        type: 'checkup', // Esse tipo poderia ser um enumerado
        icon: '/doctor.png',
        date: {
          start: new Date('2012-01-02'),
          end: null
        }
      },
      {
        name: 'Began new medication',
        description: 'Symicort',
        type: 'medication', // Esse tipo poderia ser um enumerado
        icon: '/pill.png',
        date: {
          start: new Date('2011-08-02'),
          end: null
        }
      }
    ],
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
    medications_history: [ // imagino como se o back end ja mandasse formatado
      {
        name: 'JAN',
        dur: 5,
        freq: 14,
      },
      {
        name: 'MAR',
        dur: 3,
        freq: 19,
      },
      {
        name: 'ABR',
        dur: 14,
        freq: 2,
      },
      {
        name: 'MAI',
        dur: 15,
        freq: 21,
      },
      {
        name: 'JUN',
        dur: 14,
        freq: 17,
      },
    ],
    last_checks: [{
        name: 'Visit to Asthma checkuop',
        description: 'Dr Henry',
        type: 'checkup', // Esse tipo poderia ser um enumerado
        icon: '/doctor.png',
        date: {
          start: new Date('2012-01-02'),
          end: null
        }
      },
      {
        name: 'Began new medication',
        description: 'Symicort',
        type: 'medication', // Esse tipo poderia ser um enumerado
        icon: '/pill.png',
        date: {
          start: new Date('2011-08-02'),
          end: null
        }
      }
    ],
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
    medications_history: [ // se o back end ja mandasse formatado, mas poderia fazer um map em outra estrutura... depende do negociado
      {
        name: 'JAN',
        dur: 5,
        freq: 14,
      },
      {
        name: 'MAR',
        dur: 13,
        freq: 19,
      },
      {
        name: 'ABR',
        dur: 4,
        freq: 2,
      },
      {
        name: 'MAI',
        dur: 5,
        freq: 11,
      },
      {
        name: 'JUN',
        dur: 14,
        freq: 7,
      },
    ],
    last_checks: [{
        name: 'Visit to Asthma checkuop',
        description: 'Dr Henry',
        type: 'checkup', // Esse tipo poderia ser um enumerado
        icon: '/doctor.png',
        date: {
          start: new Date('2012-01-02'),
          end: null
        }
      },
      {
        name: 'Began new medication',
        description: 'Symicort',
        type: 'medication', // Esse tipo poderia ser um enumerado
        icon: '/pill.png',
        date: {
          start: new Date('2011-08-02'),
          end: null
        }
      }
    ],
    style: {
      position: {
        right: '20%',
        top: '100%'
      }
    }
  }
];