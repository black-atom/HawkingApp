import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Rx';

import {
  CriarMonitoramento,
  EditarMonitoramento,
  MONITORAMENTO_CRIAR_DESLOCAMENTO
} from './../reducers/monitoramento.reducer';
import { MonitoramentoProvider } from '../../providers';


@Injectable()
export class MonitoramentoEffects {

  constructor(
    private actions$: Actions,
    private monitoramentoProvider: MonitoramentoProvider,
  ) { }

@Effect() monitoramento$ = this.actions$
  .ofType(MONITORAMENTO_CRIAR_DESLOCAMENTO)
  .map((action: any) => action.payload)
  .switchMap(payload => this.monitoramentoProvider
    .newMonitoramento(payload)
      .map(monitoramento => new CriarMonitoramento({ ...monitoramento, isUploaded: true }))
      .catch(monitoramento => Observable.of(new CriarMonitoramento(monitoramento)))
  )
}





