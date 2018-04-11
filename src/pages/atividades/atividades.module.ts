import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { ComponentsModule } from '../../components';

import { AtividadesPage } from './atividades';
import { Atividade } from './components/atividade/atividade.component';
import {
  EquipamentoComponent,
} from './components/relatorio-interacao/remocao-equipamento/equipamento/equipamento';
import {
  EquipamentoFaturamentoComponent,
// tslint:disable-next-line:max-line-length
} from './components/relatorio-interacao/faturamento/equipamento-faturamento/equipamento-faturamento';
import {
  FaturamentoComponent,
} from './components/relatorio-interacao/faturamento/faturamento.component';
import { GrupoAtividadesComponent } from './components/grupo-atividades/grupo-atividades';
import {
  HouveTreinamentoComponent,
} from './components/relatorio-interacao/houve-treinamento/houve-treinamento.component';
import {
  RelatorioInteracaoPage,
} from './components/relatorio-interacao/relatorio-interacao.component';
import {
  RetornoLocalComponent,
} from './components/relatorio-interacao/retorno-local/retorno-local.component';
import {
  RemocaoEquipamentoComponent,
} from './components/relatorio-interacao/remocao-equipamento/remocao-equipamento';

@NgModule({
  declarations: [
    Atividade,
    AtividadesPage,
    EquipamentoComponent,
    EquipamentoFaturamentoComponent,
    FaturamentoComponent,
    GrupoAtividadesComponent,
    HouveTreinamentoComponent,
    RemocaoEquipamentoComponent,
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
    EquipamentoComponent,
    EquipamentoFaturamentoComponent,
    FaturamentoComponent,
    GrupoAtividadesComponent,
    HouveTreinamentoComponent,
    RelatorioInteracaoPage,
    RemocaoEquipamentoComponent,
    RetornoLocalComponent,
  ],
})

export class AtividadesModule{}
