import { Component } from '@angular/core';
import { NavParams, NavController } from 'ionic-angular';

import {
  RelatorioInteracaoPage,
} from '../../pages/atividades/components/relatorio-interacao/relatorio-interacao.component';

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
  ) {
    this.atividade = this.navParams.get('id');
  }

  openRelatorioInteracaoPage(atividade) {
    this.navCtrl.push(RelatorioInteracaoPage, { atividade });
  }
}
