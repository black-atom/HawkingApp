import { AtividadeI } from './../../../../models/atividade';
import { Component, Input } from '@angular/core';
import { NavController } from 'ionic-angular';

import {
  AtividadeDetail,
} from '../../../../components/atividade-detail/atividade-detail.component';

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

  constructor(
    public navCtrl: NavController,
  ) {  }


  openAtividadeDetail(id) {
    this.navCtrl.push(AtividadeDetail, { id });
  }



}
