import { Component, Input } from '@angular/core';
import { AtividadeI } from '../../../../models/atividade';

@Component({
  selector: 'atendimento',
  templateUrl: 'atendimento.html',
})
export class AtendimentoComponet {

  @Input()
  atividade: AtividadeI;
  
  @Input()
  relatorioTecnico;


  constructor() {  }

}
