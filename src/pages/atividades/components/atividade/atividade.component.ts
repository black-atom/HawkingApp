import { Component, Input } from '@angular/core';
import {
  NavController,
  ModalController,
} from 'ionic-angular';

import {
  IAtividade,
} from '../../../../models';

import {
  AtividadeDetail,
} from '../../../../components/atividade-detail/atividade-detail.component';

@Component({
  selector: 'atividade',
  templateUrl: 'atividade.html',
})
export class Atividade {

  @Input()
  atividade: IAtividade;

  constructor(
    public navCtrl: NavController,
    public modalCtrl: ModalController,
  ) {  }


  openAtividadeDetail(id) {
    this.navCtrl.push(AtividadeDetail, { id });
  }



}
