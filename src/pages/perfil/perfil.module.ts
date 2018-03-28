import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { PerfilPage } from './perfil';
import { ComponentsModule } from '../../components';

@NgModule({
  declarations: [
    PerfilPage,
  ],
  imports: [
    ComponentsModule,
    IonicPageModule.forChild(PerfilPage),
  ],
  entryComponents: [
    PerfilPage,
  ],
})

export class PerfilModule{}
