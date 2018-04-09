import { atendimentoReducer } from './atendimento.reducer';
import { loginReducer } from './login.reducer';
import { LoginState, AtendimentoState } from './../models';


export interface State {
  atendimentos: AtendimentoState;
  login: LoginState;
}

export const reducers = {
  atendimentos: atendimentoReducer,
  login: loginReducer,
};
