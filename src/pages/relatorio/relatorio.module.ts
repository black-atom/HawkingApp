import { FormTreinamentoComponent } from './components/form-treinamento/form-treinamento';
import { NgModule } from '@angular/core';
import { IonicPageModule, IonicModule } from 'ionic-angular';
import { RelatorioPage } from './relatorio';
import {
  FormEquipamentosRetiradosComponent,
} from './components/form-equipamentos-retirados/form-equipamentos-retirados';
import {
  EquipamentoComponent,
} from './components/form-equipamentos-retirados/equipamento/equipamento';
import {
  EquipamentoFaturamentoComponent,
} from './components/form-faturamento/equipamento-faturamento/equipamento-faturamento';
import { FormFaturamentoComponent } from './components/form-faturamento/form-faturamento';
import { FormResumoComponent } from './components/form-resumo/form-resumo';

@NgModule({
  imports:[
    IonicModule,
    IonicPageModule.forChild(RelatorioPage),
  ],
  declarations: [
    RelatorioPage,
    FormTreinamentoComponent,
    FormEquipamentosRetiradosComponent,
    EquipamentoComponent,
    EquipamentoFaturamentoComponent,
    FormFaturamentoComponent,
    FormResumoComponent,
  ],
})
export class RelatorioModule {

}
