import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { AtividadeDetailModule } from './atividade-detail/atividade-detail.module';

import { SideMenuComponent } from './sidemenu/sidemenu.component';
import { PopoverComponent } from './popover/popover.component';
import { TimeLine } from './time-line/time-line';
import { ToolBarActions } from './tool-bar-actions/tool-bar-actions';
import { NavbarComponent } from './navbar/navbar.component';
import { ModalMonitoramento } from './modal-monitoramento/modal-monitoramento';
import { FormModalComponent } from './form-modal/form-modal.component';



@NgModule({
  imports:[
    AtividadeDetailModule,
    IonicPageModule,
  ],
  declarations: [
    ModalMonitoramento,
    FormModalComponent,
    NavbarComponent,
    PopoverComponent,
    SideMenuComponent,
    TimeLine,
    ToolBarActions,
  ],
  entryComponents: [
    ModalMonitoramento,
    FormModalComponent,
    NavbarComponent,
    PopoverComponent,
    TimeLine,
    ToolBarActions,
  ],
  exports: [
    AtividadeDetailModule,
    ModalMonitoramento,
    FormModalComponent,
    NavbarComponent,
    PopoverComponent,
    SideMenuComponent,
    TimeLine,
    ToolBarActions,
  ],
})
export class ComponentsModule { }
