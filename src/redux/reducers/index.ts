import { atividadeReducer } from './atividade.reduce';
import { atendimentoReducer } from './atendimento.reducer';
import { fotoReducer } from './foto.reducer';
import { loginReducer } from './login.reducer';

import { LoginState } from './../models';
import { Atendimento, AtividadeI, Foto } from './../../models';

export interface State {
  atendimentos: [Atendimento];
  atividades: [AtividadeI];
  fotos: [Foto];
  login: LoginState;
}

export const reducers = {
  atendimentos: atendimentoReducer,
  atividades: atividadeReducer,
  fotos: fotoReducer,
  login: loginReducer,
};
