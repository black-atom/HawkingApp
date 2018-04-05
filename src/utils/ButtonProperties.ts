const buttonProperties = [
  {
    key: 'almoco',
    name: 'Almoço',
    imgPath: 'assets/icon/restaurant.svg',
    pageType: 'ContentModalMonitoramento',
    imageHeader: '',
    props: [
      {
        buttonName: 'km Inicial',
        isViewed: true,
        inputType: 'number',
        message: 'Insira a quilometrangem do veículo para o deslocamento.',
      },
      {
        buttonName: 'km Final',
        isViewed: false,
        inputType: 'number',
        message: 'Insira a quilometrangem do veículo para o deslocamento.',
      },
      {
        buttonName: 'Iniciar',
        isViewed: false,
        inputType: 'btn',
        message: 'Deseja iniciar.',
      },
      {
        buttonName: 'Finalizar',
        isViewed: false,
        inputType: 'btn',
        message: 'Deseja finalizar.',
      },
    ],
  },
  {
    key: 'abastecimento',
    name: 'Abastecimento',
    imgPath: 'assets/icon/gas-station.svg',
    pageType: 'ContentModalMonitoramento',
    imageHeader: '',
    props: [
      {
        buttonName: 'km Inicial',
        isViewed: true,
        inputType: 'number',
        message: 'Insira a quilometrangem do veículo para o deslocamento.',
      },
      {
        buttonName: 'km Final',
        isViewed: false,
        inputType: 'number',
        message: 'Insira a quilometrangem do veículo para o deslocamento.',
      },
      {
        buttonName: 'Iniciar',
        isViewed: false,
        inputType: 'btn',
        message: 'Deseja iniciar.',
      },
      {
        buttonName: 'Finalizar',
        isViewed: false,
        inputType: 'btn',
        message: 'Deseja finalizar.',
      },
    ],
  },
  {
    key: 'empresa',
    name: 'Realponto',
    imgPath: 'assets/icon/realponto.svg',
    pageType: 'ContentModalMonitoramento',
    imageHeader: '',
    props: [
      {
        buttonName: 'km Inicial',
        isViewed: true,
        inputType: 'number',
        message: 'Insira a quilometrangem do veículo para o deslocamento.',
      },
      {
        buttonName: 'km Final',
        isViewed: false,
        inputType: 'number',
        message: 'Insira a quilometrangem do veículo para o deslocamento.',
      },
    ],
  },
  {
    key: 'outros',
    name: 'Outros',
    imgPath: 'assets/icon/other.svg',
    pageType: 'ContentModalMonitoramento',
    imageHeader: '',
    props: [
      {
        buttonName: 'Descrição',
        isViewed: true,
        inputType: 'text',
        message: 'Insira a descrição do deslocamento.',
      },
      {
        buttonName: 'km Inicial',
        isViewed: false,
        inputType: 'number',
        message: 'Insira a quilometrangem do veículo para o deslocamento.',
      },
      {
        buttonName: 'km Final',
        isViewed: false,
        inputType: 'number',
        message: 'Insira a quilometrangem do veículo para o deslocamento.',
      },
      {
        buttonName: 'Iniciar',
        isViewed: false,
        inputType: 'btn',
        message: 'Deseja iniciar.',
      },
      {
        buttonName: 'Finalizar',
        isViewed: false,
        inputType: 'btn',
        message: 'Deseja finalizar.',
      },
    ],
  },
];

export {
  buttonProperties,
};

