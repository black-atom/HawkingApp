import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { AtividadeDetailModule } from './atividade-detail/atividade-detail.module';

import { SideMenuComponent } from './sidemenu/sidemenu.component';
import { TimeLine } from './time-line/time-line';
import { ToolBarActions } from './tool-bar-actions/tool-bar-actions';
import { NavbarComponent } from './navbar/navbar.component';
import { PopoverComponent } from './popover/popover.component';


@NgModule({
  imports:[
    AtividadeDetailModule,
    IonicPageModule,
  ],
  declarations: [
    NavbarComponent,
    SideMenuComponent,
    PopoverComponent,
    TimeLine,
    ToolBarActions,
  ],
  entryComponents: [
    NavbarComponent,
    PopoverComponent,
    TimeLine,
    ToolBarActions,
  ],
  exports: [
    AtividadeDetailModule,
    NavbarComponent,
    SideMenuComponent,
    PopoverComponent,
    TimeLine,
    ToolBarActions,
  ],
})

export class ComponentsModule {}
