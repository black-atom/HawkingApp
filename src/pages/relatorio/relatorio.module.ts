
import { FormTreinamentoComponent } from './components/form-treinamento/form-treinamento';
import { NgModule } from '@angular/core';
import { IonicPageModule, IonicModule } from 'ionic-angular';
import { RelatorioPage } from './relatorio';

import { CategoriasPageModule } from './components/categorias/categorias.module';
import {
  EquipamentosSelecionadoPageModule,
} from './components/equipamentos-selecionado/equipamentos-selecionado.module';
import {
  EquipamentoSelecionadoPageModule,
} from './components/equipamento-selecionado/equipamento-selecionado.module';

import {
  FormEquipamentosRetiradosComponent,
} from './components/form-equipamentos-retirados/form-equipamentos-retirados';


import { FormFaturamentoComponent } from './components/form-faturamento/form-faturamento';
import { FormResumoComponent } from './components/form-resumo/form-resumo';

@NgModule({
  imports:[
    IonicModule,
    CategoriasPageModule,
    EquipamentosSelecionadoPageModule,
    EquipamentoSelecionadoPageModule,
    IonicPageModule.forChild(RelatorioPage),
  ],
  declarations: [
    RelatorioPage,
    FormTreinamentoComponent,
    FormEquipamentosRetiradosComponent,
    FormFaturamentoComponent,
    FormResumoComponent,
  ],
  entryComponents: [
    FormTreinamentoComponent,
    FormEquipamentosRetiradosComponent,
    FormFaturamentoComponent,
    RelatorioPage,
  ],
})
export class RelatorioModule {

}
