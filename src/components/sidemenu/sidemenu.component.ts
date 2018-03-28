import { Component, ViewChild } from '@angular/core';
import { Nav } from 'ionic-angular';

import { AtividadesPage } from './../../pages/atividades/atividades';
import { ConcluidosPage } from '../../pages/concluidos/concluidos';
import { PerfilPage } from '../../pages/perfil/perfil';
import { ReembolsosPage } from '../../pages/reembolsos/reembolsos';
import { SuportePage } from '../../pages/suporte/suporte';
import { LoginPage } from './../../pages/login/login';


@Component({
  selector: 'sidemenu',
  templateUrl: 'sidemenu.html',
})
export class SideMenuComponent {

  @ViewChild(Nav)
  nav: Nav;

  public rootPage: any = AtividadesPage;
  public pages: Array<{ title: string, component: any, icon: string }>;

  constructor() {
    this.pages = [
      { title: 'Login', component: LoginPage, icon: 'md-checkbox' },
      { title: 'Serviços', component: AtividadesPage, icon: 'md-checkbox' },
      { title: 'Serviços Concluídos', component: ConcluidosPage, icon: 'md-checkbox' },
      { title: 'Perfil', component: PerfilPage, icon: 'md-contact' },
      { title: 'Reembolsos', component: ReembolsosPage, icon: 'logo-usd' },
      { title: 'Suporte', component: SuportePage, icon: 'md-help-circle' },
    ];
  }

  openPage(pageSelecionada) {
    const route = this.pages.find(page => page.component === pageSelecionada);
    this.nav.setRoot(route.component);
  }
}
