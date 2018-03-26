import { Component } from '@angular/core';
import { PopoverController } from 'ionic-angular';

import { PopoverComponent } from '../../../popover/popover.component';

@Component({
  selector: 'content-modal-almoco-abastecimento-empresa',
  templateUrl: 'content-modal-almoco-abastecimento-empresa.html',
})
export class ContentModalAlmocoAbastecimentoEmpresa {

  public fabIcon = 'add';
  public buttonProperties = [
    {
      name: 'Km inicial',
      imgPath: 'assets/icon/start.svg',
      pageType: 'ModalFormComponent',
    },
    {
      name: 'Km final',
      imgPath: 'assets/icon/finish.svg',
      pageType: 'ContentModalAlmocoAbastecimentoEmpresa',
    },
    {
      name: 'iniciar',
      imgPath: 'assets/icon/work.svg',
      pageType: 'ContentModalAlmocoAbastecimentoEmpresa',
    },
    {
      name: 'finalizar',
      imgPath: 'assets/icon/checked.svg',
      pageType: 'ContentModalOutros',
    },
  ];

  constructor(
    public popoverCtrl: PopoverController,
  ) { }

  presentPopover() {
    const popover = this.popoverCtrl.create(
      PopoverComponent,
      { buttonProperties: this.buttonProperties },
    );
    popover.present();
  }

}
