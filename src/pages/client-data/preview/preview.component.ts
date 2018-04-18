import { Component, EventEmitter, Output } from '@angular/core';

import { NavParams } from 'ionic-angular';

import { AtividadeI } from '../../../models/atividade';

@Component({
  selector: 'preview',
  templateUrl: 'preview.html',
})
export class PreviewComponent  {

  public atividade: AtividadeI;

  @Output()
  next = new EventEmitter;

  constructor(private navParams: NavParams) { }

  ngOnInit() {
    this.atividade = this.navParams.get('atividade');
  }

  emitNextEvent() {
    this.next.emit();
  }
}
