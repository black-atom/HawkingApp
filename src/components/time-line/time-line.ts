import { Component, Input } from '@angular/core';

@Component({
  selector: 'time-line',
  templateUrl: 'time-line.html',
})
export class TimeLine {

  @Input()
  atividade;

  constructor() { }
}
