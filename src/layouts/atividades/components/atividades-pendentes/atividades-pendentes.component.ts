import { Component, Input } from '@angular/core';
import { Atendimento } from '../../../../models';

@Component({
  selector: 'atividades-pendentes',
  templateUrl: 'atividades-pendentes.html'
})
export class AtividadesPendentesComponent  {

  @Input()
  AtividadePendente: Atendimento;

  constructor() {  }

}
