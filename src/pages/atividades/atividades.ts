import { Component } from '@angular/core';
import { PopoverController } from 'ionic-angular';
import { Observable, Subject } from 'rxjs/Rx';
import { Store } from '@ngrx/store';

import { Atendimento, IAtividade } from '../../models';
import { State } from '../../redux/reducers';

import {
  RetriveAtendimento,
  atendimentosPendentes,
  atendimentosEmAndamento,
} from '../../redux/reducers/atendimento.reducer';

import { buttonProperties } from '../../utils/ButtonProperties';


@Component({
  selector: 'atividades',
  templateUrl: 'atividades.html',
})
export class AtividadesPage {

  public title = 'Atividades';

  public atividades$: Observable<any[]>;
  public atividadesPausadas$: Observable<IAtividade[]>;
  public atividadesEmExecucao$: Observable<IAtividade[]>;
  public atividadesPendentes$: Observable<IAtividade[]>;
  public atividadesConcluidas$: Observable<IAtividade[]>;

  public changeAtendimentos$: Subject<string> = new Subject<string>();
  public buttonProperties = buttonProperties;

  constructor(
    public popoverCtrl: PopoverController,
    private store: Store<State>,
  ) {
    this.atividadesPendentes$ = this.store.select(atendimentosPendentes);
  }

  ionViewDidLoad() {
    this.store.dispatch(new RetriveAtendimento());
  }

  eventRefresh() {
    this.store.dispatch(new RetriveAtendimento());
  }

}
