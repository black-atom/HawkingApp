import { Action, createSelector } from '@ngrx/store';
import { LoginState } from './../models';
import { State } from '.';

const INITIAL_STATE: LoginState = {
  login: null,
  loading: false,
  error: false,
  nome: null,
  foto_url: null,
  rg: null,
  _id: null,
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
      const { funcionario: { login, nome, _id, foto_url, rg } } = action.payload;
      return { ...state, _id, nome, foto_url, rg, login, loading: true,  error: false };
    case LOGIN_FAILED:
      return { ...state, error: true };
    default:
      return state;
  }
};

export const getLogin = (state: State) => state.login;

export const isLogged = createSelector(getLogin, (loginState:LoginState) => loginState
  .login !== null,
);
