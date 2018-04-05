import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { ComponentsModule } from '../../components';

import { AtividadesPage } from './atividades';
import { Atividade } from './components/atividade/atividade.component';
import { GrupoAtividadesComponent } from './components/grupo-atividades/grupo-atividades';

@NgModule({
  declarations: [
    Atividade,
    AtividadesPage,
    GrupoAtividadesComponent,
  ],
  imports: [
    ComponentsModule,
    IonicPageModule.forChild(AtividadesPage),
  ],
  entryComponents: [
    Atividade,
    AtividadesPage,
    GrupoAtividadesComponent,
  ],
})

export class AtividadesModule{}
