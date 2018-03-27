import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { AtividadeDetailModule } from './atividade-detail/atividade-detail.module';

import { SideMenuComponent } from './sidemenu/sidemenu.component';
import { PopoverComponent } from './popover/popover.component';
import { TimeLine } from './time-line/time-line';
import { ToolBarActions } from './tool-bar-actions/tool-bar-actions';
import { NavbarComponent } from './navbar/navbar.component';

import {
  ContentModalAtendimento,
} from './modal/content-modal/content-modal-atendimento/content-modal-atendimento';


import {
  ContentModalRelatorioTecnico,
} from './modal/content-modal/content-modal-relatorio-tecnico/content-modal-relatorio-tecnico';

import {
  ContentModalOutros,
} from './modal/content-modal/content-modal-outros/content-modal-outros';

import {
  ContentModalAlmoco,
} from './modal/content-modal/content-modal-almoco/content-modal-almoco';
import { FormModalComponent } from './modal/form-modal/form-modal.component';
import { ModalComponent } from './modal/modal';

@NgModule({
  imports:[
    AtividadeDetailModule,
    IonicPageModule,
  ],
  declarations: [
    ContentModalAtendimento,
    ContentModalAlmoco,
    ContentModalOutros,
    ContentModalRelatorioTecnico,
    NavbarComponent,
    PopoverComponent,
    SideMenuComponent,
    TimeLine,
    ToolBarActions,
    ModalComponent,
    FormModalComponent,
  ],
  entryComponents: [
    NavbarComponent,
    PopoverComponent,
    ModalComponent,
    FormModalComponent,
    ContentModalAtendimento,
    ContentModalAlmoco,
    ContentModalOutros,
    ContentModalRelatorioTecnico,
    TimeLine,
    ToolBarActions,
  ],
  exports: [
    AtividadeDetailModule,
    ContentModalAtendimento,
    ContentModalAlmoco,
    ContentModalOutros,
    ContentModalRelatorioTecnico,
    NavbarComponent,
    PopoverComponent,
    SideMenuComponent,
    TimeLine,
    ToolBarActions,
    ModalComponent,
    FormModalComponent,
  ],
})
export class ComponentsModule { }
