import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import { AtividadesPage } from '../atividades/atividades';
import { ConcluidosPage } from '../concluidos/concluidos';
import { LoginPage } from '../login/login';
import { SuportePage } from '../suporte/suporte';


@Component({
  selector: 'tab-page',
  templateUrl: 'tab-page.html',
})
@IonicPage({
  name: 'TabPage',
})
export class TabPage {

  tab1Root = AtividadesPage;
  tab2Root = ConcluidosPage;
  tab3Root = LoginPage;
  tab4Root = SuportePage;

  constructor() { }
}
