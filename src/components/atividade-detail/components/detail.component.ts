import { Component, Input } from '@angular/core';

import { Atendimento } from './../../../models';
import { AtividadeI } from '../../../models/atividade';

@Component({
  selector: 'detail',
  templateUrl: 'detail.html',
})
export class Detail {

  @Input()
  atividade: AtividadeI;

  constructor( ) {
    console.log(this.atividade)
  }

}
