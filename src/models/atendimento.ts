export interface Atendimento {
  _id: string;
  cliente: Cliente;
  endereco: Endereco;
  contato: Contato;
  tecnico: Tecnico;
  avaliacao: Avaliacao[];
  data_atendimento: Date;
  estacionamento: string;
  modelo_equipamento: string;
  numero_equipamento: string;
  tipo: string;
  descricao: string;
  testes_efetuados: string;
  observacao: string;
  valor: string;
  autorizado: string;
  garantia: string;
  estado: string;
  interacao_tecnico: InteracaoTecnico;
  motivos: Motivo[];
  createdBy: string;
  createdAt: string;
  updatedAt: string;
  updatedBy: string;
  imagens: any[];
  synced?: boolean;
  assinatura: Assinatura;
  relatorio?: Relatorio;
}

export interface Motivo {
  estado: string;
  motivo: string;
}

export interface Cliente {
  _id: number;
  cnpj_cpf: string;
  nome_razao_social: string;
  nome_fantasia?: string;
  inscricao_estadual?: string;
}
export interface Faturamento {
  equipamentos: EquipamentoFaturamento[];
  email: string;
  razao_social: string;
  cnpj: string;
}

export interface EquipamentoFaturamento {
  id: string;
  descricao: string;
  modelo: string;
  numero_equipamento: string;
  foto: string;
  key: string;
  pecas: Peca[];
}

export interface Equipamentos {
  itens: any[];
  numero_equipamento: string;
  modelo_equipamento: string;
}

export interface Treinamento {
  caminho_rede: string;
  software: string;
  topicos: string[];
}

export interface Relatorio {
  faturamento: Faturamento;
  equipamentos_retirados: RemocaoRelogio[];
  treinamento: Treinamento;
  resumo_atendimento: string;
  motivo_retorno: string;
}

export interface Endereco {
  cep: string;
  rua: string;
  numero: string;
  bairro: string;
  cidade: string;
  uf: string;
  ponto_referencia: string;
  complemento: string;
}

export interface Contato {
  nome: string;
  email: string;
  telefone: string;
  celular: string;
  observacao: string;
}

export interface Tecnico {
  _id: string;
  nome: string;
}

export interface Avaliacao {
  pergunta: string;
  valor: number;
}

export interface Imagens {
  tipo: string;
  url: string;
}

export interface Assinatura {
  assinaturaBase64?: string;
  url?: string;
  isUploading?: boolean;
  isUploaded?: boolean;
  nome?: string;
  document_id?: string;
  atendimentoID?: string;
}

export interface InteracaoTecnico {
  estado?: string;
  relatorio_tecnico?: Treinamento;
  retorno?: Retorno;
  treinamento?: Treinamento;
  remocao_relogio?: RemocaoRelogio;
}

export interface RelatorioRecnico {
  relatorio: string;
}

export interface Retorno {
  retornar: boolean;
  motivo: string;
}

export interface Treinamento {
  treinamento: boolean;
  interrupcoes: boolean;
  cadastros: boolean;
  relatorios: boolean;
  importacao_dados: boolean;
  parametros_gerais: boolean;
  abonos_justificativas: boolean;
  backup_sistema: boolean;
  software: string;
  caminho: string;
}

export interface RemocaoRelogio {
  id: string;
  descricao: string;
  modelo: string;
  numero_equipamento: string;
  testes: string;
  foto: string;
  key: string;
  problema: string;
  pecas: Peca[];
}

export interface Peca {
  descricao: string;
  quantidade: number;
  foto?: string;
  preco?: number;
}

export interface Faturamento {
  mesmo_cnpj: boolean;
  cnpj: string;
  nome_razao_social: string;
  email: string;
  quem_aprovou: string;
  valor: string;
  prazo_pagamento: string;
}
