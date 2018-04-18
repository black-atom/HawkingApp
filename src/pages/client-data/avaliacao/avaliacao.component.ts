import { Component } from '@angular/core';

@Component({
  selector: 'avaliacao',
  templateUrl: 'avaliacao.html',
})
export class AvalicaoComponent {

  public rating: number = 0;

  constructor() { }

  evaluate(rating: number) {
    this.rating = rating;
    this.changeStyle(rating);
  }

  changeStyle(number) {
    return number > this.rating
    ? 'md-star-outline'
    : 'md-star';
  }

}
