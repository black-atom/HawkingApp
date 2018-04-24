import { Observable } from 'rxjs/Rx';
import {
  SYNC_ATIVADE,
  SyncAtividade,
  SyncAtividadeSuccess,
  SyncAtividadeFailed,
} from './../reducers/atividade.reduce';
import { MonitoramentoProvider } from './../../providers/monitoramento.provider';
import { Actions, Effect } from '@ngrx/effects';
import { Injectable } from '@angular/core';

@Injectable()
export class AtividadeEffects{
  constructor(
    private actions$: Actions,
    private monitoramentoProvidade: MonitoramentoProvider,
  ) { }

  @Effect()
  syncAtividade$ = this.actions$
    .ofType(SYNC_ATIVADE)
    .map((action: SyncAtividade) => action.payload)
    .mergeMap(atividade => this
      .monitoramentoProvidade
      .saveAtividade(atividade)
      .map(at => new SyncAtividadeSuccess(at))
      .catch(() => Observable.of(new SyncAtividadeFailed(atividade))),
    );
}
