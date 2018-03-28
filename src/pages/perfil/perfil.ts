import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'perfil',
  templateUrl: 'perfil.html',
})
export class PerfilPage {

  public title: string = 'Perfil';

  constructor(public navCtrl: NavController) {

  }

}
