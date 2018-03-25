import { Action } from '@ngrx/store';
import { LoginState } from './../models';

const INITIAL_STATE: LoginState = {
  login: null,
  loading: false,
  error: false,
  token: '',
  nome: null,
};

export const LOGIN = 'LOGIN';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILED = 'LOGIN_FAILED';
export const LOGOUT = 'LOGOUT';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';

export class Login implements Action {
  readonly type = LOGIN;
  constructor(public payload) { }
}

export class LoginSuccess implements Action {
  readonly type = LOGIN_SUCCESS;
  constructor(public payload) { }
}

export class LoginFailed implements Action {
  readonly type = LOGIN_FAILED;
}

export type ActionsMonitoramento =
  |  Login
  |  LoginSuccess
  |  LoginFailed;

export const loginReducer = (state: LoginState = INITIAL_STATE, action: ActionsMonitoramento) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      const { funcionario: { login, nome }, token } = action.payload;
      return { ...state, nome, login, token, loading: true,  error: false };
    case LOGIN_FAILED:
      return { ...state, error: true };
    default:
      return state;
  }
};
