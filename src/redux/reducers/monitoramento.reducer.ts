import { Action } from '@ngrx/store';

import { Monitoramento } from './../../models';
import { MonitoramentoState } from './../models';

const INITIAL_STATE: MonitoramentoState = {
  monitoramentos: null,
  loading: false,
  error: false,
};

export const MONITORAMENTO_CRIAR_DESLOCAMENTO = 'MONITORAMENTO_CRIAR_DESLOCAMENTO';
export const MONITORAMENTO_EDITAR = 'MONITORAMENTO_EDITAR';
export const MONITORAMENTO_UPLOAD_SUCCESS = 'MONITORAMENTO_UPLOAD_SUCCESS';
export const MONITORAMENTO_UPLOAD_FAILED = 'MONITORAMENTO_UPLOAD_FAILED';

export const CONTINUE_MONITORAMENTO = 'CONTINUE_MONITORAMENTO';
export const PAUSE_MONITORAMENTO = 'PAUSE_MONITORAMENTO';

export class CriarMonitoramento implements Action {
  readonly type = MONITORAMENTO_CRIAR_DESLOCAMENTO;
  constructor(public payload: Monitoramento) {}
};

export class EditarMonitoramento implements Action {
  readonly type = MONITORAMENTO_EDITAR;
  constructor(public payload: Monitoramento) {}
};

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
  |  MonitoramentoUploadFailed;

export const monitoramentoReducer = (state: MonitoramentoState = INITIAL_STATE, action: ActionsMonitoramento) => {
  switch (action.type) {
    case MONITORAMENTO_CRIAR_DESLOCAMENTO:
      return { ...state, monitoramentos: [...state.monitoramentos, action.payload], loading: true,  error: false };
    case MONITORAMENTO_EDITAR:
      return { ...state, error: true };
    default:
      return state;
  }
};
