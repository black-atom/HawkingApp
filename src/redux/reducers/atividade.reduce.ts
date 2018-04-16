import { Atendimento } from './../../models/atendimento';
import uuidv4  from 'uuid/v4';
import {
  AtividadeI,
  MonitoramentoStatuses,
  AtividadeTipo,
} from '../../models/atividade';
import { RETRIEVE_ATENDIMENTOS_SUCCESS } from './atendimento.reducer';
import { State } from '.';
import { createSelector, Action } from '@ngrx/store';

const INITIAL_STATE: AtividadeI[] = [];

export const MUDA_ATIVIDADE_STATUS = 'MUDA_ATIVIDADE_STATUS';
export const SYNC_ATIVADE = 'SYNC_ATIVADE';
export const SYNC_ATIVADE_FAILED = 'SYNC_ATIVADE_FAILED';
export const SYNC_ATIVADE_SUCCESS = 'SYNC_ATIVADE_SUCESS';


export class SyncAtividade implements Action {
  type = SYNC_ATIVADE;
  constructor(public payload: AtividadeI) { }
}

export class SyncAtividadeSuccess implements Action {
  type = SYNC_ATIVADE_SUCCESS;
  constructor(public payload: AtividadeI) { }
}

export class SyncAtividadeFailed implements Action {
  type = SYNC_ATIVADE_FAILED;
  constructor(public payload: AtividadeI) { }
}

export class PauseAtividade implements Action {
  type = MUDA_ATIVIDADE_STATUS;
  payload = MonitoramentoStatuses.pauseAtividade;
  constructor(public atividadeID) { }
}

export class IniciaAtividade implements Action {
  type = MUDA_ATIVIDADE_STATUS;
  payload = MonitoramentoStatuses.inicioAtividade;
  constructor(public atividadeID) { }
}

export class FinalizaAtividade implements Action {
  type = MUDA_ATIVIDADE_STATUS;
  payload = MonitoramentoStatuses.fimAtividade;
  constructor(public atividadeID) { }
}

export class InicializaDeslocamento implements Action {
  type = MUDA_ATIVIDADE_STATUS;
  payload = MonitoramentoStatuses.inicioDeslocamento;
  constructor(public atividadeID) { }
}

export class FinalizaDeslocamento implements Action {
  type = MUDA_ATIVIDADE_STATUS;
  payload = MonitoramentoStatuses.fimDeslocamento;
  constructor(public atividadeID) { }
}

export type actionTypes = PauseAtividade
  | IniciaAtividade
  | FinalizaAtividade
  | InicializaDeslocamento
  | FinalizaDeslocamento;


export const atividadeReducer = (state: AtividadeI[] = INITIAL_STATE, action: any) => {
  switch (action.type) {
    case SYNC_ATIVADE_SUCCESS: {
      const {  payload: atividade } = <SyncAtividadeSuccess>action;
      console.log('atividade ===>',atividade);
      return state.map(
        (at: AtividadeI) => at.atividade_id === atividade.atividade_id
        ? { ...at, ...atividade, synced: true }
        : at,
      );
    }

    case MUDA_ATIVIDADE_STATUS: {
      const { atividadeID, payload: status } = <actionTypes>action;
      return state.map(
        atividade => (atividade.atividade_id === atividadeID)
        ? ({
          ...atividade,
          status,
          monitoramentos: [
            ...atividade.monitoramentos,{
              status,
              date: new Date(),
//              motivo?: string; to be implemented
            }],
        })
        : atividade,
      );
    }

    case RETRIEVE_ATENDIMENTOS_SUCCESS: {
      const atividades = action.payload.atendimentos
        .map((atendimento: Atendimento) => {
          const atividadeFound: AtividadeI = state
            .find(at => at.atendimento_id === atendimento._id);

          if (atividadeFound) {
            return atividadeFound;
          }

          const mapToAtividade = ({
              _id,
              tecnico: { _id: funcionarioId },
            }): AtividadeI => ({
              atendimento,
              funcionario_id: funcionarioId,
              atendimento_id: _id,
              status: MonitoramentoStatuses.pendente,
              monitoramentos: [],
              atividade_id: uuidv4(),
              tipo: AtividadeTipo.atendimento,
              synced: false,
            });

          return mapToAtividade(<any>atendimento);
        });

      return atividades;
    }

    default:
      return state;
  }
};


export const getAllAtividades = (state: State) => state.atividades;

export const selectAtividadesToSync = createSelector(
  getAllAtividades,
  atividades => atividades.filter(atividade => !atividade.synced),
);

const getAllAtendimentos = (state: State) => state.atendimentos;

const mapAtividade = (atendimentos:Atendimento[]) => (atividade: AtividadeI): AtividadeI => ({
  ...atividade,
  atendimento: atendimentos.find(atendimento => atendimento._id === atividade.atendimento_id),
});

const statuses = {
  PENDENTE: 'pendente',
  PAUSE_ATIVIDADE: 'pausado',
  INICIO_ATIVIDADE: 'execucao',
  FIM_ATIVIDADE: 'concluido',
  INICIO_DESLOCAMENTO: 'execucao',
  FIM_DESLOCAMENTO: 'execucao',
  CANCELA_ATIVIDADE: 'cancelado',
};

const getStatus = status => statuses[status];

export const getAtividadesPendentes = createSelector(
  getAllAtividades,
  getAllAtendimentos,
  (atividades: AtividadeI[], atendimentos: Atendimento[]): AtividadeI[] => {
    return atividades.map(mapAtividade(atendimentos))
      .filter(atividade => getStatus(atividade.status) === 'pendente');
  });

export const getAtividadesEmExecucao = createSelector(
  getAllAtividades,
  getAllAtendimentos,
  (atividades: AtividadeI[], atendimentos: Atendimento[]): AtividadeI[] => {
    return atividades.map(mapAtividade(atendimentos))
      .filter(atividade => getStatus(atividade.status) === 'execucao');
  });

export const getAtividadesPausadas = createSelector(
  getAllAtividades,
  getAllAtendimentos,
  (atividades: AtividadeI[], atendimentos: Atendimento[]): AtividadeI[] => {
    return atividades.map(mapAtividade(atendimentos))
      .filter(atividade => getStatus(atividade.status) === 'pausado');
  });

export const getAtividadesConcluidas = createSelector(
  getAllAtividades,
  getAllAtendimentos,
  (atividades: AtividadeI[], atendimentos: Atendimento[]): AtividadeI[] => {
    return atividades.map(mapAtividade(atendimentos))
      .filter(atividade => getStatus(atividade.status) === 'concluido');
  });

