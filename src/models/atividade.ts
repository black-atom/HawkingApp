import { Atendimento, Monitoramento } from './';

export enum AtividadeTipo {
  almoco = 'almoco',
  atendimento = 'atendimento',
  deslocamento_empresa = 'deslocamento_empresa',
  abastecimento = 'abastecimento',
  outros = 'outros',
}

export enum AtividadeStatus {
  pendente = 'pendente',
  pausado = 'pausado',
  em_execucao = 'em_execucao',
  concluido = 'concluido',
}


export interface AtividadeI {
  atividade_id: String;
  monitoramentos: Monitoramento[];
  tipo: AtividadeTipo;
  funcionario_id: String;
  atendimento_id?: String;
  atendimento?: Atendimento;
  status?: AtividadeStatus;
}
