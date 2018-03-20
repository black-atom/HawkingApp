import { Component } from '@angular/core';
import { Observable, Subject } from 'rxjs/Rx';
import { AlertController } from 'ionic-angular';
import { Store } from '@ngrx/store';

import { Atendimento } from '../../models';
import { State } from '../../redux/reducers';

import {
  RetriveAtendimento,
  atendimentosPendentes,
  atendimentosEmAndamento
} from '../../redux/reducers/atendimento.reducer'

@Component({
  selector: 'atividades',
  templateUrl: 'atividades.html'
})
export class AtividadesPage {

  public segmentRoot: string = 'pendentes';

  public title = 'Atividades';

  public atividades$: Observable<Atendimento[]>;
  public changeAtendimentos$: Subject<string> = new Subject<string>();

  constructor(
    public alertCtrl: AlertController,
    private store: Store<State>
  ) {

  }

  ionViewDidLoad() {
    this.store.dispatch(new RetriveAtendimento());
  }

  eventRefresh() {
    this.swichtMapToGetAtividadesOfTab();
  }

  swichtMapToGetAtividadesOfTab () {
    this.store.dispatch(new RetriveAtendimento());
    switch(this.segmentRoot) {
      case 'pendentes':
        return this.atividades$ = this.store.select(atendimentosPendentes)
      case 'em-execucao':
        return this.atividades$ = this.store.select(atendimentosEmAndamento)
      default:
        return this.atividades$ = this.store.select(atendimentosPendentes)
    }
  }
}
