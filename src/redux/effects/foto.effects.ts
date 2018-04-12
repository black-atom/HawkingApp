import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { Observable } from 'rxjs/Rx';

import { FotoProvider } from './../../providers';

import {
  UPLOAD_FOTO,
  UploadFotoSuccess,
  UploadFotoFailed,
  ActionWithPayload,
} from './../reducers/foto.reducer';
import { Foto } from '../../models';


@Injectable()
export class FotoEffects{

  public counter = 0;

  constructor(
    private actions$: Actions,
    private fotoProvider: FotoProvider,
  ) { }

  @Effect() upload$ = this.actions$.ofType(UPLOAD_FOTO)
    .map((action: ActionWithPayload<Foto>) => action.payload)
    .mergeMap(foto => this.fotoProvider.enviarFoto(foto)
      .map(() => new UploadFotoSuccess(foto))
      .catch(() => Observable.of(new UploadFotoSuccess(foto))),
  );
}
