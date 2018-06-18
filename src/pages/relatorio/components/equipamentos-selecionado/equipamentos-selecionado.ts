import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { equipamentosRetirar } from './../../../../utils/mocks/equipamentos';

import {
  RemoverEquipamentoSelecionadoPage,
} from '../remover-equipamento-selecionado/remover-equipamento-selecionado';
import {
  FaturarEquipamentoSelecionadoPage,
} from '../faturar-equipamento-selecionado/faturar-equipamento-selecionado';

@IonicPage()
@Component({
  selector: 'page-equipamentos-selecionado',
  templateUrl: 'equipamentos-selecionado.html',
})
export class EquipamentosSelecionadoPage implements OnInit{

  public equipmentsType;
  public equipamentos;
  public equipamentosMock = equipamentosRetirar;
  public atividadeSelecionada;
  public tipoPage;

  private page = {
    retirar: RemoverEquipamentoSelecionadoPage,
    faturar: FaturarEquipamentoSelecionadoPage,
  };
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
    this.navCtrl.push(this.page[this.tipoPage], {
      equipamento,
      atividade: this.atividadeSelecionada,
    });
  }

}
