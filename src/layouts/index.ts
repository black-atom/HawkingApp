import { NgModule } from '@angular/core';

import { AtividadesModule } from './atividades/atividades.module';
import { ConcluidosModule } from './concluidos/concluidos.module';
import { ComponentsModule } from './../components';
import { ReembolsosModule } from './reembolsos/reembolsos.module';
import { PerfilModule } from './perfil/perfil.module';
import { LoginModule } from './login/login.module';
import { SuporteModule } from './suporte/suporte.module';

@NgModule({
  imports:[
    AtividadesModule,
    ConcluidosModule,
    ComponentsModule,
    ReembolsosModule,
    PerfilModule,
    LoginModule,
    SuporteModule,
  ],
})

export class LayoutModule{}

