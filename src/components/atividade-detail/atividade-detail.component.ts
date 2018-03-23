import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';

import { Store } from '@ngrx/store';
import { State } from './../../redux/reducers';
import { Atendimento } from '../../models';

@Component({
  selector: 'atividade-detail',
  templateUrl: 'atividade-detail.html'
})
export class AtividadeDetail {

  private AtividadeID: string;
  public AtividadeDetail$: Observable<Atendimento>;
  public title = 'Detalhes';

  constructor(
    private navParams: NavParams,
    private store: Store<State>) {
      this.AtividadeID = this.navParams.get('id');
    }

  ionViewDidLoad() {
    this.AtividadeDetail$ = this.store.select(state => {
      const { atendimentos } =  state.atendimentos;
      return atendimentos.find(atendimento => atendimento._id === this.AtividadeID);
    })
  }
}
