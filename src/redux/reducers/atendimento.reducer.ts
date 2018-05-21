import {
  Atendimento,
  Relatorio,
  Assinatura,
  Avaliacao,
  RemocaoRelogio,
  EquipamentoFaturamento,
} from './../../models/atendimento';
import { Action, createSelector } from '@ngrx/store';
import uuidv4  from 'uuid/v4';

import { State } from './';
import moment from 'moment';
import {
  unionWith,
  eqBy,
  prop,
} from 'ramda';

const INITIAL_STATE: Atendimento[] = [];

export const RETRIEVE_ATENDIMENTOS = 'RETRIEVE_ATENDIMENTOS';
export const RETRIEVE_ATENDIMENTOS_SUCCESS = 'RETRIEVE_ATENDIMENTOS_SUCCESS';
export const RETRIEVE_ATENDIMENTOS_FAILED = 'RETRIEVE_ATENDIMENTOS_FAILED';

export const EDITAR_ATENDIMENTO = 'EDITAR_ATENDIMENTO';
export const SAVE_RELATORIO_ATENDIMENTO = 'SAVE_RELATORIO_ATENDIMENTO';

export const SAVE_REMOVE_EQUIPAMENTO = 'SAVE_REMOVE_EQUIPAMENTO';
export const SAVE_FATURAR_EQUIPAMENTO = 'SAVE_FATURAR_EQUIPAMENTO';

export const REMOVE_REMOVE_EQUIPAMENTO = 'REMOVE_REMOVE_EQUIPAMENTO';
export const REMOVE_FATURAR_EQUIPAMENTO = 'REMOVE_FATURAR_EQUIPAMENTO';

export const SYNC_ATENDIMENTOS = 'SYNC_ATENDIMENTOS';
export const SYNC_ATENDIMENTOS_SUCCESS = 'SYNC_ATENDIMENTOS_SUCCESS';
export const SYNC_ATENDIMENTOS_FAILED = 'SYNC_ATENDIMENTOS_FAILED';

export const ADICIONAR_PERGUNTAS = 'ADICIONAR_PERGUNTAS';
export const SAVE_AVALIACAO = 'SAVE_AVALIACAO';


export const SAVE_ATENDIMENTO_ASSINATURA = 'SAVE_ATENDIMENTO_ASSINATURA';


export class RetriveAtendimento implements Action{
  readonly type: string = RETRIEVE_ATENDIMENTOS;
}

export class RetriveAtendimentoSuccess implements Action{
  readonly type: string = RETRIEVE_ATENDIMENTOS_SUCCESS;
  constructor(public payload: [Atendimento]) { }
}

export class RetriveAtendimentoFailed implements Action{
  readonly type: string = RETRIEVE_ATENDIMENTOS_FAILED;
}

export class EditarAtendimento implements Action{
  readonly type: string = EDITAR_ATENDIMENTO;
  constructor(public payload: Atendimento) { }
}

export class SaveAtendimentoAssinatura implements Action{
  readonly type: string = SAVE_ATENDIMENTO_ASSINATURA;
  constructor(public atendimentoID: string, public assinatura: Assinatura) { }
}

export class SyncAtendimentos implements Action{
  readonly type: string = SYNC_ATENDIMENTOS;
  constructor(public payload: Atendimento[]) { }
}

export class SaveAvaliacao implements Action{
  readonly type: string = SAVE_AVALIACAO;
  constructor(public atendimentoID:string, public avaliacao: Avaliacao) { }
}

export class SaveRemoveEquipamento implements Action{
  readonly type: string = SAVE_REMOVE_EQUIPAMENTO;
  constructor(public atendimentoID:string, public payload: RemocaoRelogio) {
    this.payload = {
      ...payload,
      id: uuidv4(),
    };
  }
}

export class EditarRemoveEquipamento implements Action{
  readonly type: string = SAVE_REMOVE_EQUIPAMENTO;
  constructor(public atendimentoID:string, public payload: RemocaoRelogio) { }
}

export class SaveFaturamentoEquipamento implements Action{
  readonly type: string = SAVE_FATURAR_EQUIPAMENTO;
  constructor(public atendimentoID:string, public payload: EquipamentoFaturamento) {
    this.payload = {
      ...payload,
      id: uuidv4(),
    };
  }
}

export class EditarFaturamentoEquipamento implements Action{
  readonly type: string = SAVE_FATURAR_EQUIPAMENTO;
  constructor(public atendimentoID:string, public payload: EquipamentoFaturamento) { }
}

export class SyncAtendimentosSuccess implements Action{
  readonly type: string = SYNC_ATENDIMENTOS_SUCCESS;
  constructor(public payload: Atendimento[]) { }
}

export class SyncAtendimentosFailed implements Action{
  readonly type: string = SYNC_ATENDIMENTOS_FAILED;
  constructor() { }
}

export class AdicionarPerguntas implements Action{
  readonly type: string = ADICIONAR_PERGUNTAS;
  constructor(public payload: Atendimento) { }
}

export class SaveRelatorio implements Action {
  readonly type: string = SAVE_RELATORIO_ATENDIMENTO;
  constructor(public atendimentoId: string,public payload: Relatorio) { }
}

export class RemoveEquipamentoRetirado implements Action {
  readonly type: string = REMOVE_REMOVE_EQUIPAMENTO;
  constructor(public atendimentoID: string, public payload: RemocaoRelogio) { }
}

export class RemoveEquipamentoFaturado implements Action {
  readonly type: string = REMOVE_FATURAR_EQUIPAMENTO;
  constructor(public atendimentoID: string, public payload: EquipamentoFaturamento) { }
}

export type ActionsAtendimento =
  |  RetriveAtendimento
  |  RetriveAtendimentoSuccess
  |  RetriveAtendimentoFailed
  |  EditarAtendimento
  |  SyncAtendimentos
  |  SyncAtendimentosSuccess
  |  SyncAtendimentosFailed
  |  SaveRemoveEquipamento
  |  SaveFaturamentoEquipamento
  |  EditarRemoveEquipamento
  |  EditarFaturamentoEquipamento
  |  EditarFaturamentoEquipamento
  |  RemoveEquipamentoFaturado
  |  RemoveEquipamentoRetirado
  |  SaveRelatorio
  |  AdicionarPerguntas;

export const atendimentoReducer = (
  state: Atendimento[] = INITIAL_STATE,
  action: any,
) => {
  switch (action.type) {

    case SAVE_AVALIACAO: {
      const { atendimentoID, avaliacao } = <SaveAvaliacao>action;
      return state.map(
        atendimento => atendimento._id === atendimentoID ?
        {
          ...atendimento,
          avaliacao: [avaliacao],
          synced: false,
        } :
        atendimento,
      );
    }
    // case SAVE_ATENDIMENTO_ASSINATURA: {
    //   const { atendimentoID, assinatura } = <SaveAtendimentoAssinatura>action;
    //   return state.map(
    //     atendimento => atendimento._id === atendimentoID ?
    //     {
    //       ...atendimento,
    //       assinatura,
    //       synced: false,
    //     } :
    //     atendimento,
    //   );
    // }
    case RETRIEVE_ATENDIMENTOS_SUCCESS: {
      const atendimentos = action.payload.atendimentos.map((atendimento: Atendimento) => {
        const atendimentoFound: Atendimento = state
          .find(at => at._id === atendimento._id);

        if (atendimentoFound && !atendimentoFound.synced) {
          return atendimentoFound;
        }

        return { ...atendimento, synced: true };

      });

      return unionWith(eqBy(prop('_id')), atendimentos, state);
    }

    case SAVE_RELATORIO_ATENDIMENTO: {
      const { atendimentoId, payload: relatorio } = <SaveRelatorio>action;

      return state.map(atendimento =>
        atendimento._id === atendimentoId ?
        ({
          ...atendimento,
          relatorio,
          synced: false,
        }) :
        atendimento,
      );
    }

    case SAVE_REMOVE_EQUIPAMENTO: {
      const { atendimentoID, payload } = <SaveRemoveEquipamento>action;
      const atendimentos = state;
      const findAtendimento = atendimentos.find(atendimento => atendimento._id === atendimentoID);
      if (!findAtendimento) return state;
      const relatorio =  findAtendimento.relatorio || { equipamentos_retirados: [] } ;
      // tslint:disable-next-line:variable-name
      const equipamentos_retirados: RemocaoRelogio[] = relatorio.equipamentos_retirados || [];
      let newEquipamentosRetirados;

      if (equipamentos_retirados.some(eq => eq.id === payload.id)) {
        newEquipamentosRetirados =
          equipamentos_retirados.map(eq => eq.id === payload.id ? payload : eq);
      }else {
        newEquipamentosRetirados = [...equipamentos_retirados, payload];
      }
      return state.map(atendimento =>
        atendimento._id === atendimentoID
        ? {
          ...findAtendimento,
          synced: false,
          relatorio: { ...relatorio, equipamentos_retirados: newEquipamentosRetirados },
        }
        : atendimento,
      );
    }

    case SAVE_FATURAR_EQUIPAMENTO: {
      const { atendimentoID, payload } = <SaveFaturamentoEquipamento>action;
      const atendimentos = state;
      const findAtendimento = atendimentos.find(atendimento => atendimento._id === atendimentoID);

      if (!findAtendimento) return state;
      const relatorio = findAtendimento.relatorio || { faturamento: { equipamentos: [] } };
      const faturamento = relatorio.faturamento || { equipamentos: [] } ;
      const equipamentos: EquipamentoFaturamento[] = faturamento.equipamentos || [];

      let newEquipamentosFaturados;
      if (equipamentos.some(eq => eq.id === payload.id)) {
        newEquipamentosFaturados = equipamentos.map(eq => eq.id === payload.id ? payload : eq);
      }else {
        newEquipamentosFaturados = [...equipamentos, payload];
      }
      return state.map(atendimento =>
        atendimento._id === atendimentoID
        ? {
          ...findAtendimento,
          synced: false,
          relatorio: {
            ...relatorio,
            faturamento: { ...faturamento, equipamentos: newEquipamentosFaturados },
          },
        }
        : atendimento,
      );
    }

    case SYNC_ATENDIMENTOS_SUCCESS: {
      const { payload: atendimentos } = <SyncAtendimentosSuccess>action;
      return atendimentos.map((atendimento) => {
        const currentAtendimento =  state.find(at => at._id === atendimento._id);

        return (currentAtendimento && !currentAtendimento.synced)
          ? { ...currentAtendimento, synced: true }
          : atendimentos;
      });
    }

    case REMOVE_REMOVE_EQUIPAMENTO: {
      const { atendimentoID, payload } = <RemoveEquipamentoRetirado>action;
      const findAtendimento: Atendimento = state.find(at => at._id === atendimentoID);
      const { relatorio } = findAtendimento;
      const equipamentos = relatorio.equipamentos_retirados.filter(eq => eq.id !== payload.id);

      return state.map(atd => atd._id === findAtendimento._id ? {
        ...findAtendimento,
        synced: false,
        relatorio: {
          ...relatorio,
          equipamentos_retirados: equipamentos,
        },
      }
      : atd,
      );
    }

    case REMOVE_FATURAR_EQUIPAMENTO: {
      const { atendimentoID, payload } = <RemoveEquipamentoFaturado>action;
      const findAtendimento: Atendimento = state.find(at => at._id === atendimentoID);
      const { relatorio } = findAtendimento;
      const { faturamento } = relatorio;
      const equipamentos = relatorio.faturamento.equipamentos.filter(eq => eq.id !== payload.id);

      return state.map(atd => atd._id === findAtendimento._id ? {
        ...findAtendimento,
        synced: false,
        relatorio: {
          ...relatorio,
          faturamento: { ...faturamento, equipamentos },
        },
      }
      : atd,
      );
    }


    case RETRIEVE_ATENDIMENTOS_FAILED:
      return state;

    default:
      return state;
  }
};


const isSameDate = firstDate => secondDate => moment(firstDate)
  .isSame(secondDate, 'day');

const isToday = isSameDate(new Date());

export const getAllAtendimentos = (state: State) => state.atendimentos;

export const selectAtendimentosToSync = createSelector(
  getAllAtendimentos,
  atendimentos => atendimentos.filter(atendimento => !atendimento.synced),
);

export const numeroDeAtendimentosToSync = createSelector(
  selectAtendimentosToSync,
  atendimentos => atendimentos.length,
);

export const atendimentosPendentes = createSelector(
  getAllAtendimentos,
  (atendimentos: Atendimento[]) => {
    return atendimentos.filter((atendimento) => {
      if (
        isToday(atendimento.data_atendimento) &&
        atendimento.interacao_tecnico.estado === ''
      ) return true;
      return  false;
    });
  });

export const atendimentosEmAndamento = createSelector(
  getAllAtendimentos,
  (atendimentos: Atendimento[]) => {
    return atendimentos.filter((atendimento) => {
      if (
        isToday(atendimento.data_atendimento) &&
        atendimento.interacao_tecnico.estado !== '' &&
        atendimento.interacao_tecnico.estado !== 'fim_do_atendimento'
      ) return true;
      return  false;
    });
  });

export const atendimentosConcluida = createSelector(
  getAllAtendimentos,
  (atendimentos: Atendimento[]) => {
    return atendimentos.filter((atendimento) => {
      if (
        isToday(atendimento.data_atendimento) &&
        atendimento.interacao_tecnico.estado === 'fim_do_atendimento'
      ) return true;
      return  false;
    });
  });

export const atendimentosAll = createSelector(
  getAllAtendimentos,
  (atendimentos: Atendimento[]) => atendimentos);

