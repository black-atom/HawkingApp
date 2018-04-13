import { Component, Input } from '@angular/core';

@Component({
  selector: 'grupo-atividades',
  templateUrl: 'grupo-atividades.html',
})
export class GrupoAtividadesComponent {

  @Input()
  public collapse: boolean = true;

  @Input()
  public title: string = '';

  @Input()
  public classGroup;

  @Input()
  public atividades: any = [];

  constructor() { }

  collapsed() {
    this.collapse = !this.collapse;
  }

}
