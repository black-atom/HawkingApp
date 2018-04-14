import { Component, Input } from '@angular/core';
import { AtividadeI } from '../../../../models/atividade';


@Component({
  selector: 'atividade',
  templateUrl: 'atividade.html',
})
export class AtividadeComponet {

  @Input()
  atividade: AtividadeI;

  constructor( ) { }

}
