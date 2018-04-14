import uuidv4  from 'uuid/v4';
import { AtividadeI, AtividadeStatus, AtividadeTipo } from '../../models/atividade';
import { Atendimento } from '../../models';
import { RETRIEVE_ATENDIMENTOS_SUCCESS } from './atendimento.reducer';
import { State } from '.';
import { createSelector } from '@ngrx/store';

const INITIAL_STATE: AtividadeI[] = [];

export const atividadeReducer = (state: AtividadeI[] = INITIAL_STATE, action: any) => {
  switch (action.type) {
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
              funcionario_id,
            }) => ({
              atendimento,
              funcionario_id,
              atendimento_id: _id,
              status: AtividadeStatus.pendente,
              monitoramentos: [],
              atividade_id: uuidv4(),
              tipo: AtividadeTipo.atendimento,
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
const getAllAtendimentos = (state: State) => state.atendimentos;

const mapAtividade = (atendimentos:Atendimento[]) => (atividade: AtividadeI): AtividadeI => ({
  ...atividade,
  atendimento: atendimentos.find(atendimento => atendimento._id === atividade.atendimento_id),
});

export const getAtividadesPendentes = createSelector(
  getAllAtividades,
  getAllAtendimentos,
  (atividades: AtividadeI[], atendimentos: Atendimento[]): AtividadeI[] => {
    return atividades.map(mapAtividade(atendimentos))
      .filter(atividade => atividade.status === AtividadeStatus.pendente);
  });

export const getAtividadesEmExecucao = createSelector(
  getAllAtividades,
  getAllAtendimentos,
  (atividades: AtividadeI[], atendimentos: Atendimento[]): AtividadeI[] => {
    return atividades.map(mapAtividade(atendimentos))
      .filter(atividade => atividade.status === AtividadeStatus.em_execucao);
  });

export const getAtividadesPausadas = createSelector(
  getAllAtividades,
  getAllAtendimentos,
  (atividades: AtividadeI[], atendimentos: Atendimento[]): AtividadeI[] => {
    return atividades.map(mapAtividade(atendimentos))
      .filter(atividade => atividade.status === AtividadeStatus.pausado);
  });

export const getAtividadesConcluidas = createSelector(
  getAllAtividades,
  getAllAtendimentos,
  (atividades: AtividadeI[], atendimentos: Atendimento[]): AtividadeI[] => {
    return atividades.map(mapAtividade(atendimentos))
      .filter(atividade => atividade.status === AtividadeStatus.concluido);
  });

