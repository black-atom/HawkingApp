import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';

@Component({
  selector: 'modal-atividades',
  templateUrl: 'modal-atividades.html',
})
export class ModalAtividadesComponent {
  constructor(public viewCtrl: ViewController) {}

  close() {
    this.viewCtrl.dismiss();
  }
}

