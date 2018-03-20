import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { Observable, Subject } from 'rxjs/Rx';

import { Store } from "@ngrx/store";

import { Atendimento } from '../../models';

import { State } from '../../redux/reducers';
import { atendimentosConcluida } from '../../redux/reducers/atendimento.reducer'

@Component({
  selector: 'concluidos',
  templateUrl: 'concluidos.html'
})
export class ConcluidosPage {

  public atividadesConcluidas$: Observable<Atendimento[]>;

  public title: string = 'Atividades Concluídas';
  constructor(public navCtrl: NavController, private store: Store<State>) {
    this.atividadesConcluidas$ = this.store.select(atendimentosConcluida);
  }

}
