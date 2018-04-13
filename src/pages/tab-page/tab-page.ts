import { Foto } from './../../models/foto';
import { selectFotosToUpload, UploadFoto, getAllFotos } from './../../redux/reducers/foto.reducer';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Rx';
import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import { AtividadesPage } from '../atividades/atividades';
import { ConcluidosPage } from '../concluidos/concluidos';
import { LoginPage } from '../login/login';
import { SuportePage } from '../suporte/suporte';
import { State } from '../../redux/reducers';


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

  constructor(
    private store: Store<State>,
  ) {
    Observable.interval(10000)
      .mergeMap(() => this.store.select(selectFotosToUpload).take(1))
      .mergeMap(fotos => fotos)
      .do((foto:Foto) => this.store.dispatch(new UploadFoto(foto)))
      .subscribe();
  }
}
