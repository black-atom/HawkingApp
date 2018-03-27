import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { AuthHttp } from 'angular2-jwt';

import { Store } from '@ngrx/store';

import API_URL from '../app/api';
import { Atendimento, Assinatura } from '../models';
import { State } from '../redux/reducers';
import { HttpClient } from '@angular/common/http';




@Injectable()
export class AtendimentoProvider {

  private url = `${API_URL}/api/atendimentos`;

  constructor(public http: HttpClient, private store: Store<State>) { }

  getAllAtendimentosToday() {
    return this.store.select(appState => appState.login.nome)
    .take(1)
    .switchMap((nomeFuncionario) => {
      const date = new Date();
      const today = new Date(date.getFullYear(), date.getMonth(), date.getDate()).toString();

      const query = {
        estado: 'associado',
        data_atendimento: today,
        'tecnico.nome': nomeFuncionario,
      };
      return this.http.get<[Atendimento]>(this.url, { params: { ...query } })
      .catch(this.lidaComErro);
    });
  }

  lidaComErro(erro: Response | any) {
    let mensagemErro: string;
    if (erro instanceof Response) {
      mensagemErro = `Ocorreu o erro ${erro.status}`;
    } else {
      mensagemErro = erro.toString();
    }
    console.log(mensagemErro);
    return Observable.throw(mensagemErro);
  }

}
