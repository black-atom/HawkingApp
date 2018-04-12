import { getAllAtividades } from './../../redux/reducers/atividade.reduce';
import { Component } from '@angular/core';
import { NavParams, NavController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';

import { Store } from '@ngrx/store';
import { State } from './../../redux/reducers';
import { Atendimento } from '../../models';
import {
  RelatorioInteracaoPage,
} from '../../pages/atividades/components/relatorio-interacao/relatorio-interacao.component';
import { AtividadeI } from '../../models/atividade';

@Component({
  selector: 'atividade-detail',
  templateUrl: 'atividade-detail.html',
})
export class AtividadeDetail {

  private atividadeID: string;
  public atividadeDetail$: Observable<AtividadeI>;
  public title = 'Detalhes';

  constructor(
    public navCtrl: NavController,
    private navParams: NavParams,
    private store: Store<State>,
  ) {
    this.atividadeID = this.navParams.get('id');
  }

  ionViewDidLoad() {
    this.atividadeDetail$ = this.store.select(getAllAtividades)
      .map(atividades => atividades
        .find(atividades => atividades.atendimento_id === this.atividadeID),
      );
  }

  openRelatorioInteracaoPage() {
    this.navCtrl.push(RelatorioInteracaoPage);
  }
}
