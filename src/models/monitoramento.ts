export interface Monitoramento {
  uuid?: string;
  _id?: string;
  km_inicial?: number;
  km_final?: number;
  data_hora_inicial_km?: Date;
  data_hora_final_km?: Date;
  data_hora_inicial_virgente_local?: Date;
  data_hora_final_virgente_local?: Date;
  tipo?: string;
  id_funcionario?: string;
  id_atendimento?: string;
  isUploaded?: boolean;
  isPaused?: boolean;
  descricao: string;
  actions?: Action[];
}

export interface Action {
  status?: string;
  motivo?: string;
  date?: Date;
}
