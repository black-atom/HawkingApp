import { Component, Input } from '@angular/core';

import { Atendimento } from './../../../models';

@Component({
  selector: 'detail',
  templateUrl: 'detail.html'
})
export class Detail {

  @Input()
  atendimento: Atendimento;

  constructor( ) { }

}
