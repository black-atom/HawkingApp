import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { AtividadeDetailModule } from './atividade-detail/atividade-detail.module';

import { SideMenuComponent } from './sidemenu/sidemenu.component';
import { PopoverComponent } from './popover/popover.component';
import { TimeLine } from './time-line/time-line';
import { ToolBarActions } from './tool-bar-actions/tool-bar-actions';
import { NavbarComponent } from './navbar/navbar.component';

import {
  ContentModalMonitoramento,
} from './modal/content-modal-monitoramento/content-modal-monitoramento';


import { FormModalComponent } from './modal/form-modal/form-modal.component';
import { ModalComponent } from './modal/modal';


@NgModule({
  imports:[
    AtividadeDetailModule,
    IonicPageModule,
  ],
  declarations: [
    ContentModalMonitoramento,
    FormModalComponent,
    ModalComponent,
    NavbarComponent,
    PopoverComponent,
    SideMenuComponent,
    TimeLine,
    ToolBarActions,
  ],
  entryComponents: [
    ContentModalMonitoramento,
    FormModalComponent,
    ModalComponent,
    NavbarComponent,
    PopoverComponent,
    TimeLine,
    ToolBarActions,
  ],
  exports: [
    AtividadeDetailModule,
    ContentModalMonitoramento,
    FormModalComponent,
    ModalComponent,
    NavbarComponent,
    PopoverComponent,
    SideMenuComponent,
    TimeLine,
    ToolBarActions,
  ],
})
export class ComponentsModule { }
