import { Component, Input } from '@angular/core';
import { Atendimento } from '../../../../models';


@Component({
  selector: 'atividade',
  templateUrl: 'atividade.html'
})
export class Atividade {

  @Input()
  Atividade: Atendimento;

  constructor() {  }

}
