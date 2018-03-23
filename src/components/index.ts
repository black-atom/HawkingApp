import { ContentModalOutros } from './modal/content-modal/content-modal-outros/content-modal-outros';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { AtividadeDetailModule } from './atividade-detail/atividade-detail.module';

import { NavbarComponent } from './navbar/navbar.component';
import { SideMenuComponent } from './sidemenu/sidemenu.component';
import { TabFooterComponent } from './tab-footer/tab-footer.component';
import { FabButtonComponent } from './fab-button/fab-button.component';
import { PopoverComponent } from './popover/popover.component';
import { ModalComponent } from './modal/modal.component';
import { ContentModalAtendimento } from './modal/content-modal/content-modal-atendimento/content-modal-atendimento';
import { ContentModalAlmocoAbastecimentoEmpresa } from './modal/content-modal/content-modal-almoco-abastecimento-empresa/content-modal-almoco-abastecimento-empresa';
import { ContentModalRelatorioTecnico } from './modal/content-modal/content-modal-relatorio-tecnico/content-modal-relatorio-tecnico';

@NgModule({
  imports:[
    AtividadeDetailModule,
    IonicPageModule,
  ],
  declarations: [
    ContentModalAtendimento,
    ContentModalAlmocoAbastecimentoEmpresa,
    ContentModalOutros,
    ContentModalRelatorioTecnico,
    FabButtonComponent,
    NavbarComponent,
    PopoverComponent,
    SideMenuComponent,
    TabFooterComponent,
    ModalComponent,
  ],
  entryComponents: [
    NavbarComponent,
    PopoverComponent,
    ModalComponent,
    ContentModalAtendimento,
    ContentModalAlmocoAbastecimentoEmpresa,
    ContentModalOutros,
    ContentModalRelatorioTecnico,
  ],
  exports: [
    AtividadeDetailModule,
    ContentModalAtendimento,
    ContentModalAlmocoAbastecimentoEmpresa,
    ContentModalOutros,
    ContentModalRelatorioTecnico,
    FabButtonComponent,
    NavbarComponent,
    PopoverComponent,
    SideMenuComponent,
    TabFooterComponent,
    ModalComponent,
  ],
})
export class ComponentsModule { }
