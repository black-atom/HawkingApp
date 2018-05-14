import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {
  EquipamentosSelecionadoPage,
} from './../equipamentos-selecionado/equipamentos-selecionado';

@IonicPage()
@Component({
  selector: 'page-categorias',
  templateUrl: 'categorias.html',
})
export class CategoriasPage implements OnInit{

  private page = EquipamentosSelecionadoPage;
  private atividadeSelecionada;
  private tipoPage;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
  ) { }

  ionViewDidLoad() { }

  ngOnInit() {
    this.atividadeSelecionada = this.navParams.get('atividade');
    this.tipoPage = this.navParams.get('tipoPage');

  }

  navPageDetail(equipmentsType) {
    this.navCtrl.push(this.page, {
      equipmentsType,
      atividade: this.atividadeSelecionada,
      tipoPage: this.tipoPage,
    });
  }

}
