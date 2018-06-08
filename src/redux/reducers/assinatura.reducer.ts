import { State } from './index';
import { Assinatura } from '../../models';
import { Action, createSelector } from '@ngrx/store';

export const ADD_ASSINATURA = 'ADD_ASSINATURA';
export const UPLOAD_ASSINATURA = 'UPLOAD_ASSINATURA';
export const UPLOAD_ASSINATURA_SUCCESS = 'UPLOAD_ASSINATURA_SUCCESS';
export const UPLOAD_ASSINATURA_FAILED = 'UPLOAD_ASSINATURA_FAILED';


export class AddAssinatura implements Action {
  readonly type = ADD_ASSINATURA;
  payload: Assinatura;
  constructor(payload: Assinatura) {
    this.payload = {
      ...payload,
      isUploaded: false,
      isUploading: false,
    };
  }
}

export class UploadAssinatura implements Action {
  readonly type = UPLOAD_ASSINATURA;
  payload: Assinatura;
  constructor(payload: Assinatura) {
    this.payload = {
      ...payload,
      isUploading: true,
    };
  }
}

export class UploadAssinaturaSuccess implements Action {
  readonly type = UPLOAD_ASSINATURA_SUCCESS;
  payload: Assinatura;
  constructor(payload: Assinatura) {
    this.payload = {
      ...payload,
      isUploading: false,
      isUploaded: true,
    };
  }
}

export class UploadAssinaturaFailed implements Action {
  readonly type = UPLOAD_ASSINATURA_FAILED;
  payload: Assinatura;
  constructor(payload: Assinatura) {
    this.payload = {
      ...payload,
      isUploading: false,
      isUploaded: false,
    };
  }
}

export class AddAssinaturaInfo implements Action {
  readonly type = ADD_ASSINATURA;
  payload: Assinatura;
  constructor(payload: Assinatura) {
    this.payload = {
      ...payload,
      isUploaded: false,
      isUploading: false,
    };
  }
}

class ActionInit implements Action{
  readonly type = '@ngrx/store/init';
}

export type assinaturaActions =
  | AddAssinatura
  | AddAssinaturaInfo
  | UploadAssinatura
  | UploadAssinaturaSuccess
  | UploadAssinaturaFailed
  | ActionInit;

const mapper = (assinatura: Assinatura) => (stateItem: Assinatura) => {
  return assinatura.atendimentoID === stateItem.atendimentoID ?
    assinatura : stateItem;
};

export const assinaturaReducer = (state: Assinatura[] = [], action: assinaturaActions) => {

  switch (action.type) {
    case '@ngrx/store/init': {
      return state.map((assinatura) => {
        if (assinatura.isUploading) {
          return { ...assinatura, isUploading: false };
        }
        return assinatura;
      });
    }

    case ADD_ASSINATURA: {
      const assinatura = action.payload;
      const foundAssinatura = state.find(ass => ass.atendimentoID === assinatura.atendimentoID);
      return foundAssinatura ?
        state.map(mapper({ ...foundAssinatura, ...action.payload })) :
        [...state, action.payload];
    }

    case UPLOAD_ASSINATURA: {
      return state.map(mapper(action.payload));
    }

    case UPLOAD_ASSINATURA_SUCCESS: {
      return state.map(mapper(action.payload));
    }

    case UPLOAD_ASSINATURA_FAILED: {
      return state.map(mapper(action.payload));
    }

    default:
      return state;
  }
};

export const selectImagens = (state: State) => state.assinaturas;

export const selectAssinaturasToUpload = createSelector(
  selectImagens,
  (assinaturas: Assinatura[]) =>  assinaturas.filter(
    (assinatura:Assinatura) => !assinatura.isUploading && !assinatura.isUploaded),
);

export const numeroDeAssinaturasToUpload = createSelector(
  selectAssinaturasToUpload,
  (assinaturas: Assinatura[]) =>  assinaturas.length,
);
