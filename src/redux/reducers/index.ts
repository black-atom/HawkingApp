import { AtividadeI } from './../../models/atividade';
import { atendimentoReducer } from './atendimento.reducer';
import { loginReducer } from './login.reducer';
import { LoginState } from './../models';
import { Atendimento } from '../../models';
import { atividadeReducer } from './atividade.reduce';


export interface State {
  atendimentos: [Atendimento];
  login: LoginState;
  atividades: [AtividadeI];
}

export const reducers = {
  atendimentos: atendimentoReducer,
  login: loginReducer,
  atividades: atividadeReducer,
};
