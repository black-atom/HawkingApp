import { MonitoramentoProvider } from './monitoramento.provider';
import { FotoProvider } from './foto.provider';
import { File } from '@ionic-native/file';

import { AtendimentoProvider } from './atentimento.provider';
import { ApikeyReqInject } from './../utils/ApiKeyRequestInjector';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BackgroundGeolocation } from '@ionic-native/background-geolocation';
import { LocationProvider } from './geoLocation';

@NgModule({
  imports: [
    HttpClientModule,
  ],
  providers: [
    File,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApikeyReqInject,
      multi: true,
    },
    AtendimentoProvider,
    FotoProvider,
    MonitoramentoProvider,
    BackgroundGeolocation,
    LocationProvider,
  ],
})
export class ProvidersModule {}
