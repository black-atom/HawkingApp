import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { AtividadeDetailModule } from './atividade-detail/atividade-detail.module';

import { NavbarComponent } from './navbar/navbar.component';
import { SideMenuComponent } from './sidemenu/sidemenu.component';
import { TabFooterComponent } from './tab-footer/tab-footer.component';
import { FabButtonComponent } from './fab-button/fab-button.component';

@NgModule({
  imports:[
    IonicPageModule,
    AtividadeDetailModule,
  ],
  declarations: [
    NavbarComponent,
    SideMenuComponent,
    FabButtonComponent,
    TabFooterComponent,
  ],
  entryComponents: [
    NavbarComponent,
  ],
  exports: [
    NavbarComponent,
    SideMenuComponent,
    TabFooterComponent,
    FabButtonComponent,
    AtividadeDetailModule,
  ]
})
export class ComponentsModule { }
