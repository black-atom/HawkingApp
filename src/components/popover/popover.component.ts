import { Component } from '@angular/core';
import {
  ViewController,
  NavParams,
  NavController,
} from 'ionic-angular';

import { AtividadeDetail } from './../atividade-detail/atividade-detail.component';

@Component({
  selector: 'popover',
  templateUrl: 'popover.html',
})
export class PopoverComponent {

  public buttonProperties = [];

  constructor(
    public navParms: NavParams,
    public navCtrl: NavController,
  ) {
    this.buttonProperties = navParms.get('buttonProperties');
  }

  openAtividadeDetail(id) {
    this.navCtrl.push(AtividadeDetail, { id });
  }
}
