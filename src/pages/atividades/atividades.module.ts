import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { ComponentsModule } from '../../components';

import { AtividadesPage } from './atividades';
import { Atividade } from './components/atividade/atividade.component';
import { GrupoAtividadesComponent } from './components/grupo-atividades/grupo-atividades';
import {
  RelatorioInteracaoPage,
} from './components/relatorio-interacao/relatorio-interacao.component';

import {
  RetornoLocalComponent,
} from './components/relatorio-interacao/retorno-local/retorno-local.component';
import {
  HouveTreinamentoComponent,
} from './components/relatorio-interacao/houve-treinamento/houve-treinamento.component';
import {
  FaturamentoComponent,
} from './components/relatorio-interacao/faturamento/faturamento.component';
import {
  EquipamentoComponent,
} from './components/relatorio-interacao/equipamento/equipamento';
import {
  RemocaoEquipamentoComponent,
} from './components/relatorio-interacao/remocao-equipamento/remocao-equipamento';

@NgModule({
  declarations: [
    Atividade,
    AtividadesPage,
    FaturamentoComponent,
    GrupoAtividadesComponent,
    HouveTreinamentoComponent,
    RemocaoEquipamentoComponent,
    EquipamentoComponent,
    RelatorioInteracaoPage,
    RetornoLocalComponent,
  ],
  imports: [
    ComponentsModule,
    IonicPageModule.forChild(AtividadesPage),
  ],
  entryComponents: [
    Atividade,
    AtividadesPage,
    FaturamentoComponent,
    GrupoAtividadesComponent,
    HouveTreinamentoComponent,
    RelatorioInteracaoPage,
    RemocaoEquipamentoComponent,
    EquipamentoComponent,
    RetornoLocalComponent,
  ],
})

export class AtividadesModule{}
