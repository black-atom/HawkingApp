import { Atendimento, Monitoramento } from './';

export enum AtividadeTipo {
  almoco = 'almoco',
  atendimento = 'atendimento',
  deslocamento_empresa = 'deslocamento_empresa',
  abastecimento = 'abastecimento',
  outros = 'outros',
}

export enum MonitoramentoStatuses {
  pendente = 'PENDENTE',
  pauseAtividade = 'PAUSE_ATIVIDADE',
  inicioAtividade = 'INICIO_ATIVIDADE',
  fimAtividade = 'FIM_ATIVIDADE',
  inicioDeslocamento = 'INICIO_DESLOCAMENTO',
  fimDeslocamento = 'FIM_DESLOCAMENTO',
  cancelaAtividade = 'CANCELA_ATIVIDADE',
}

export interface Monitoramento {
  status: MonitoramentoStatuses;
  date: Date;
  motivo?: string;
}

export interface AtividadeI {
  _id?: string;
  descricao: string;
  atividade_id: string;
  monitoramentos: Monitoramento[];
  tipo: AtividadeTipo;
  funcionario_id: string;
  atendimento_id?: string;
  atendimento?: Atendimento;
  status: MonitoramentoStatuses;
  synced: boolean;
}
