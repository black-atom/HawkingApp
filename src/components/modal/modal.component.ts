import { Component, ViewChild, Input } from '@angular/core';
import { Nav, NavParams } from 'ionic-angular';

import { ContentModalAlmocoAbastecimentoEmpresa } from './content-modal/content-modal-almoco-abastecimento-empresa/content-modal-almoco-abastecimento-empresa';
import { ContentModalAtendimento } from './content-modal/content-modal-atendimento/content-modal-atendimento';
import { ContentModalOutros } from './content-modal/content-modal-outros/content-modal-outros';
import { ContentModalRelatorioTecnico } from './content-modal/content-modal-relatorio-tecnico/content-modal-relatorio-tecnico';

@Component({
  selector: 'modal',
  templateUrl: 'modal.html',
})
export class ModalComponent {

  @ViewChild(Nav)
  nav: Nav;

  public rootPage = ContentModalAlmocoAbastecimentoEmpresa;
  private page;

  constructor(
    public navParms: NavParams,
  ) {
    this.page = {
      ContentModalAlmocoAbastecimentoEmpresa,
      ContentModalOutros,
      ContentModalRelatorioTecnico,
      ContentModalAtendimento,
    };
  }

  ionViewDidLoad() {
    const pageType = this.navParms.get('pageType');
    this.rootPage = this.page[pageType];
    this.nav.setRoot(this.rootPage);
  }
}
