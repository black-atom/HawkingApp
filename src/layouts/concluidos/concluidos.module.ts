import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { ConcluidosPage } from './concluidos';
import { ComponentsModule } from '../../components';

@NgModule({
  declarations: [
    ConcluidosPage,
  ],
  imports: [
    ComponentsModule,
    IonicPageModule.forChild(ConcluidosPage),
  ],
  entryComponents: [
    ConcluidosPage,
  ],
})

export class ConcluidosModule{}
