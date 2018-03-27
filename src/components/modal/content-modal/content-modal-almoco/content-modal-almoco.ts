import { Component } from '@angular/core';
import { NavController, PopoverController } from 'ionic-angular';

import { AtividadesPage } from './../../../../layouts/atividades/atividades';
import { TabPage } from '../../../../layouts/tab-page/tab-page';
import { FormModalComponent } from '../../form-modal/form-modal.component';

@Component({
  selector: 'content-modal-almoco',
  templateUrl: 'content-modal-almoco.html',
})
export class ContentModalAlmoco {
  constructor(
    public navCtrl: NavController,
    public popoverCtrl: PopoverController,
  ) { }

  presentPopover() {
    const popover = this.popoverCtrl.create(FormModalComponent);
    popover.present();
  }

  close() {
    this.navCtrl.setRoot(TabPage);
  }
}
