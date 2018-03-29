import { State } from './../../../redux/reducers/index';
import { Component } from '@angular/core';
import { ViewController, NavParams } from 'ionic-angular';
import { Store } from '@ngrx/store';

import  uuidv4 from 'uuid/v4';

@Component({
  selector: 'form-modal',
  templateUrl: 'form-modal.html',
})
export class FormModalComponent {

  public formConfig;
  public km: number;
  private funcionario;

  constructor(
    public viewCtrl: ViewController,
    public navParms: NavParams,
    private store: Store<State>,
  ) {
    this.infoPage();
    this.store.select('login').subscribe(user => console.log(user));

  }

  close() {
    this.viewCtrl.dismiss();
  }

  infoPage () {
    const {
      inputType,
      key,
      buttonName: label,
      message,
      name: title,
    } = this.navParms.get('props');

    this.formConfig = {
      inputType,
      key,
      label,
      message,
      title,
    };
  }

  saveMonitoramento() {
    const monitoramento = {
      uuid: uuidv4(),
      km_inicial: this.km,
      km_final: null,
      data_hora_inicial_km: new Date(),
      data_hora_final_km: null,
      data_hora_inicial_virgente_local: null,
      data_hora_final_virgente_local: null,
      tipo: this.formConfig.key,
      id_funcionario: '',
      id_atendimento: '',
      isUploaded: '',
      isPaused: '',
      actions: [],
    };
    console.log(monitoramento);
  }


}
