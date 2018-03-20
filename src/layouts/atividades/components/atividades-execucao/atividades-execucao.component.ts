import { Component, Input } from '@angular/core';
import { Atendimento } from '../../../../models/atendimento';

@Component({
  selector: 'atividades-execucao',
  templateUrl: 'atividades-execucao.html'
})
export class AtividadesExecucaoComponent {

  @Input()
  AtividadePausada: Atendimento;

  constructor() {
  }

}
