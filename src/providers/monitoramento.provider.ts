import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';


import API_URL from '../app/api';
import { HttpClient } from '@angular/common/http';
import { AtividadeI } from '../models';
import { State } from '../redux/reducers';
import { Store } from '../../node_modules/@ngrx/store';


interface AtividadeResponse {
  atividades: [AtividadeI];
  count: number;
}

@Injectable()
export class MonitoramentoProvider {

  private url = `${API_URL}/api/monitoramentos`;

  constructor(public http: HttpClient, private store: Store<State>) { }

  saveAtividade(atividade: AtividadeI): Observable<any> {
    return this.http.post<AtividadeI>(this.url, atividade)
      .catch(this.lidaComErro);
  }

  getAtividades() {
    return this.store.select(appState => appState.login._id)
      .take(1)
      .switchMap((tecnicoID) => {
        const date = new Date();
        const today = new Date(date.getFullYear(), date.getMonth(), date.getDate()).toString();

        const query = {
          createdAt: today,
          funcionario_id: tecnicoID,
        };

        return this.http
          .get<AtividadeResponse>(this.url, { params: { ...query } })
          .map(response => response.atividades)
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
    return Observable.throw(mensagemErro);
  }

}
