import { UserLogin } from './../../models';

export interface LoginState {
  login: UserLogin;
  loading: boolean;
  error: boolean;
  nome: string;
  foto_url: string;
  rg: string;
  _id: string;
}
