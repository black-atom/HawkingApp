import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { relogiosMock } from './../../../../utils/mocks/equipamentos';
import { EquipamentoSelecionadoPage } from '../equipamento-selecionado/equipamento-selecionado';

@IonicPage()
@Component({
  selector: 'page-equipamentos-selecionado',
  templateUrl: 'equipamentos-selecionado.html',
})
export class EquipamentosSelecionadoPage implements OnInit{

  public equipmentsType;
  public equipamentos;
  public equipamentosMock = relogiosMock;

  private page = EquipamentoSelecionadoPage;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
  ) {
  }

  ionViewDidLoad() {
  }

  ngOnInit() {
    this.equipmentsType = this.navParams.get('equipmentsType');
    this.equipamentos = this.equipamentosMock.filter(
      equipamento => equipamento.tipo === this.equipmentsType,
    );
  }


  navPageDetail(equipamento) {
    this.navCtrl.push(EquipamentoSelecionadoPage, { equipamento });
  }

}
