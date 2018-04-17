import { selectAtividadesToSync, SyncAtividade } from './../../redux/reducers/atividade.reduce';
import {
  selectAtendimentosToSync,
  SyncAtendimentos,
} from './../../redux/reducers/atendimento.reducer';
import { Foto } from './../../models/foto';
import { selectFotosToUpload, UploadFoto } from './../../redux/reducers/foto.reducer';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Rx';
import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import { AtividadesPage } from '../atividades/atividades';
import { ConcluidosPage } from '../concluidos/concluidos';
import { PerfilPage } from './../perfil/perfil';
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
  tab3Root = PerfilPage;
  tab4Root = SuportePage;

  constructor(
    private store: Store<State>,
  ) {
    // Observable.interval(30000)
    //   .mergeMap(() => this.store.select(selectFotosToUpload).take(1))
    //   .mergeMap(fotos => fotos)
    //   .do((foto:Foto) => this.store.dispatch(new UploadFoto(foto)))
    //   .subscribe();

    // Observable.interval(30000)
    //   .mergeMap(() => this.store.select(selectAtendimentosToSync).take(1))
    //   .filter(atendimentos => atendimentos.length > 0)
    //   .do(atendimentos => this.store.dispatch(new SyncAtendimentos(atendimentos)))
    //   .subscribe();

    // Observable.interval(10000)
    //   .mergeMap(() => this.store.select(selectAtividadesToSync).take(1))
    //   .mergeMap(atividades => atividades)
    //   .do(atividade => this.store.dispatch(new SyncAtividade(atividade)))
    //   .subscribe();
  }
}
