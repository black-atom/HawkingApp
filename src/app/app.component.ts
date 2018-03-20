import { Component, ViewChild, OnInit, Input } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { AtividadesPage } from '../layouts/atividades/atividades';
import { ConcluidosPage } from '../layouts/concluidos/concluidos';
import { PerfilPage } from '../layouts/perfil/perfil';
import { LoginPage } from '../layouts/login/login';
import { ReembolsosPage } from '../layouts/reembolsos/reembolsos';
import { SuportePage } from '../layouts/suporte/suporte';


@Component({
  templateUrl: 'app.html'
})
export class MyApp implements OnInit {

  @ViewChild(Nav)
  nav: Nav;

  // public rootPage: any = LoginPage;

  constructor(public platform: Platform,
              public statusBar: StatusBar,
              public splashScreen: SplashScreen) {
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.backgroundColorByHexString('#0E91D8');
      this.splashScreen.hide();
    });
  }

  ngOnInit(){
    this.initializeApp();
  }

}
