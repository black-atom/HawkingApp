import { atendimentoReducer } from './atendimento.reducer';
import { loginReducer } from './login.reducer';
import { monitoramentoReducer } from './monitoramento.reducer';
import { LoginState, MonitoramentoState, AtendimentoState } from './../models';


export interface State {
  atendimentos: AtendimentoState;
  login: LoginState;
  monitoramentos: MonitoramentoState;
}

export const reducers = {
  atendimentos: atendimentoReducer,
  login: loginReducer,
  monitoramentos: monitoramentoReducer,
};
