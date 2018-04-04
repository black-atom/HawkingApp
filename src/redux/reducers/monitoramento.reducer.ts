import { getAllAtendimentos } from './atendimento.reducer';
import { Action, createSelector } from '@ngrx/store';

import  uuidv4 from 'uuid/v4';

import { Monitoramento } from './../../models';
import { MonitoramentoState } from './../models';

import {
  kmFinalIntefacer,
  IniciarInterface,
  FinalizarInterface,
  kmInicialAfterDescricaoIntefacer,
} from '../models/monitoramentoState';

import { State } from './index';

const INITIAL_STATE: MonitoramentoState = {
  monitoramentos: [],
  loading: false,
  error: false,
};

export const DESCRICAO = 'DESCRICAO';
export const KM_INICIAL = 'KM_INICIAL';
export const KM_FINAL = 'KM_FINAL';
export const INICIAR = 'INICIAR';
export const FINALIZAR = 'FINALIZAR';
export const KM_INICIAL_AFTER_DESCRICAO = 'KM_INICIAL_AFTER_DESCRICAO';

export const MONITORAMENTO_CRIAR_DESLOCAMENTO = 'MONITORAMENTO_CRIAR_DESLOCAMENTO';
export const MONITORAMENTO_EDITAR = 'MONITORAMENTO_EDITAR';
export const MONITORAMENTO_UPLOAD_SUCCESS = 'MONITORAMENTO_UPLOAD_SUCCESS';
export const MONITORAMENTO_UPLOAD_FAILED = 'MONITORAMENTO_UPLOAD_FAILED';

export const CONTINUE_MONITORAMENTO = 'CONTINUE_MONITORAMENTO';
export const PAUSE_MONITORAMENTO = 'PAUSE_MONITORAMENTO';

export class Descricao implements Action {
  readonly type = DESCRICAO;
  public payload: Monitoramento;

  constructor(
    public tipo:string,

    // tslint:disable-next-line:variable-name
    public descricao:string,

    // tslint:disable-next-line:variable-name
    public id_funcionario: string,

    // tslint:disable-next-line:variable-name
    public id_atendimento: string,
  ) {
    this.payload = {
      id_funcionario,
      id_atendimento,
      tipo,
      descricao,
      uuid: uuidv4(),
      km_inicial: null,
      km_final: null,
      data_hora_inicial_km: null,
      data_hora_final_km: null,
      data_hora_inicial_virgente_local: null,
      data_hora_final_virgente_local: null,
      isUploaded: false,
      isPaused: false,
    };
  }
}

export class KmInicial implements Action {
  readonly type = KM_INICIAL;
  public payload: Monitoramento;

  constructor(
    public tipo:string,

    // tslint:disable-next-line:variable-name
    public km_inicial:number,

    // tslint:disable-next-line:variable-name
    public id_funcionario: string,

    // tslint:disable-next-line:variable-name
    public id_atendimento: string,
  ) {
    this.payload = {
      id_funcionario,
      id_atendimento,
      km_inicial,
      tipo,
      uuid: uuidv4(),
      descricao: '',
      km_final: null,
      data_hora_inicial_km: new Date(),
      data_hora_final_km: null,
      data_hora_inicial_virgente_local: null,
      data_hora_final_virgente_local: null,
      isUploaded: false,
      isPaused: false,
    };
  }
}

export class KmInicialAfterDescricao implements Action {
  readonly type = KM_INICIAL_AFTER_DESCRICAO;
  public payload: kmInicialAfterDescricaoIntefacer;

  constructor(
    // tslint:disable-next-line:variable-name
    public km_inicial:number,
    public uuid: string,
  ) {
    this.payload = {
      km_inicial,
      uuid,
      isUploaded: false,
      data_hora_inicial_km: new Date(),
    };
  }
}

export class KmFinal implements Action {
  readonly type = KM_FINAL;
  public payload: kmFinalIntefacer;

  constructor(
    public uuid: string,
     // tslint:disable-next-line:variable-name
    public km_final: number,

  ) {
    this.payload = {
      uuid,
      km_final,
      data_hora_final_km: new Date(),
      isUploaded: false,
    };
  }
}

export class Iniciar implements Action {
  readonly type = INICIAR;
  public payload: IniciarInterface;

  constructor(public uuid: string) {
    this.payload = {
      uuid,
      data_hora_inicial_virgente_local: new Date(),
      isUploaded: false,
    };
  }
}

export class Finalizar implements Action {
  readonly type = FINALIZAR;
  public payload: FinalizarInterface;

  constructor(public uuid: string) {
    this.payload = {
      uuid,
      data_hora_final_virgente_local: new Date(),
      isUploaded: false,
    };
  }
}

export class CriarMonitoramento implements Action {
  readonly type = MONITORAMENTO_CRIAR_DESLOCAMENTO;
  constructor(public payload: Monitoramento) {}
}

export class EditarMonitoramento implements Action {
  readonly type = MONITORAMENTO_EDITAR;
  constructor(public payload: Monitoramento) {}
}

export class MonitoramentoUploadSuccess implements Action {
  readonly type: string = MONITORAMENTO_UPLOAD_SUCCESS;
  constructor(public payload: Monitoramento) {}
}

export class MonitoramentoUploadFailed implements Action {
  readonly type: string = MONITORAMENTO_UPLOAD_FAILED;
  constructor(public payload: Monitoramento) {}
}

export type ActionsMonitoramento =
  |  CriarMonitoramento
  |  EditarMonitoramento
  |  MonitoramentoUploadSuccess
  |  MonitoramentoUploadFailed
  |  KmInicial
  |  KmFinal
  |  Iniciar
  |  Finalizar
  |  Descricao
  |  KmInicialAfterDescricao;

const criarMonitoramento = (monitoramentos, payload) => {
  return [...monitoramentos, payload];
};

const alterarMonitoramento = (monitoramentos, payload) => {

  const findMonitoramento =
    monitoramentos.find(monitoramento => monitoramento.uuid === payload.uuid);

  const monitoramentoAlterado = { ...findMonitoramento, ...payload };

  return monitoramentos
  .map(monitoramento =>
    (monitoramento.uuid === monitoramentoAlterado.uuid)
    ? monitoramentoAlterado
    : monitoramento,
  );
};


export const monitoramentoReducer =
(state: MonitoramentoState = INITIAL_STATE, action: ActionsMonitoramento) => {
  switch (action.type) {

    case MONITORAMENTO_CRIAR_DESLOCAMENTO:
      return {
        ...state,
        monitoramentos: [...state.monitoramentos, action.payload],
        loading: true,  error: false,
      };

    case DESCRICAO:
      return {
        ...state,
        monitoramentos: criarMonitoramento(state.monitoramentos, action.payload),
        loading: true,  error: false,
      };

    case KM_INICIAL:
      return {
        ...state,
        monitoramentos: criarMonitoramento(state.monitoramentos, action.payload),
        loading: true,  error: false,
      };

    case KM_INICIAL_AFTER_DESCRICAO:
      return {
        ...state,
        monitoramentos: alterarMonitoramento(state.monitoramentos, action.payload),
        loading: true,  error: false,
      };

    case KM_FINAL:
      return {
        ...state,
        monitoramentos: alterarMonitoramento(state.monitoramentos, action.payload),
        loading: true,  error: false,
      };

    case INICIAR:
      return {
        ...state,
        monitoramentos: alterarMonitoramento(state.monitoramentos, action.payload),
        loading: true,  error: false,
      };

    case FINALIZAR:
      return {
        ...state,
        monitoramentos: alterarMonitoramento(state.monitoramentos, action.payload),
        loading: true,  error: false,
      };

    default:
      return state;
  }
};

export const getAllMonitoramentos = (appState: State) => appState.monitoramentos.monitoramentos;

export const getAllAtividades = createSelector(
  getAllAtendimentos,
  getAllMonitoramentos,
  (atendimentos, monitoramentos) => {
    const atividades = monitoramentos.map((monitoramento) => {
      const atendimento = atendimentos.find(atd => atd._id === monitoramento.id_atendimento);
      return atendimento ? {
        ...monitoramento,
        atendimento,
      } : monitoramento;
    });
    return atividades;
  });

export const filterAllAtividadesPausadas = atividade => atividade.isPaused;

export const filterAllAtividadesEmExecucao = atividade =>
  !atividade.isPaused && atividade.data_hora_final_virgente_local === null;

export const filterAtividadeByID = atividadeID => atividade => atividade.uuid === atividadeID;

export const filterAllAtividadesConcluida = atividade =>
  atividade.data_hora_final_virgente_local !== null;


export const filterAtividadeEmExecucao = atividade =>
  !atividade.isPaused && atividade.data_hora_final_virgente_local === null;
