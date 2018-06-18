import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { AtividadesModule } from './atividades/atividades.module';
import { ConcluidosModule } from './concluidos/concluidos.module';
import { ComponentsModule } from './../components';
import { ReembolsosModule } from './reembolsos/reembolsos.module';
import { PerfilModule } from './perfil/perfil.module';
import { LoginModule } from './login/login.module';
import { SuporteModule } from './suporte/suporte.module';
import { TabPageModule } from './tab-page/tab-page.module';
import { ClientDataPageModule } from './client-data/client-data-page.module';
import { RelatorioModule } from './relatorio/relatorio.module';

@NgModule({
  imports:[
    AtividadesModule,
    ConcluidosModule,
    ComponentsModule,
    ReembolsosModule,
    PerfilModule,
    LoginModule,
    SuporteModule,
    TabPageModule,
    ClientDataPageModule,
    ReactiveFormsModule,
    RelatorioModule,
  ],
})

export class PagesModule{}

