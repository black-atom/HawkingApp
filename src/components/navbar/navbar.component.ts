import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'navbar',
  templateUrl: 'navbar.html'
})
export class NavbarComponent {

  @Input()
  titlePage: String;

  @Output()
  refreshLoading = new EventEmitter();

  constructor() { }

  referesh() {
    this.refreshLoading.emit();
  }

}
