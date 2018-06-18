import uuidv4  from 'uuid/v4';
import { Action, createSelector } from '@ngrx/store';

import { State } from './';
import { Foto } from './../../models';

export const ADD_FOTO = 'ADD_FOTO';
export const UPLOAD_FOTO = 'UPLOAD_FOTO';
export const UPLOAD_FOTO_SUCCESS = 'UPLOAD_FOTO_SUCCESS';
export const UPLOAD_FOTO_FAILED = 'UPLOAD_FOTO_FAILED';

export class AddFoto implements Action{
  readonly type = ADD_FOTO;
  public payload: Foto;
  constructor(atendimentoID, tipo= 'inicio_atendimento', localPath, pathToUpload) {
    this.payload = {
      atendimentoID,
      localPath,
      pathToUpload,
      tipo,
      isUploaded: false,
      isUploading: false,
      id: uuidv4(),
    };
  }
}

export class UploadFoto implements Action{
  readonly type = UPLOAD_FOTO;
  constructor(public payload: Foto) { }
}


export class UploadFotoSuccess implements Action{
  readonly type = UPLOAD_FOTO_SUCCESS;
  constructor(public payload: Foto) { }
}

export class UploadFotoFailed implements Action{
  readonly type = UPLOAD_FOTO_FAILED;
  constructor(public payload: Foto) { }
}

export class ActionInit implements Action{
  readonly type = '@ngrx/store/init';
}

export type ActionsFoto =
  |  AddFoto
  |  UploadFoto
  |  UploadFotoSuccess
  |  UploadFotoFailed | ActionInit;

export interface ActionWithPayload<T> extends Action {
  payload?: T;
}

export const fotoReducer = (state: Foto[] = [], action: ActionsFoto) => {
  switch (action.type){
    case '@ngrx/store/init': {
      return state.map((foto) => {
        if (foto.isUploading) {
          return { ...foto, isUploading: false };
        }
        return foto;
      });
    }

    case ADD_FOTO:
      return [...state, action.payload];

    case UPLOAD_FOTO:
      return state.map((foto) => {
        if (foto.id === action.payload.id) {
          return { ...foto, isUploading: true };
        }
        return foto;
      });

    case UPLOAD_FOTO_SUCCESS: {
      return state.map((foto) => {
        if (foto.id === action.payload.id) {
          return { ...foto, isUploaded: true, isUploading: false };
        }
        return foto;
      });
    }
    case UPLOAD_FOTO_FAILED: {
      return state.map((foto) => {
        if (foto.id === action.payload.id) {
          return { ...foto, isUploaded: false, isUploading: false };
        }
        return foto;
      });
    }
    default:
      return state;
  }
};

export const getAllFotos = (state: State) => state.fotos;

export const selectFotosToUpload =
  createSelector(getAllFotos, (fotos: Foto[]) =>
    fotos.filter(img => !img.isUploaded && !img.isUploading));

export const numeroDeFotosParaUploadSelector =
  createSelector(selectFotosToUpload, (fotos: Foto[]) => fotos.length);

