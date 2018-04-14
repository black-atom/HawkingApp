import {
  getAtividadesPendentes,
  getAtividadesEmExecucao,
  getAtividadesConcluidas,
} from './../../redux/reducers/atividade.reduce';
import { Component } from '@angular/core';
import { PopoverController } from 'ionic-angular';
import { Observable, Subject } from 'rxjs/Rx';
import { Store } from '@ngrx/store';

import { AtividadeI } from '../../models';
import { State } from '../../redux/reducers';

import {
  RetriveAtendimento,
} from '../../redux/reducers/atendimento.reducer';

import { buttonProperties } from '../../utils/ButtonProperties';


@Component({
  selector: 'atividades',
  templateUrl: 'atividades.html',
})
export class AtividadesPage {

  public title = 'Atividades';

  public atividades$: Observable<any[]>;
  public atividadesPausadas$: Observable<AtividadeI[]>;
  public atividadesEmExecucao$: Observable<AtividadeI[]>;
  public atividadesPendentes$: Observable<AtividadeI[]>;
  public atividadesConcluidas$: Observable<AtividadeI[]>;

  public changeAtendimentos$: Subject<string> = new Subject<string>();
  public buttonProperties = buttonProperties;

  constructor(
    public popoverCtrl: PopoverController,
    private store: Store<State>,
  ) {
    this.atividadesPendentes$ = this.store.select(getAtividadesPendentes);
    this.atividadesEmExecucao$ = this.store.select(getAtividadesEmExecucao);
    this.atividadesConcluidas$ = this.store.select(getAtividadesConcluidas);
  }

  ionViewDidLoad() {
    this.store.dispatch(new RetriveAtendimento());
  }

  eventRefresh() {
    this.store.dispatch(new RetriveAtendimento());
  }

}
