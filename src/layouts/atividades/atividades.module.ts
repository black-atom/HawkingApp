import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { ComponentsModule } from '../../components';

import { AtividadesPage } from './atividades';
import { Atividade } from './components/atividade/atividade.component';
import { AtividadesExecucaoComponent } from './components/segments/atividades-execucao/atividades-execucao.component';
import { AtividadesPendentesComponent } from './components/segments/atividades-pendentes/atividades-pendentes.component';
import { PopoverComponent } from './components/popover/popover.component';

@NgModule({
  declarations: [
    Atividade,
    AtividadesPage,
    PopoverComponent,
    PopoverComponent,
  ],
  imports: [
    ComponentsModule,
    IonicPageModule.forChild(AtividadesPage)
  ],
  entryComponents: [
    AtividadesPage,
    Atividade,
    PopoverComponent,
  ]
})

export class AtividadesModule{}
