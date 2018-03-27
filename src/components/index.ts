import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { AtividadeDetailModule } from './atividade-detail/atividade-detail.module';

import { SideMenuComponent } from './sidemenu/sidemenu.component';
import { FabButtonComponent } from './fab-button/fab-button.component';
import { PopoverComponent } from './popover/popover.component';
import { ModalComponent } from './modal/modal.component';
import { ModalFormComponent } from './modal-form/modal-form.component';
import { TimeLine } from './time-line/time-line';
import { ToolBarActions } from './tool-bar-actions/tool-bar-actions';
import { NavbarComponent } from './navbar/navbar.component';

import {
  ContentModalAtendimento,
} from './modal/content-modal/content-modal-atendimento/content-modal-atendimento';

import {
  ContentModalAlmocoAbastecimentoEmpresa,
} from './modal/content-modal/content-modal-almoco-abastecimento-empresa/content-modal-almoco-abastecimento-empresa';

import {
  ContentModalRelatorioTecnico,
} from './modal/content-modal/content-modal-relatorio-tecnico/content-modal-relatorio-tecnico';

import {
  ContentModalOutros,
} from './modal/content-modal/content-modal-outros/content-modal-outros';

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
    NavbarComponent,
    PopoverComponent,
    SideMenuComponent,
    TimeLine,
    ToolBarActions,
    ModalComponent,
    ModalFormComponent,
  ],
  entryComponents: [
    NavbarComponent,
    PopoverComponent,
    ModalComponent,
    ModalFormComponent,
    ContentModalAtendimento,
    ContentModalAlmocoAbastecimentoEmpresa,
    ContentModalOutros,
    ContentModalRelatorioTecnico,
    TimeLine,
    ToolBarActions,
  ],
  exports: [
    AtividadeDetailModule,
    ContentModalAtendimento,
    ContentModalAlmocoAbastecimentoEmpresa,
    ContentModalOutros,
    ContentModalRelatorioTecnico,
    NavbarComponent,
    PopoverComponent,
    SideMenuComponent,
    TimeLine,
    ToolBarActions,
    ModalComponent,
    ModalFormComponent,
  ],
})
export class ComponentsModule { }
