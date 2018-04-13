import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Component, Input, OnInit } from '@angular/core';

import { TOPICOS_DETALHES_TREINAMENTO, SOFTWARES } from '../../../../../utils/mocks';

@Component({
  selector: 'houve-treinamento',
  templateUrl: 'houve-treinamento.html',
})
export class HouveTreinamentoComponent implements OnInit {

  @Input()
  treinamentoForm: FormGroup;

  public topicos = TOPICOS_DETALHES_TREINAMENTO;
  public softwares = SOFTWARES;
  public showInput = false;

  constructor(
    private fb: FormBuilder,
  ) { }

  ngOnInit() { }

}


