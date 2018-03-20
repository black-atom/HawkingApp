import { Component } from '@angular/core';
import { Observable, Subject } from 'rxjs/Rx';
import { NavController, AlertController } from 'ionic-angular';
import { Store } from '@ngrx/store';

import { Atendimento } from '../../models';
import { State } from '../../redux/reducers';
import { RetriveAtendimento, atendimentosPendentes, atendimentosEmAndamento } from '../../redux/reducers/atendimento.reducer'

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
    public navCtrl: NavController,
    public alertCtrl: AlertController,
    private store: Store<State>
  ) {

  }

  ionViewDidLoad() {
    this.store.dispatch(new RetriveAtendimento());
    this.changeAtendimentos$
      .switchMap(this.swichtMapToGetAtividadesOfTab);

    setTimeout(() => {
      this.store.dispatch(new RetriveAtendimento());
      this.changeAtendimentos$.next('1');
    }, 500);

    setInterval(() => {
      this.store.dispatch(new RetriveAtendimento());
      this.changeAtendimentos$.next('1');
    }, 60000);
  }

  changeSementRoot() {
    this.store.dispatch(new RetriveAtendimento());
    this.swichtMapToGetAtividadesOfTab();
  }

  eventRefresh() {
    this.store.dispatch(new RetriveAtendimento());
    this.swichtMapToGetAtividadesOfTab();
  }

  swichtMapToGetAtividadesOfTab () {
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
