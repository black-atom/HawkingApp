import { Component, ViewChild, Input } from '@angular/core';
import { Nav } from 'ionic-angular';

import { AtividadesPage } from '../../layouts/atividades/atividades';
import { ConcluidosPage } from '../../layouts/concluidos/concluidos';
import { PerfilPage } from '../../layouts/perfil/perfil';
import { ReembolsosPage } from '../../layouts/reembolsos/reembolsos';
import { SuportePage } from '../../layouts/suporte/suporte';
import { LoginPage } from './../../layouts/login/login';


@Component({
  selector: 'sidemenu',
  templateUrl: 'sidemenu.html'
})
export class SideMenuComponent {

  @Input()
  content

  @ViewChild(Nav)
  nav: Nav;

  public setPageRoot;

  public rootPage: any = AtividadesPage;
  public pages: Array<{title: string, component: any, icon: string}>;

  constructor() {
    this.pages = [
      { title: 'Login', component: LoginPage, icon: 'md-checkbox' },
      { title: 'Serviços', component: AtividadesPage, icon: 'md-checkbox' },
      { title: 'Serviços Concluídos', component: ConcluidosPage, icon: 'md-checkbox' },
      { title: 'Perfil', component: PerfilPage, icon: 'md-contact' },
      { title: 'Reembolsos', component: ReembolsosPage, icon: 'logo-usd' },
      { title: 'Suporte', component: SuportePage, icon: 'md-help-circle' }
    ];
  }

  openPage() {
    console.log(this.setPageRoot);
    this.nav.setRoot(this.setPageRoot.component);
  }
}
