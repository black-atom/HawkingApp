import { Component } from '@angular/core';
import { NavParams, NavController } from 'ionic-angular';

import {
  ContentModalMonitoramento,
} from './content-modal-monitoramento/content-modal-monitoramento';


@Component({
  selector: 'modal',
  templateUrl: 'modal.html',
})
export class ModalComponent {

  public rootPage;
  private page;

  constructor(
    public navParms: NavParams,
    public navCtrl: NavController,
  ) {
    this.page = {
      ContentModalMonitoramento,
    };
  }

  ionViewDidLoad() {
    const propsPageType = this.navParms.get('props');
    this.rootPage = ContentModalMonitoramento;
    this.navCtrl.push(this.rootPage, { propsPageType });
  }
}
