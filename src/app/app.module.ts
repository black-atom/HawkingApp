import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule, LOCALE_ID } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { HttpModule, Http } from '@angular/http';

import { AuthHttp, AuthConfig } from 'angular2-jwt';
import { Storage } from '@ionic/storage';

import { PagesModule } from './../pages/pages.module';
import { ComponentsModule } from './../components';
import { ReduxModule } from './../redux/redux.module';

import { MyApp } from './app.component';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ScreenOrientation } from '@ionic-native/screen-orientation';

import { LoginProvider } from '../providers';

import { ProvidersModule } from '../providers/providers.module';
import { LaunchNavigator } from '@ionic-native/launch-navigator';


const storage = new Storage({});

export function getAuthHttp(http) {
  return new AuthHttp(new AuthConfig({
    noJwtError: true,
    globalHeaders: [{ Accept: 'application/json' }],
    tokenGetter: (() => storage.get('token')),
  }),                 http);
}


@NgModule({
  declarations: [
    MyApp,
  ],
  imports: [
    BrowserModule,
    PagesModule,
    ComponentsModule,
    HttpModule,
    ReduxModule,
    IonicModule.forRoot(MyApp, { tabsHideOnSubPages: 'true' }),
    ProvidersModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
  ],
  providers: [
    LoginProvider,
    StatusBar,
    SplashScreen,
    ScreenOrientation,
    LaunchNavigator,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    {
      provide: AuthHttp,
      useFactory: getAuthHttp,
      deps: [Http],
    },
    {
      provide:
      LOCALE_ID,
      useValue: 'pt-BR',
    },
  ],
})
export class AppModule {}
