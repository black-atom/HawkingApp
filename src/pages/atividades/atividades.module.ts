import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { ComponentsModule } from '../../components';

import { AtividadesPage } from './atividades';
import { Atividade } from './components/atividade/atividade.component';
import { GrupoAtividadesComponent } from './components/grupo-atividades/grupo-atividades';
import {
  RelatorioInteracaoPage,
} from './components/relatorio-interacao/relatorio-interacao.component';

@NgModule({
  declarations: [
    Atividade,
    AtividadesPage,
    GrupoAtividadesComponent,
    RelatorioInteracaoPage,
  ],
  imports: [
    ComponentsModule,
    IonicPageModule.forChild(AtividadesPage),
  ],
  entryComponents: [
    Atividade,
    AtividadesPage,
    GrupoAtividadesComponent,
    RelatorioInteracaoPage,
  ],
})

export class AtividadesModule{}
