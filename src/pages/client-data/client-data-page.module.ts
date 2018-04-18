import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { SignaturePadModule } from 'angular2-signaturepad';

import { AvalicaoComponent } from './avaliacao/avaliacao.component';
import { AssinaturaFormComponent } from './assinatura-form/assinatura-form.component';
import { AssinaturaComponent } from './assinatura/assinatura.component';
import { ClientDataPage } from './client-data-page';
import { PreviewComponent } from './preview/preview.component';
import { ReactiveFormsModule } from '@angular/forms';

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
    ReactiveFormsModule,
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
