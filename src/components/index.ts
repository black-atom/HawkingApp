import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { AtividadeDetailModule } from './atividade-detail/atividade-detail.module';

import { NavbarComponent } from './navbar/navbar.component';
import { SideMenuComponent } from './sidemenu/sidemenu.component';
import { TabFooterComponent } from './tab-footer/tab-footer.component';
import { FabButtonComponent } from './fab-button/fab-button.component';
import { PopoverComponent } from './popover/popover.component';
import { ModalComponent } from './modal/modal.component';

@NgModule({
  imports:[
    AtividadeDetailModule,
    IonicPageModule,
  ],
  declarations: [
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
  ],
  exports: [
    AtividadeDetailModule,
    FabButtonComponent,
    NavbarComponent,
    PopoverComponent,
    SideMenuComponent,
    TabFooterComponent,
    ModalComponent,
  ],
})
export class ComponentsModule { }
