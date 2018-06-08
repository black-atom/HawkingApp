import { numeroDeAssinaturasToUpload } from './../../redux/reducers/assinatura.reducer';
import { Observable } from 'rxjs/Observable';
import { Component } from '@angular/core';
import { NavController, IonicPage } from 'ionic-angular';
import { Store } from '@ngrx/store';

import { LoginState } from './../../redux/models/loginState';
import { numeroDeFotosParaUploadSelector } from '../../redux/reducers/foto.reducer';
import { State } from '../../redux/reducers';
import { numeroDeAtendimentosToSync } from '../../redux/reducers/atendimento.reducer';

import { selectAtividadesToSync, SyncAtividade, numeroAtividadesToSync } from './../../redux/reducers/atividade.reduce';
import {
  selectAtendimentosToSync,
  SyncAtendimentos,
} from './../../redux/reducers/atendimento.reducer';
import { selectFotosToUpload, UploadFoto } from './../../redux/reducers/foto.reducer';
import {
  selectAssinaturasToUpload,
  UploadAssinatura,
} from '../../redux/reducers/assinatura.reducer';

@Component({
  selector: 'perfil',
  templateUrl: 'perfil.html',
})
@IonicPage({
  name: 'PerfilPage',
})
export class PerfilPage {

  public title: string = 'Perfil';
  public user$;
  public numeroDeFotosParaUpload$: Observable<number>;
  public numeroDeAtendimentosToUpload$: Observable<number>;
  public numeroDeAtividadesToUpload$: Observable<number>;
  public numeroDeAssinaturasToUpload$: Observable<number>;

  constructor(
    public navCtrl: NavController,
    private store: Store<State>,
  ) {
    this.user$ = this.store.select('login');
    this.numeroDeFotosParaUpload$ = this.store.select(numeroDeFotosParaUploadSelector);
    this.numeroDeAtendimentosToUpload$ = this.store.select(numeroDeAtendimentosToSync);
    this.numeroDeAssinaturasToUpload$ = this.store.select(numeroDeAssinaturasToUpload);
    this.numeroDeAtividadesToUpload$ = this.store.select(numeroAtividadesToSync);
  }

  dispatchForceUpload(forceType) {
    const forceTypes = {
      imagens: selectFotosToUpload,
      atendimentos: null,
      atividades: selectAtividadesToSync,
      assinaturas: selectAssinaturasToUpload,
    };

    const dispatchers = {
      imagens: UploadFoto,
      atendimentos: null,
      atividades: SyncAtividade,
      assinaturas: UploadAssinatura,
    };

    const selectForceType = forceTypes[forceType];
    const dispatcher = dispatchers[forceType];
    selectForceType && dispatcher && this.store.select(selectForceType)
      .take(1)
      .mergeMap(dados => dados)
      .do(dados => console.log('forcing sync', dados))
      .do(dado => this.store.dispatch(new dispatcher(dado)))
      .subscribe().unsubscribe();
  }
}
