import { FormGroup } from '@angular/forms';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

import { TOPICOS_DETALHES_TREINAMENTO, SOFTWARES } from '../../../../../utils/mocks';

@Component({
  selector: 'houve-treinamento',
  templateUrl: 'houve-treinamento.html',
})
export class HouveTreinamentoComponent implements OnInit {

  @Input()
  treinamentoForm: FormGroup;

  @Output()
  addTreinamentoToForm = new EventEmitter();

  public topicos = TOPICOS_DETALHES_TREINAMENTO;
  public softwares = SOFTWARES;
  public showInput = false;

  constructor(
  ) { }

  addTreinamento() {
    this.addTreinamentoToForm.emit(this.showInput);
  }
  ngOnInit() { }

}


