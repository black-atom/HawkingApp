import { Component, EventEmitter, Output, Input } from '@angular/core';


import { Relatorio } from '../../../models/atendimento';

@Component({
  selector: 'preview',
  templateUrl: 'preview.html',
})
export class PreviewComponent  {

  @Input()
  relatorio: Relatorio;

  @Output()
  next = new EventEmitter;

  constructor() { }

  emitNextEvent() {
    this.next.emit();
  }
}
