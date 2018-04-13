import { getAllAtividades } from './../../redux/reducers/atividade.reduce';
import { Component, Input } from '@angular/core';
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

  public atividade;
  public title = 'Detalhes';
  public actionSegments = 'acoes';

  constructor(
    public navCtrl: NavController,
    private navParams: NavParams,
    private store: Store<State>,
  ) {
    this.atividade = this.navParams.get('id');
  }

  openRelatorioInteracaoPage(atividade) {
    this.navCtrl.push(RelatorioInteracaoPage, { atividade });
  }
}
