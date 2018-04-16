import { Component } from '@angular/core';
import { NavParams, NavController, PopoverController } from 'ionic-angular';
import { LaunchNavigator } from '@ionic-native/launch-navigator';

import {
  RelatorioInteracaoPage,
} from '../../pages/atividades/components/relatorio-interacao/relatorio-interacao.component';
import { State } from '../../redux/reducers';
import { Store } from '@ngrx/store';
import { IniciaAtividade,
  FinalizaAtividade,
  InicializaDeslocamento,
  FinalizaDeslocamento,
  PauseAtividade } from '../../redux/reducers/atividade.reduce';
import { AtividadeI } from './../../models/atividade';

import {
  AssinaturaFormComponent,
} from '../../pages/atividades/components/assinatura-form/assinatura-form.component';

@Component({
  selector: 'atividade-detail',
  templateUrl: 'atividade-detail.html',
})
export class AtividadeDetail {

  public atividade: AtividadeI;
  public title = 'Detalhes';
  public actionSegments = 'acoes';

  constructor(
    public navCtrl: NavController,
    private navParams: NavParams,
    public popoverCtrl: PopoverController,
    private launchNavigator: LaunchNavigator,
    private store: Store<State>,
  ) {
    this.atividade = this.navParams.get('id');
  }

  iniciarAtividade() {
    const { atividade_id } = this.atividade;
    this.store.dispatch(new IniciaAtividade(atividade_id));
  }

  finalizarAtividade() {
    const { atividade_id } = this.atividade;
    this.store.dispatch(new FinalizaAtividade(atividade_id));
  }

  inicializaDeslocamento() {
    const { atividade_id } = this.atividade;
    this.store.dispatch(new InicializaDeslocamento(atividade_id));
  }

  finalizaDeslocamento() {
    const { atividade_id } = this.atividade;
    this.store.dispatch(new FinalizaDeslocamento(atividade_id));
  }

  pausaAtividade() {
    const { atividade_id } = this.atividade;
    this.store.dispatch(new PauseAtividade(atividade_id));
  }
  openGPS() {
    const { atendimento: { endereco } } = this.atividade;
    endereco && this.launchNavigator
      .navigate(`${endereco.numero} ${endereco.rua},${endereco.bairro},${endereco.cidade}`);
  }
  openRelatorioInteracaoPage(atividade) {
    this.navCtrl.push(RelatorioInteracaoPage, { atividade });
  }

  openAssinaturaForm() {
    const data: any = {};
    const options = { cssClass : 'assinatura-modal' };
    const popover = this.popoverCtrl.create(
      AssinaturaFormComponent,
      data,
      options,
    );
    popover.present();
  }
}
