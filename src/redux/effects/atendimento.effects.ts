import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Rx';

import {
  RETRIEVE_ATENDIMENTOS,
  RetriveAtendimentoSuccess,
  RetriveAtendimentoFailed,
} from './../reducers/atendimento.reducer';
import { AtendimentoProvider } from '../../providers';


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
}





