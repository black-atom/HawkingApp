import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {
  EquipamentosSelecionadoPage,
} from './../equipamentos-selecionado/equipamentos-selecionado';

@IonicPage()
@Component({
  selector: 'page-categorias',
  templateUrl: 'categorias.html',
})
export class CategoriasPage {

  private page = EquipamentosSelecionadoPage;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
  ) { }

  ionViewDidLoad() { }

  navPageDetail(equipmentsType) {
    this.navCtrl.push(this.page, { equipmentsType });
  }

}
