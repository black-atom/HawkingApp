import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'reembolsos',
  templateUrl: 'reembolsos.html',
})
export class ReembolsosPage {

  public title: string  = 'Reembolsos';

  constructor(public navCtrl: NavController) {

  }

}
