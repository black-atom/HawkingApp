import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { AtividadeDetail } from './atividade-detail.component';
import { AtendimentoComponet } from './components/atendimento/atendimento.component';
import { AtividadeComponet } from './components/atividade/atividade';

@NgModule({
  declarations: [
    AtividadeDetail,
    AtendimentoComponet,
    AtividadeComponet,
  ],
  imports: [
    IonicPageModule.forChild(AtividadeDetail),
  ],
  entryComponents: [
    AtividadeDetail,
    AtividadeComponet,
    AtendimentoComponet,
  ],
})

export class AtividadeDetailModule{}
