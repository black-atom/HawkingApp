import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';


import API_URL from '../app/api';
import { HttpClient } from '@angular/common/http';
import { AtividadeI } from '../models';


@Injectable()
export class MonitoramentoProvider {

  private url = `${API_URL}/api/monitoramentos`;

  constructor(private http: HttpClient) {  }

  saveAtividade(atividade: AtividadeI): Observable<any> {
    return this.http.post<AtividadeI>(this.url, atividade)
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
