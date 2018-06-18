import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { SignaturePadModule } from 'angular2-signaturepad';
import { ComponentsModule } from '../../components';
import { Camera } from '@ionic-native/camera';

import { AtividadesPage } from './atividades';
import { Atividade } from './components/atividade/atividade.component';
import { FotoModule } from './components/foto/foto.module';
import { GrupoAtividadesComponent } from './components/grupo-atividades/grupo-atividades';

@NgModule({
  declarations: [
    Atividade,
    AtividadesPage,
    GrupoAtividadesComponent,
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
    GrupoAtividadesComponent,
  ],
  providers: [
    Camera,
  ],
})

export class AtividadesModule{}
