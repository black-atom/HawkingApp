import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'avaliacao',
  templateUrl: 'avaliacao.html',
})
export class AvalicaoComponent {

  public rating: number = 0;

  @Output()
  save = new EventEmitter();

  @Output()
  next = new EventEmitter();

  constructor(
  ) {  }

  evaluate(rating: number) {
    this.rating = rating;
    this.changeStyle(rating);
  }

  changeStyle(number) {
    return number > this.rating
    ? 'md-star-outline'
    : 'md-star';
  }

  close() {
    this.next.emit();
  }

  avaliar() {
    this.save.emit(this.rating);
    this.next.emit();
  }


}
