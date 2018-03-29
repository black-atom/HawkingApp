import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';

@Component({
  selector: 'form-modal',
  templateUrl: 'form-modal.html',
})
export class FormModalComponent {

  public titles: string[] = [
    'Km Inicial',
    'Km Final',
    'Iniciar o almoço',
    'Finalizar o almoço',
  ];

  public descriptions: string[] = [
    'Insira a quilometrangem do veículo para iniciar deslocamento.',
  ];

  constructor(
    public viewCtrl: ViewController,
  ) { }

  close() {
    this.viewCtrl.dismiss();
  }
}
