import { Monitoramento } from '../../models';

export interface MonitoramentoState {
  monitoramentos: Monitoramento[];
  loading: boolean;
  error: boolean;
}


export interface kmInicialAfterDescricaoIntefacer {
  uuid: string;
  km_inicial: number;
  data_hora_inicial_km: Date;
  isUploaded: boolean;
}


export interface kmFinalIntefacer {
  uuid: string;
  km_final: number;
  data_hora_final_km: Date;
  isUploaded: boolean;
}

export interface IniciarInterface {
  data_hora_inicial_virgente_local: Date;
  isUploaded: boolean;
  uuid: string;
}

export interface FinalizarInterface {
  data_hora_final_virgente_local: Date;
  isUploaded: boolean;
  uuid: string;
}
