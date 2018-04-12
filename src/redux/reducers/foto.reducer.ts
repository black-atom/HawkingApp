import { Action, createSelector } from '@ngrx/store';

import { State } from './';
import { Foto } from './../../models';

export const ADD_FOTO = 'ADD_FOTO';
export const UPLOAD_FOTO = 'UPLOAD_FOTO';
export const UPLOAD_FOTO_SUCCESS = 'UPLOAD_FOTO_SUCCESS';
export const UPLOAD_FOTO_FAILED = 'UPLOAD_FOTO_FAILED';

export class AddFoto implements Action{
  readonly type = ADD_FOTO;
  constructor(public payload: Foto) { }
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

export type ActionsFoto =
  |  AddFoto
  |  UploadFoto
  |  UploadFotoSuccess
  |  UploadFotoFailed;

export interface ActionWithPayload<T> extends Action {
  payload?: T;
}

export const fotoReducer = (state: Foto[] = [], action: ActionsFoto) => {
  switch (action.type){

    case ADD_FOTO:
      return [...state, action.payload];

    case UPLOAD_FOTO:
      return state.map((foto) => {
        if (foto.localPath === action.payload.localPath) {
          return { ...foto, isUploading: true };
        }
        return foto;
      });

    case UPLOAD_FOTO_SUCCESS: {
      return state.map((foto) => {
        if (foto.localPath === action.payload.localPath) {
          return { ...foto, isUploaded: true, isUploading: false };
        }
        return foto;
      });
    }
    case UPLOAD_FOTO_FAILED: {
      return state.map((foto) => {
        if (foto.localPath === action.payload.localPath) {
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

export const fotosParaUploadSelector =
  createSelector(selectFotosToUpload, (fotos: Foto[]) => {
    return fotos.reduce((sum, item) => {
      return sum + 1 ;
    // tslint:disable-next-line:align
    }, 0);
  });

