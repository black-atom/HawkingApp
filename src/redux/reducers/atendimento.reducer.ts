import { Action, createSelector } from '@ngrx/store';

import { Atendimento } from './../../models';
import { AtendimentoState } from './../models';
import { State } from './';
import moment from 'moment';

const INITIAL_STATE: AtendimentoState = {
  atendimentos: [],
  loading: false,
  error: false,
};

export const RETRIEVE_ATENDIMENTOS = 'RETRIEVE_ATENDIMENTOS';
export const RETRIEVE_ATENDIMENTOS_SUCCESS = 'RETRIEVE_ATENDIMENTOS_SUCCESS';
export const RETRIEVE_ATENDIMENTOS_FAILED = 'RETRIEVE_ATENDIMENTOS_FAILED';

export const EDITAR_ATENDIMENTO = 'EDITAR_ATENDIMENTO';

export const SYNC_ATENDIMENTOS = 'SYNC_ATENDIMENTOS';
export const SYNC_ATENDIMENTOS_SUCCESS = 'SYNC_ATENDIMENTOS_SUCCESS';
export const SYNC_ATENDIMENTOS_FAILED = 'SYNC_ATENDIMENTOS_FAILED';

export const ADICIONAR_PERGUNTAS = 'ADICIONAR_PERGUNTAS';

export class RetriveAtendimento implements Action{
  readonly type: string = RETRIEVE_ATENDIMENTOS;
}

export class RetriveAtendimentoSuccess implements Action{
  readonly type: string = RETRIEVE_ATENDIMENTOS_SUCCESS;
  constructor(public payload: Atendimento) { }
}

export class RetriveAtendimentoFailed implements Action{
  readonly type: string = RETRIEVE_ATENDIMENTOS_FAILED;
}

export class EditarAtendimento implements Action{
  readonly type: string = EDITAR_ATENDIMENTO;
  constructor(public payload: Atendimento) { }
}

export class SyncAtendimentos implements Action{
  readonly type: string = SYNC_ATENDIMENTOS;
  constructor(public payload: Atendimento) { }
}

export class SyncAtendimentosSuccess implements Action{
  readonly type: string = SYNC_ATENDIMENTOS_SUCCESS;
  constructor(public payload: Atendimento) { }
}

export class SyncAtendimentosFailed implements Action{
  readonly type: string = SYNC_ATENDIMENTOS_FAILED;
  constructor(public payload: Atendimento) { }
}

export class AdicionarPerguntas implements Action{
  readonly type: string = ADICIONAR_PERGUNTAS;
  constructor(public payload: Atendimento) { }
}

export type ActionsAtendimento =
  |  RetriveAtendimento
  |  RetriveAtendimentoSuccess
  |  RetriveAtendimentoFailed
  |  EditarAtendimento
  |  SyncAtendimentos
  |  SyncAtendimentosSuccess
  |  SyncAtendimentosFailed
  |  AdicionarPerguntas;

export const atendimentoReducer = (state: AtendimentoState = INITIAL_STATE, action: any) => {
  switch (action.type) {

    case RETRIEVE_ATENDIMENTOS_SUCCESS: {
      const atendimentos = action.payload.atendimentos.map((atendimento: Atendimento) => {
        const atendimentoFound: Atendimento = state
          .atendimentos.find(at => at._id === atendimento._id);

        if (atendimentoFound && !atendimentoFound.synced) {
          return atendimentoFound;
        }

        return atendimento;

      });

      return { ...state, atendimentos, loading: true, error: false };
    }

    case RETRIEVE_ATENDIMENTOS_FAILED:
      return { ...state, loading: false, error: true };

    default:
      return state;
  }
};


const isSameDate = firstDate => secondDate => moment(firstDate)
  .isSame(secondDate, 'day');

const isToday = isSameDate(new Date());

export const getallAtendimentos = (state: State) => state.atendimentos;

export const atendimentosPendentes = createSelector(
  getallAtendimentos,
  (atendimentoState: AtendimentoState) => {
    return atendimentoState.atendimentos.filter((atendimento) => {
      if (
        isToday(atendimento.data_atendimento) &&
        atendimento.interacao_tecnico.estado === ''
      ) return true;
      return  false;
    });
  });

export const atendimentosEmAndamento = createSelector(
  getallAtendimentos,
  (atendimentoState: AtendimentoState) => {
    return atendimentoState.atendimentos.filter((atendimento) => {
      if (
        isToday(atendimento.data_atendimento) &&
        atendimento.interacao_tecnico.estado !== '' &&
        atendimento.interacao_tecnico.estado !== 'fim_do_atendimento'
      ) return true;
      return  false;
    });
  });

export const atendimentosConcluida = createSelector(
  getallAtendimentos,
  (atendimentoState: AtendimentoState) => {
    return atendimentoState.atendimentos.filter((atendimento) => {
      if (
        isToday(atendimento.data_atendimento) &&
        atendimento.interacao_tecnico.estado === 'fim_do_atendimento'
      ) return true;
      return  false;
    });
  });
