import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { AtividadeDetail } from './atividade-detail.component';
import { Detail } from './components/detail.component';

@NgModule({
  declarations: [
    AtividadeDetail,
    Detail,
  ],
  imports: [
    IonicPageModule.forChild(AtividadeDetail),
  ],
  entryComponents: [
    AtividadeDetail,
    Detail,
  ],
})

export class AtividadeDetailModule{}
