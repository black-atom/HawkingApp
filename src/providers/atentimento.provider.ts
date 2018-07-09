import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

import { Store } from '@ngrx/store';

import API_URL from '../app/api';
import { Atendimento, Assinatura } from '../models';
import { State } from '../redux/reducers';
import { HttpClient } from '@angular/common/http';


interface AtendimentoResponse {
  atendimentos: [Atendimento];
  count: number;
}

@Injectable()
export class AtendimentoProvider {

  private url = `${API_URL}/api/atendimentos`;

  constructor(public http: HttpClient, private store: Store<State>) { }

  getAllAtendimentosToday() {
    return this.store.select(appState => appState.login._id)
      .take(1)
      .switchMap((tecnicoID) => {
        const date = new Date();
        const today = new Date(date.getFullYear(), date.getMonth(), date.getDate()).toString();

        const query = {
          app: 'true',
          estado: 'associado',
          data_atendimento: today,
          ['tecnico._id']: tecnicoID,
        };

        return this.http
          .get<AtendimentoResponse>(this.url, { params: { ...query } })
          .map(response => response.atendimentos)
          .catch(this.lidaComErro);
      });
  }

  syncAtendimentos(atendimentos: Atendimento[]) {
    const atendimentosFormmated = atendimentos.map((atendimento) => {
      delete atendimento.imagens;
      delete atendimento.assinatura;
      return atendimento;
    });

    return this.http.patch<Atendimento[]>(this.url, atendimentosFormmated)
      .catch(this.lidaComErro);
  }

  public enviarAssinatura(assinatura: Assinatura): Observable<Assinatura> {
    return this.http
      .post<Assinatura>(`${this.url}/${assinatura.atendimentoID}/assinaturas`, assinatura)
      .catch(this.lidaComErro);
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
