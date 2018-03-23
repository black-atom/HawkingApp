import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { ComponentsModule } from '../../components';

import { AtividadesPage } from './atividades';
import { Atividade } from './components/atividade/atividade.component';

@NgModule({
  declarations: [
    Atividade,
    AtividadesPage,
  ],
  imports: [
    ComponentsModule,
    IonicPageModule.forChild(AtividadesPage),
  ],
  entryComponents: [
    AtividadesPage,
    Atividade,
  ]
})

export class AtividadesModule{}
