import { Component, Input } from '@angular/core';
import {
  NavController,
  ModalController,
} from 'ionic-angular';

import {
  ModalMonitoramento,
} from './../../../../components/modal-monitoramento/modal-monitoramento';

import {
  Atendimento,
  IAtividade,
} from '../../../../models';

import {
  AtividadeDetail,
} from '../../../../components/atividade-detail/atividade-detail.component';

import { buttonProperties } from '../../../../utils/ButtonProperties';

@Component({
  selector: 'atividade',
  templateUrl: 'atividade.html',
})
export class Atividade {

  @Input()
  atividade: IAtividade;

  public buttonProperties = buttonProperties;

  constructor(
    public navCtrl: NavController,
    public modalCtrl: ModalController,
  ) {  }

  checkAtividade(atividade) {
    switch (atividade.tipo) {
      case 'atendimento':
        return this.openAtividadeDetail(atividade.id_atendimento);
      case 'abastecimento':
        return this.openModal(atividade);
      case 'almoco':
        return this.openModal(atividade);
      case 'empresa':
        return this.openModal(atividade);
      case 'outros':
        return this.openModal(atividade);

      default:
        return this.openAtividadeDetail(atividade._id);
    }
  }

  openAtividadeDetail(id) {
    this.navCtrl.push(AtividadeDetail, { id });
  }

  openModal({ tipo, uuid }) {
    const propsButton = this.buttonProperties.find(buttonProp => buttonProp.key === tipo);
    const props = { ...propsButton, uuid };
    const modal = this.modalCtrl.create(ModalMonitoramento, { props });
    modal.present();
  }


}
