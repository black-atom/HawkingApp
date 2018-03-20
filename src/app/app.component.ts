import { Component, ViewChild, OnInit } from '@angular/core';
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
  @ViewChild(Nav) nav: Nav;

  rootPage: any = LoginPage;

  pages: Array<{title: string, component: any, icon: string}>;

  constructor(public platform: Platform,
              public statusBar: StatusBar,
              public splashScreen: SplashScreen) {
    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Login', component: LoginPage, icon: 'md-checkbox' },
      { title: 'Serviços', component: AtividadesPage, icon: 'md-checkbox' },
      { title: 'Serviços Concluídos', component: ConcluidosPage, icon: 'md-checkbox' },
      { title: 'Perfil', component: PerfilPage, icon: 'md-contact' },
      { title: 'Reembolsos', component: ReembolsosPage, icon: 'logo-usd' },
      { title: 'Suporte', component: SuportePage, icon: 'md-help-circle' }
    ];
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.backgroundColorByHexString('#0E91D8');
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    console.log(page)
    this.nav.setRoot(page.component);
  }

  ngOnInit(){
    this.initializeApp();
  }

}
