import { Component } from '@angular/core';
import { Observable, Subject } from 'rxjs/Rx';
import { NavController, AlertController } from 'ionic-angular';
import { Store } from '@ngrx/store';

import { Atendimento } from '../../models';
import { State } from '../../redux/reducers';
import { RetriveAtendimento, atendimentosPendentes } from '../../redux/reducers/atendimento.reducer'

@Component({
  selector: 'atividades',
  templateUrl: 'atividades.html'
})
export class AtividadesPage {
  public segmentRoot: string = 'pendentes';
  public title = 'Atividades';

  public atividadesPendentes$: Observable<Atendimento[]>;
  public changeAtendimentos$: Subject<string> = new Subject<string>();

  constructor(
    public navCtrl: NavController,
    public alertCtrl: AlertController,
    private store: Store<State>
  ) {

  }

  ionViewDidLoad() {
    this.store.dispatch(new RetriveAtendimento());
    this.atividadesPendentes$ = this.changeAtendimentos$.switchMap(
      atividades => {
        return this.store.select(atendimentosPendentes);
      }
    );

    setTimeout(() => {
      this.store.dispatch(new RetriveAtendimento());
      this.changeAtendimentos$.next('1');
    }, 500);

    setInterval(() => {
      this.store.dispatch(new RetriveAtendimento());
      this.changeAtendimentos$.next('1');
    }, 60000);
  }


  eventRefresh() {
    this.store.dispatch(new RetriveAtendimento());
    this.atividadesPendentes$ = this.store.select(atendimentosPendentes);
  }
}
