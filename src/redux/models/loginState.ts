import { UserLogin } from './../../models';

export interface LoginState {
  login: UserLogin;
  loading: boolean;
  error: boolean;
  nome: string;
  _id: string;
}
