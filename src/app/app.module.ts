import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { HttpModule, Http } from '@angular/http';

import { AuthHttp, AuthConfig } from 'angular2-jwt';
import { Storage } from '@ionic/storage';

import { LayoutModule } from './../layouts/index';
import { ComponentsModule } from './../components';
import { ReduxModule } from './../redux/redux.module';

import { MyApp } from './app.component';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AtendimentoProvider, LoginProvider, MonitoramentoProvider } from '../providers';


let storage = new Storage({});

export function getAuthHttp(http) {
  return new AuthHttp(new AuthConfig({
    noJwtError: true,
    globalHeaders: [{'Accept': 'application/json'}],
    tokenGetter: (() => storage.get('token')),
  }), http);
}


@NgModule({
  declarations: [
    MyApp,
  ],
  imports: [
    BrowserModule,
    LayoutModule,
    ComponentsModule,
    HttpModule,
    ReduxModule,
    IonicModule.forRoot(MyApp, { tabsHideOnSubPages: 'true' }),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
  ],
  providers: [
    AtendimentoProvider,
    LoginProvider,
    MonitoramentoProvider,
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    {
      provide: AuthHttp,
      useFactory: getAuthHttp,
      deps: [Http]
    },
  ]
})
export class AppModule {}
