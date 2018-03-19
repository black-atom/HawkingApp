import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { ComponentsModule } from '../../components';

import { AtividadesPage } from './atividades';
import { Atividade } from './components/atividade/atividade.component';
import { ModalAtividadesComponent } from './components/modal-atividades/modal-atividades.component';

@NgModule({
  declarations: [
    Atividade,
    AtividadesPage,
    ModalAtividadesComponent,
  ],
  imports: [
    ComponentsModule,
    IonicPageModule.forChild(AtividadesPage)
  ],
  entryComponents: [
    AtividadesPage,
    Atividade,
    ModalAtividadesComponent,
  ]
})

export class AtividadesModule{}
