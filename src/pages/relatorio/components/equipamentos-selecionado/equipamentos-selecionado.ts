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
  public atividadeSelecionada;
  public tipoPage;

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
    this.atividadeSelecionada = this.navParams.get('atividade');
    this.tipoPage = this.navParams.get('tipoPage');
  }


  navPageDetail(equipamento) {
    this.navCtrl.push(EquipamentoSelecionadoPage, {
      equipamento,
      atividade: this.atividadeSelecionada,
      tipoPage: this.tipoPage,
    });
  }

}
