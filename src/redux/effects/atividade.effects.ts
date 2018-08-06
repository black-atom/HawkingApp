import { Observable } from 'rxjs/Rx';
import {
  SYNC_ATIVADE,
  SyncAtividade,
  SyncAtividadeSuccess,
  SyncAtividadeFailed,
  ReTrieveAtivadesSuccess,
  ReTrieveAtivadesFailed,
} from './../reducers/atividade.reduce';
import { MonitoramentoProvider } from './../../providers/monitoramento.provider';
import { Actions, Effect } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import {
  RetriveAtendimentoSuccess,
  RETRIEVE_ATENDIMENTOS_SUCCESS,
} from '../reducers/atendimento.reducer';
import { Atendimento } from '../../models';

@Injectable()
export class AtividadeEffects{
  constructor(
    private actions$: Actions,
    private monitoramentoProvidader: MonitoramentoProvider,
  ) { }

  @Effect()
  syncAtividade$ = this.actions$
    .ofType(SYNC_ATIVADE)
    .map((action: SyncAtividade) => action.payload)
    .mergeMap(atividade => this
      .monitoramentoProvidader
      .saveAtividade(atividade)
      .map(at => new SyncAtividadeSuccess(at))
      .catch(() => Observable.of(new SyncAtividadeFailed(atividade))),
    );

  @Effect()
  getAtividades$ =  this.actions$
    .ofType(RETRIEVE_ATENDIMENTOS_SUCCESS)
    .map((action: RetriveAtendimentoSuccess) => action.payload)
    .mergeMap((atendimentos: [Atendimento]) => this.monitoramentoProvidader
      .getAtividades()
      .map(atividades => new ReTrieveAtivadesSuccess(atividades, atendimentos))
      .catch(() => Observable.of(new ReTrieveAtivadesFailed())));
}
