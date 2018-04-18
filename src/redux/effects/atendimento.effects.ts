import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Rx';

import {
  RETRIEVE_ATENDIMENTOS,
  RetriveAtendimentoSuccess,
  RetriveAtendimentoFailed,
  SYNC_ATENDIMENTOS,
  SyncAtendimentos,
  SyncAtendimentosSuccess,
  SyncAtendimentosFailed,
} from './../reducers/atendimento.reducer';
import { AtendimentoProvider } from '../../providers';
import {
  UPLOAD_ASSINATURA,
  UploadAssinaturaSuccess,
  UploadAssinaturaFailed,
} from '../reducers/assinatura.reducer';
import { ActionWithPayload } from '../reducers/foto.reducer';
import { Assinatura } from '../../models';


@Injectable()
export class AtendimentoEffects {

  constructor(
    private actions$: Actions,
    private atendimentoProvider: AtendimentoProvider,
  ) { }

  @Effect() atendimentos$ = this.actions$
    .ofType(RETRIEVE_ATENDIMENTOS)
    .map((action: any) => action.payload)
    .switchMap(payload => this.atendimentoProvider
      .getAllAtendimentosToday()
        .map(atendimentos => new RetriveAtendimentoSuccess(atendimentos))
        .catch(() => Observable.of(new RetriveAtendimentoFailed())),
  );

  @Effect() synAtendimentos$ = this.actions$
    .ofType(SYNC_ATENDIMENTOS)
    .map((action: SyncAtendimentos) => action.payload)
    .switchMap(atendimentos => this.atendimentoProvider
      .syncAtendimentos(atendimentos)
      .map(atds => new SyncAtendimentosSuccess(atds))
      .catch(() => Observable.of(new SyncAtendimentosFailed())),
    );

  @Effect() syncAssinaturas$ = this.actions$
    .ofType(UPLOAD_ASSINATURA)
    .map((action: ActionWithPayload<Assinatura>) => action.payload)
    .switchMap(assinatura => this.atendimentoProvider.enviarAssinatura(assinatura)
      .map(res => new UploadAssinaturaSuccess(assinatura))
      .catch(() => Observable.of(new UploadAssinaturaFailed(assinatura))),
    );
}
