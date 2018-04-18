import { NavParams } from 'ionic-angular';
import { Component, OnInit } from '@angular/core';

import { Avaliacao } from './../../../models/atendimento';
import { State } from '../../../redux/reducers';
import { SaveAvaliacao } from './../../../redux/reducers/atendimento.reducer';
import { Store } from '@ngrx/store';

@Component({
  selector: 'avaliacao',
  templateUrl: 'avaliacao.html',
})
export class AvalicaoComponent implements OnInit{

  public rating: number = 0;
  public atendimentoID;
  constructor(
    public store: Store<State>,
    public navParams: NavParams,
  ) {  }

  ngOnInit() {
    this.atendimentoID = this.navParams.get('atendimentoID');
    console.log(this.atendimentoID);
  }

  evaluate(rating: number) {
    this.rating = rating;
    this.changeStyle(rating);
  }

  changeStyle(number) {
    return number > this.rating
    ? 'md-star-outline'
    : 'md-star';
  }

  avaliar() {
    const avaliacao: Avaliacao  = {
      pergunta: 'Como voce avalia o atendimento?',
      valor: this.rating,
    };
    this.store.dispatch(new SaveAvaliacao(this.atendimentoID, avaliacao));
  }


}
