import { Component, ViewChild, Input } from '@angular/core';
import { Nav, NavParams } from 'ionic-angular';

import { FormModalComponent } from './form-modal/form-modal.component';
import { ContentModalOutros } from './content-modal/content-modal-outros/content-modal-outros';
import { ContentModalAlmoco } from './content-modal/content-modal-almoco/content-modal-almoco';
import {
  ContentModalRelatorioTecnico,
}
from './content-modal/content-modal-relatorio-tecnico/content-modal-relatorio-tecnico';
import {
  ContentModalAtendimento,
} from './content-modal/content-modal-atendimento/content-modal-atendimento';

@Component({
  selector: 'modal',
  templateUrl: 'modal.html',
})
export class ModalComponent {

  @ViewChild(Nav)
  nav: Nav;

  public rootPage;
  private page;

  constructor(
    public navParms: NavParams,
  ) {
    this.page = {
      ContentModalAlmoco,
      ContentModalOutros,
      ContentModalRelatorioTecnico,
      ContentModalAtendimento,
      FormModalComponent,
    };
  }

  ionViewDidLoad() {
    const pageType = this.navParms.get('pageType');
    this.rootPage = this.page[pageType];
    this.nav.setRoot(this.rootPage);
  }
}
