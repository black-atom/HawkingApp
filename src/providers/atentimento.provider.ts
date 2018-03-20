import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { AuthHttp } from 'angular2-jwt';

import { Store } from '@ngrx/store';

import { Atendimento, Assinatura } from '../models';
import { State } from '../redux/reducers';




@Injectable()
export class AtendimentoProvider {

  private url = 'http://165.227.78.113:3000/api/atendimentos';

  constructor(public http: AuthHttp, private store: Store<State>) { }

  getAllAtendimentosToday(): Observable<any> {
    return this.store.select(appState => appState.login.nome)
    .take(1)
    .switchMap(nomeFuncionario => {
      const date = new Date();
      const today = new Date(date.getFullYear(), date.getMonth(), date.getDate()).toString();

      const query = {
        estado: 'associado',
        data_atendimento: today,
        'tecnico.nome': nomeFuncionario,
      }
      return this.http.get(this.url, { params: { ...query } })
      .map(res => res.json() as Atendimento[])
      .catch(this.lidaComErro)
    })
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
