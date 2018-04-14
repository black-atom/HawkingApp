import { FormGroup } from '@angular/forms';
import { Component, Input, OnInit } from '@angular/core';

import { MOTIVOS_RETORNO_LOCAL } from '../../../../../utils/mocks';

@Component({
  selector: 'retorno-local',
  templateUrl: 'retorno-local.html',
})
export class RetornoLocalComponent implements OnInit {


  @Input()
  public retornoLocalForm: FormGroup;

  public showInput: boolean = false;
  public motivos = MOTIVOS_RETORNO_LOCAL;

  constructor(

  ) { }

  ngOnInit() { }

  print() {
    // this.retornoLocalForm.get('motivo').disable();
    console.log(this.retornoLocalForm);
  }

  print1() {
    this.retornoLocalForm.get('motivo').reset();
  }

}


