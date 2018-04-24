import { Component, Input } from '@angular/core';
import {
  AlertController,
  NavController,
} from 'ionic-angular';

import {
  AtividadeDetail,
} from '../../../../components/atividade-detail/atividade-detail.component';
import { Store } from '@ngrx/store';
import { AtividadeI } from './../../../../models/atividade';
import { State } from '../../../../redux/reducers';
import { getAtividadesEmExecucao } from './../../../../redux/reducers/atividade.reduce';

@Component({
  selector: 'atividade',
  templateUrl: 'atividade.html',
})
export class Atividade {

  @Input()
  atividade: AtividadeI;

  @Input()
  situacao;

  @Input()
  class;

  private atividadeEmExecucao;

  constructor(
    public alertCtrl: AlertController,
    public navCtrl: NavController,
    private store: Store<State>,
) {
    this.store.select(getAtividadesEmExecucao)
      .subscribe(atividade => this.atividadeEmExecucao = atividade);
  }


  openAtividadeDetail({ status, atividade_id: id }) {
    status === 'PAUSE_ATIVIDADE'
    && this.atividadeEmExecucao.length > 0
    || status === 'PENDENTE' && this.atividadeEmExecucao.length > 0
    ? this.showAlert()
    : this.navCtrl.push(AtividadeDetail, { id });
  }

  showAlert() {
    const alert = this.alertCtrl.create({
      title: 'Atenção!',
      // tslint:disable-next-line:max-line-length
      subTitle: 'Para retomar ou inciar essa atividade é necessário finalizar ou pausar a atividade em execução!',
      buttons: ['OK'],
    });
    alert.present();
  }

}
