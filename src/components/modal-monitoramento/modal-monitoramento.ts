import { Component } from '@angular/core';
import { NavController, NavParams, PopoverController } from 'ionic-angular';


import { TabPage } from './../../pages/tab-page/tab-page';
import { FormModalComponent } from './../form-modal/form-modal.component';

@Component({
  selector: 'modal-monitoramento',
  templateUrl: 'modal-monitoramento.html',
})
export class ModalMonitoramento {

  public pageType;

  constructor(
    public navParms: NavParams,
    public navCtrl: NavController,
    public popoverCtrl: PopoverController,
  ) {
    this.pageType = navParms.get('props');
  }

  presentPopover(propsButton) {

    const props = { ...propsButton, key: this.pageType.key, name: this.pageType.name };
    const options = { cssClass : 'form-modal' };
    const popover = this.popoverCtrl.create(
      FormModalComponent,
      { props },
      options,
    );
    popover.present();
  }

  close() {
    this.navCtrl.setRoot(TabPage);
  }
}
