import { Atendimento } from './../../models/atendimento';
import uuidv4  from 'uuid/v4';
import moment from 'moment';
import {
  unionWith,
  eqBy,
  prop,
} from 'ramda';
import {
  AtividadeI,
  MonitoramentoStatuses,
  AtividadeTipo,
} from '../../models/atividade';
import { State } from '.';
import { createSelector, Action } from '@ngrx/store';

const INITIAL_STATE: AtividadeI[] = [];

export const CRIAR_ATIVIDADE = 'CRIAR_ATIVIDADE';
export const CRIAR_ATIVIDADE_DESCRICAO = 'CRIAR_ATIVIDADE_DESCRICAO';
export const CANCELAR_ATIVIDADE = 'CANCELAR_ATIVIDADE';
export const PAUSAR_ATIVIDADE = 'PAUSAR_ATIVIDADE';

export const MUDA_ATIVIDADE_STATUS = 'MUDA_ATIVIDADE_STATUS';
export const SYNC_ATIVADE = 'SYNC_ATIVADE';
export const SYNC_ATIVADE_FAILED = 'SYNC_ATIVADE_FAILED';
export const SYNC_ATIVADE_SUCCESS = 'SYNC_ATIVADE_SUCESS';
export const RETRIEVE_ATIVIDADES_SUCCESS = 'RETRIEVE_ATIVIDADES_SUCCESS';
export const RETRIEVE_ATIVIDADES_FAILED =  'RETRIEVE_ATIVIDADES_FAILED';


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

export class CriarAtividade implements Action {
  type = CRIAR_ATIVIDADE;
  payload;
  constructor(public funcionarioID, public tipo) {
    this.payload = { funcionarioID, tipo };
  }
}

export class CriarAtividadeDescricao implements Action {
  type = CRIAR_ATIVIDADE_DESCRICAO;
  payload;
  constructor(
    public funcionarioID,
    public tipo,
    public descricao,
  ) {
    this.payload = { funcionarioID, tipo, descricao };
  }
}

export class CancelarAtividade implements Action {
  type = CANCELAR_ATIVIDADE;
  payload = MonitoramentoStatuses.cancelaAtividade;
  constructor(public atividadeID, public motivo) { }
}

export class PauseAtividade implements Action {
  type = PAUSAR_ATIVIDADE;
  payload = MonitoramentoStatuses.pauseAtividade;
  constructor(public atividadeID, public motivo) { }
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

export class ReTrieveAtivadesSuccess implements Action {
  type = RETRIEVE_ATIVIDADES_SUCCESS;
  constructor(public payload: [AtividadeI], public atendimentos: [Atendimento]) { }
}

export class ReTrieveAtivadesFailed implements Action {
  type = RETRIEVE_ATIVIDADES_FAILED;
  constructor() { }
}

export type actionTypes = PauseAtividade
  | CriarAtividade
  | CriarAtividadeDescricao
  | CancelarAtividade
  | IniciaAtividade
  | FinalizaAtividade
  | InicializaDeslocamento
  | FinalizaDeslocamento
  | ReTrieveAtivadesSuccess;


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
      const { atividadeID, payload: status } = <InicializaDeslocamento>action;
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
          synced: false,
        })
        : atividade,
      );
    }

    case RETRIEVE_ATIVIDADES_SUCCESS: {
      const { payload: atividades,  atendimentos } = <ReTrieveAtivadesSuccess> action;
      const atividadesFromAtendimentos = atendimentos
        .map((atendimento: Atendimento) => {
          const atividadeFound: AtividadeI = state
            .find(at => at.atendimento_id === atendimento._id) 
          || atividades
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
              descricao: null,
              status: MonitoramentoStatuses.pendente,
              monitoramentos: [],
              atividade_id: uuidv4(),
              tipo: AtividadeTipo.atendimento,
              synced: false,
              localCreatedAt: new Date(),
            });

          return mapToAtividade(<any>atendimento);
        });
      
      const atividadesFromAtvidades = atividades.map(atividade => ({
          ...atividade,
          synced: true,
        }))
        .map((atividade: AtividadeI) => {
          const atividadeFound: AtividadeI = state
            .find(at => at.atividade_id === atividade.atividade_id);

          if (atividadeFound) {
            return atividadeFound;
          }

          return atividade;
        });

      console.log('atividadesFromAtendimentos', atividadesFromAtendimentos)
      console.log('atividades', atividades)
      console.log('state', state)
      const unionAtividadesAndState = unionWith(
        eqBy(prop('atividade_id')),
        state,
        atividadesFromAtvidades,
      );

      return unionWith(
        eqBy(prop('atividade_id')),
        unionAtividadesAndState,
        atividadesFromAtendimentos,
      );
    }

    case CRIAR_ATIVIDADE: {
      const atividade: AtividadeI = {
        atendimento: null,
        funcionario_id: action.payload.funcionarioID,
        atendimento_id: null,
        descricao: null,
        status: MonitoramentoStatuses.inicioDeslocamento,
        monitoramentos: [{ status: MonitoramentoStatuses.inicioDeslocamento, date: new Date() }],
        atividade_id: uuidv4(),
        tipo: action.payload.tipo,
        synced: false,
        localCreatedAt: new Date(),
      };
      return [...state, atividade];
    }
    case CRIAR_ATIVIDADE_DESCRICAO: {
      const atividade: AtividadeI = {
        atendimento: null,
        funcionario_id: action.payload.funcionarioID,
        atendimento_id: null,
        status: MonitoramentoStatuses.criarAtividade,
        descricao: action.payload.descricao,
        monitoramentos: [],
        atividade_id: uuidv4(),
        tipo: action.payload.tipo,
        synced: false,
        localCreatedAt: new Date(),
      };
      return [...state, atividade];
    }
    case CANCELAR_ATIVIDADE: {
      const { atividadeID, motivo, payload: status } = action;

      return state.map(atividade => (atividade.atividade_id === atividadeID)
      ? ({
        ...atividade,
        status,
        monitoramentos: [
          ...atividade.monitoramentos,{
            status,
            motivo,
            date: new Date(),
          }],
        synced: false,
      }) : atividade);

    }
    case PAUSAR_ATIVIDADE: {
      const { atividadeID, motivo, payload: status } = action;

      return state.map(atividade => (atividade.atividade_id === atividadeID)
      ? ({
        ...atividade,
        status,
        monitoramentos: [
          ...atividade.monitoramentos,{
            status,
            motivo,
            date: new Date(),
          }],
        synced: false,
      }) : atividade);

    }
    default:
      return state;
  }
};

const isSameDate = firstDate => secondDate => moment(firstDate)
  .isSame(secondDate, 'day');

const isToday = isSameDate(new Date());

export const getAllAtividades = (state: State) => state.atividades;
const getAllAtendimentos = (state: State) => state.atendimentos;

const mapAtividade = (atendimentos:Atendimento[]) => (atividade: AtividadeI): AtividadeI => ({
  ...atividade,
  atendimento: atendimentos.find(atendimento => atendimento._id === atividade.atendimento_id),
});

export const getAllAtividadesOfToday = createSelector(
  getAllAtividades,
  getAllAtendimentos,
  (atividades: AtividadeI[], atendimentos: Atendimento[]): AtividadeI[] => {
    return  atividades
      .filter(atendimento => isToday(atendimento.localCreatedAt || atendimento.createdAt))
      .map(mapAtividade(atendimentos));
  },
);

export const selectAtividadesToSync = createSelector(
  getAllAtividades,
  atividades => atividades.filter(atividade => !atividade.synced),
);

export const numeroAtividadesToSync = createSelector(
  selectAtividadesToSync,
  atividades => atividades.length,
);

const statuses = {
  PENDENTE: 'pendente',
  PAUSE_ATIVIDADE: 'pausado',
  INICIO_ATIVIDADE: 'execucao',
  FIM_ATIVIDADE: 'concluido',
  INICIO_DESLOCAMENTO: 'execucao',
  FIM_DESLOCAMENTO: 'execucao',
  CANCELA_ATIVIDADE: 'concluido',
  CRIAR_ATIVIDADE: 'execucao',
};

const getStatus = status => statuses[status];

export const getAtividadesPendentes = createSelector(
  getAllAtividadesOfToday,
  (atividades: AtividadeI[]): AtividadeI[] => {
    return atividades
      .filter(atividade => getStatus(atividade.status) === 'pendente');
  });

export const getAtividadesEmExecucao = createSelector(
  getAllAtividadesOfToday,
  (atividades: AtividadeI[]): AtividadeI[] => {
    return atividades
      .filter(atividade => getStatus(atividade.status) === 'execucao');
  });

export const getAtividadesPausadas = createSelector(
  getAllAtividadesOfToday,
  (atividades: AtividadeI[]): AtividadeI[] => {
    return atividades
      .filter(atividade => getStatus(atividade.status) === 'pausado');
  });

export const getAtividadesConcluidas = createSelector(
  getAllAtividadesOfToday,
  (atividades: AtividadeI[]): AtividadeI[] => {
    return atividades
      .filter(atividade => getStatus(atividade.status) === 'concluido');
  });

const selectButtonState = {
  CRIAR_ATIVIDADE: 'iniciar_deslocamento',
  INICIO_DESLOCAMENTO: 'finalizar_deslocamento',
  FIM_DESLOCAMENTO: 'iniciar_atividade',
  INICIO_ATIVIDADE: 'finalizar_atividade',
};

export const selectButton = createSelector(
  getAtividadesEmExecucao,
  (atividades) => {
    const atividade: AtividadeI = atividades[0];
    if (atividades.length <= 0) return 'iniciar_deslocamento';
    return selectButtonState[atividade.status];
  });
