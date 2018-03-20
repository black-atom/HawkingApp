import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Store } from '@ngrx/store';
import { RetriveAtendimento } from './../../redux/reducers/atendimento.reducer';
import { State } from '../../redux/reducers';

@Component({
  selector: 'navbar',
  templateUrl: 'navbar.html'
})
export class NavbarComponent {

  @Input()
  titlePage: String;

  @Output()
  refreshLoading = new EventEmitter();

  constructor(private store: Store<State>) {
  }

  referesh() {
    this.refreshLoading.emit();
  }

}
