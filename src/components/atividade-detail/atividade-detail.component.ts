import { Component } from '@angular/core';
import { NavParams, NavController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';

import { Store } from '@ngrx/store';
import { State } from './../../redux/reducers';
import { Atendimento } from '../../models';
import {
  RelatorioInteracaoPage,
} from '../../pages/atividades/components/relatorio-interacao/relatorio-interacao.component';

@Component({
  selector: 'atividade-detail',
  templateUrl: 'atividade-detail.html',
})
export class AtividadeDetail {

  public atividadeID: string;
  public atividadeDetail$: Observable<Atendimento>;
  public title = 'Detalhes';

  constructor(
    public navCtrl: NavController,
    private navParams: NavParams,
    private store: Store<State>,
  ) {
    this.atividadeID = this.navParams.get('id');
  }

  ionViewDidLoad() {
    this.atividadeDetail$ = this.store.select((state) => {
      const { atendimentos } =  state.atendimentos;
      return atendimentos.find(atendimento => atendimento._id === this.atividadeID);
    });
  }

  openRelatorioInteracaoPage() {
    this.navCtrl.push(RelatorioInteracaoPage, { id_atendimento: this.atividadeID });
  }
}
