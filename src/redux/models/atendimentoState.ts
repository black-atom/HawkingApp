import { Atendimento } from './../../models';

export interface AtendimentoState {
  atendimentos: Atendimento[];
  loading: boolean;
  error: boolean;
};
