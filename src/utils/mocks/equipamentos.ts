export const EQUIPAMENTOS = [];


/*

  categorias de equipamentos para ser usado em tipo

  ###TIPOS###

  relógio
  acionador
  catraca
  controle de acesso

*/

export const relogiosMock = [
  {
    descricao: 'Cartográfico',
    modelos: ['Plus', 'Fort', 'Vega'],
    foto: 'henry-plus.jpeg',
    pecas: [
      { descricao: 'Chave', foto: 'chaves.jpg' },
      { descricao: 'Fita', foto: 'fita-plus.jpg' },
      { descricao: 'Carcaça', foto: 'carcaca.jpg' },
      { descricao: 'Botão', foto: 'botao-azul.jpg' },
      { descricao: 'Bateria', foto: 'bateria-plus.jpg' },
      { descricao: 'Fonte', foto: 'fonte-7-8v.jpg' },
    ],
    tipo: 'relógio',
  },
  {
    descricao: 'Hexa',
    modelos: ['A', 'B', 'C', 'D', 'E'],
    foto: 'hexa.jpeg',
    pecas: [
      { descricao: 'Chave', foto: 'chaves.jpg' },
      { descricao: 'Pino da Bobina', foto: 'pino-da-bobina.jpg' },
      { descricao: 'Impressora', foto: 'impressora-prisma.jpg' },
      { descricao: 'Bateria 12V', foto: 'bateria-12v.jpg' },
      { descricao: 'Fonte C/Nobreak', foto: 'fonte-com-nobreak.jpg' },
      { descricao: 'Fonte PQ', foto: 'fonte-7-8v.jpg' },
    ],
    tipo: 'relógio',
  },
  {
    descricao: 'Hexa Advanced',
    modelos: ['A', 'B', 'C', 'D', 'E'],
    foto: 'hexa-adv.jpeg',
    pecas: [
      { descricao: 'Chave', foto: 'chaves.jpg' },
      { descricao: 'Pino da Bobina', foto: 'pino-da-bobina.jpg' },
      { descricao: 'Impressora', foto: 'impressora-prisma.jpg' },
      { descricao: 'Bateria 12V', foto: 'bateria-12v.jpg' },
      { descricao: 'Fonte C/Nobreak', foto: 'fonte-com-nobreak.jpg' },
      { descricao: 'Fonte PQ', foto: 'fonte-7-8v.jpg' },
    ],
    tipo: 'relógio',
  },
  {
    descricao: 'Inner Rep Plus',
    modelos: ['Bio Prox', 'Bio Barras ', 'Barras', 'Prox'],
    foto: 'inner-rep-plus.jpeg',
    pecas: [
      { descricao: 'Chave', foto: 'chaves.jpg' },
      { descricao: 'Pino da Bobina', foto: 'pino-da-bobina.jpg' },
      { descricao: 'Impressora', foto: 'impressora-zpm.jpg' },
      { descricao: 'Fonte', foto: 'fonte-7-8v.jpg' },
      { descricao: 'Fonte C/Nobreak', foto: 'fonte-com-nobreak.jpg' },
      { descricao: 'Bateria 12V', foto: 'bateria-12v.jpg' },
    ],
    tipo: 'relógio',
  },
  {
    descricao: 'Idnox',
    modelos: ['LT'],
    foto: 'idnox.jpeg',
    pecas: [
      { descricao: 'Chave', foto: 'chaves.jpg' },
      { descricao: 'Impressora', foto: 'impressora-prisma.jpg' },
      { descricao: 'Fonte', foto: 'fonte-7-8v.jpg' },
      { descricao: 'Fonte C/Nobreak', foto: 'fonte-com-nobreak.jpg' },
      { descricao: 'Bateria 12V', foto: 'bateria-12v.jpg' },
    ],
    tipo: 'relógio',
  },
  {
    descricao: 'Kurumim Rep III',
    modelos: ['BR NT', 'PX NT', 'Bio NT', 'Max BR NT', 'Max PX NT', 'Max Bio NT'],
    foto: 'kurumim-rep-iii.jpeg',
    pecas: [
      { descricao: 'Chave', foto: 'chaves.jpg' },
      { descricao: 'Pino da Bobina', foto: 'pino-da-bobina.jpg' },
      { descricao: 'Impressora', foto: 'impressora-prisma.jpg' },
      { descricao: 'Bateria 12V', foto: 'bateria-12v.jpg' },
      { descricao: 'Fonte C/Nobreak', foto: 'fonte-com-nobreak.jpg' },
      { descricao: 'Fonte PQ', foto: 'fonte-7-8v.jpg' },
    ],
    tipo: 'relógio',
  },
  {
    descricao: 'Kurumim Rep II',
    modelos: ['BR', 'PX', 'Bio', 'Bio NT', 'Max'],
    foto: 'kurumim-rep-ii.jpg',
    pecas: [
      { descricao: 'Chave', foto: 'chaves.jpg' },
      { descricao: 'Pino da Bobina', foto: 'pino-da-bobina.jpg' },
      { descricao: 'Impressora', foto: 'impressora-prisma.jpg' },
      { descricao: 'Bateria 12V', foto: 'bateria-12v.jpg' },
      { descricao: 'Fonte C/Nobreak', foto: 'fonte-com-nobreak.jpg' },
      { descricao: 'Fonte PQ', foto: 'fonte-7-8v.jpg' },
    ],
    tipo: 'relógio',
  },
  {
    descricao: 'Orion 6',
    modelos: ['A', 'B', 'C', 'D'],
    foto: 'orion6.jpeg',
    pecas: [
      { descricao: 'Bico de Pato', foto: 'bico-de-pato.jpg' },
      { descricao: 'Chave', foto: 'chaves.jpg' },
      { descricao: 'Pino da Bobina', foto: 'pino-da-bobina.jpg' },
      { descricao: 'Bateria 6V', foto: 'bateria-6v.jpg' },
      { descricao: 'Fonte 6V', foto: 'fonte-com-nobreak.jpg' },
      { descricao: 'Impressora S/Glt 6V', foto: 'impressora-orion-6v.jpg' },
      { descricao: 'Bateria 12V', foto: 'bateria-12v.jpg' },
      { descricao: 'Fonte 12V', foto: 'fonte-com-nobreak.jpg' },
      { descricao: 'Impressora C/Glt 12V', foto: 'impressora-orion-12v.jpg' },
    ],
    tipo: 'relógio',
  },
  {
    descricao: 'Prisma SF',
    modelos: ['R01', 'R02', 'R03', 'R04', 'R05'],
    foto: 'prisma-sf.jpeg',
    pecas: [
      { descricao: 'Chave', foto: 'chaves.jpg' },
      { descricao: 'Pino da Bobina', foto: 'pino-da-bobina.jpg' },
      { descricao: 'Impressora', foto: 'impressora-prisma.jpg' },
      { descricao: 'Bateria 12V', foto: 'bateria-12v.jpg' },
      { descricao: 'Fonte C/Nobreak', foto: 'fonte-com-nobreak.jpg' },
      { descricao: 'Fonte PQ', foto: 'fonte-7-8v.jpg' },
    ],
    tipo: 'relógio',
  },
  {
    descricao: 'Prisma',
    modelos: ['E', 'F', 'G', 'H', 'I', 'J'],
    foto: 'prisma.jpeg',
    pecas: [
      { descricao: 'Chave', foto: 'chaves.jpg' },
      { descricao: 'Pino da Bobina', foto: 'pino-da-bobina.jpg' },
      { descricao: 'Impressora', foto: 'impressora-prisma.jpg' },
      { descricao: 'Bateria 12V', foto: 'bateria-12v.jpg' },
      { descricao: 'Fonte C/Nobreak', foto: 'fonte-com-nobreak.jpg' },
      { descricao: 'Fonte PQ', foto: 'fonte-7-8v.jpg' },
    ],
    tipo: 'relógio',
  },
  {
    descricao: 'Prisma SF Advanced',
    modelos: ['R01', 'R02', 'R03', 'R04', 'R05'],
    foto: 'prisma-sf-adv.jpeg',
    pecas: [
      { descricao: 'Chave', foto: 'chaves.jpg' },
      { descricao: 'Pino da Bobina', foto: 'pino-da-bobina.jpg' },
      { descricao: 'Impressora', foto: 'impressora-prisma.jpg' },
      { descricao: 'Bateria 12V', foto: 'bateria-12v.jpg' },
      { descricao: 'Fonte C/Nobreak', foto: 'fonte-com-nobreak.jpg' },
      { descricao: 'Fonte PQ', foto: 'fonte-7-8v.jpg' },
    ],
    tipo: 'relógio',
  },
  {
    descricao: 'Protocolador',
    modelos: ['Mobe', 'Prot I', 'Prot II'],
    foto: 'protocolador.jpg',
    pecas: [
      { descricao: 'Botão', foto: 'botao-azul.jpg' },
      { descricao: 'Fita', foto: 'fita-plus.jpg' },
      { descricao: 'Fonte', foto: 'fonte-7-8v.jpg' },
      { descricao: 'Bateria', foto: 'bateria-12v.jpg' },
    ],
    tipo: 'relógio',
  },
  {
    descricao: 'RHJ',
    modelos: ['Bio', 'Bio+Prox'],
    foto: 'rhj.jpeg',
    pecas: [
      { descricao: 'Chave', foto: 'chaves.jpg' },
      { descricao: 'Impressora', foto: 'impressora-prisma.jpg' },
      { descricao: 'Bateria', foto: 'bateria-12v.jpg' },
      { descricao: 'Fonte C/Nobreak', foto: 'fonte-com-nobreak.jpg' },
      { descricao: 'Fonte PQ', foto: 'fonte-7-8v.jpg' },
    ],
    tipo: 'relógio',
  },
  {
    descricao: 'Rw Tech',
    modelos: ['Bio+Prox'],
    foto: 'rw-tech.jpeg',
    pecas: [
      { descricao: 'Chave', foto: 'chaves.jpg' },
      { descricao: 'Pino da Bobina', foto: 'pino-da-bobina.jpg' },
      { descricao: 'Fonte', foto: 'fonte-7-8v.jpg' },
      { descricao: 'Impressora', foto: 'impressora-prisma.jpg' },
      { descricao: 'Fonte C/Nobreak', foto: 'fonte-com-nobreak.jpg' },
    ],
    tipo: 'relógio',
  },
  {
    descricao: 'RDI',
    modelos: ['1P', '2P', '1M', '2M', '1G', '2G'],
    foto: 'rdi.jpeg',
    pecas: [],
    tipo: 'relógio',
  },
  {
    descricao: 'ZPM',
    modelos: ['R100', 'R130', 'R300'],
    foto: 'zpm.jpeg',
    pecas: [
      { descricao: 'Chave', foto: 'chaves.jpg' },
      { descricao: 'Pino da Bobina', foto: 'pino-da-bobina.jpg' },
      { descricao: 'Impressora', foto: 'impressora-zpm.jpg' },
      { descricao: 'Guilhotina', foto: 'guilhotina-zpm.jpg' },
      { descricao: 'Tampa Impressora', foto: 'tampa-zpm.jpg' },
      { descricao: 'Fonte', foto: 'fonte-7-8v.jpg' },
      { descricao: 'Fonte C/Nobreak', foto: 'fonte-com-nobreak.jpg' },
      { descricao: 'Bateria 12V', foto: 'bateria-12v.jpg' },
    ],
    tipo: 'relógio',
  },
];
