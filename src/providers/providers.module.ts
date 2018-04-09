import { AtendimentoProvider } from './atentimento.provider';
import { ApikeyReqInject } from './../utils/ApiKeyRequestInjector';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';

@NgModule({
  imports: [
    HttpClientModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApikeyReqInject,
      multi: true,
    },
    AtendimentoProvider,
  ],
})
export class ProvidersModule {}
