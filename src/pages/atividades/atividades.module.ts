import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { SignaturePadModule } from 'angular2-signaturepad';
import { ComponentsModule } from '../../components';
import { Camera } from '@ionic-native/camera';

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
import { FotoModule } from './components/foto/foto.module';
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
    FotoModule,
    SignaturePadModule,
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
  providers: [
    Camera,
  ],
})

export class AtividadesModule{}
