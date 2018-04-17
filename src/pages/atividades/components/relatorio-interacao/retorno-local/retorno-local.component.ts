import { FormGroup } from '@angular/forms';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

import { MOTIVOS_RETORNO_LOCAL } from '../../../../../utils/mocks';

@Component({
  selector: 'retorno-local',
  templateUrl: 'retorno-local.html',
})
export class RetornoLocalComponent implements OnInit {


  @Input()
  public retornoLocalForm: FormGroup;

  @Output()
  addRetornoToForm = new EventEmitter();

  public showInput: boolean = false;
  public motivos = MOTIVOS_RETORNO_LOCAL;

  constructor(

  ) { }

  ngOnInit() {
    this.showInput = Boolean(this.retornoLocalForm);
  }



  addRetorno() {
    this.addRetornoToForm.emit(this.showInput);
  }

}


