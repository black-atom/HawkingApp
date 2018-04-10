import { Monitoramento } from './monitoramento';

export enum AtividadeTipo {
  almoco = 'almoco',
  atendimento = 'atendimento',
  deslocamento_empresa = 'deslocamento_empresa',
  abastecimento = 'abastecimento',
  outros = 'outros',
}

export interface AtividadeI {
  atividade_id: String;
  isPaused: Boolean;
  monitoramentos: [Monitoramento];
  tipo: AtividadeTipo;
  funcionario_id: String;
  atendimento_id: String;
}
