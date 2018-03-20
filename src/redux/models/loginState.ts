import { UserLogin } from './../../models';

export interface LoginState {
  login: UserLogin;
  loading: boolean;
  error: boolean;
  token: string;
  nome: string;
};
