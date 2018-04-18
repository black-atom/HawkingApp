import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { SignaturePadModule } from 'angular2-signaturepad';

import { ClientDataPage } from './client-data-page';
import { AvalicaoComponent } from './avaliacao/avaliacao.component';
import { PreviewComponent } from './preview/preview.component';
import { AssinaturaComponent } from './assinatura/assinatura.component';
import { AssinaturaFormComponent } from './assinatura-form/assinatura-form.component';

@NgModule({
  declarations: [
    ClientDataPage,
    PreviewComponent,
    AssinaturaComponent,
    AssinaturaFormComponent,
    AvalicaoComponent,
  ],
  imports: [
    SignaturePadModule,
    IonicPageModule.forChild(ClientDataPage),
  ],
  entryComponents: [
    ClientDataPage,
    PreviewComponent,
    AssinaturaComponent,
    AssinaturaFormComponent,
    AvalicaoComponent,
  ],
})

export class ClientDataPageModule { }
