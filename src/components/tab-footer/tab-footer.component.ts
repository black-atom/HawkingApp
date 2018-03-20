import { Component } from '@angular/core';

import { AtividadesPage } from '../../layouts/atividades/atividades';
import { ConcluidosPage } from '../../layouts/concluidos/concluidos';
import { LoginPage } from '../../layouts/login/login';
import { SuportePage } from './../../layouts/suporte/suporte';


@Component({
  selector: 'tab-footer',
  templateUrl: 'tab-footer.html'
})
export class TabFooterComponent {

  tab1Root = AtividadesPage;
  tab2Root = ConcluidosPage;
  tab3Root = LoginPage;
  tab4Root = SuportePage;

  constructor() { }
}
