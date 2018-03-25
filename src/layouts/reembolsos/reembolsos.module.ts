import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { ReembolsosPage } from './reembolsos';
import { ComponentsModule } from '../../components';

@NgModule({
  declarations: [
    ReembolsosPage,
  ],
  imports: [
    ComponentsModule,
    IonicPageModule.forChild(ReembolsosPage),
  ],
  entryComponents: [
    ReembolsosPage,
  ],
})

export class ReembolsosModule{}
