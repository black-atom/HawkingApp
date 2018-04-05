import { Component } from '@angular/core';
import { ViewController, NavParams } from 'ionic-angular';
import { Store } from '@ngrx/store';
import { State } from '../../redux/reducers';



import {
  Descricao,
  KmInicial,
  KmFinal,
  Finalizar,
  Iniciar,
  KmInicialAfterDescricao,
} from './../../redux/reducers/monitoramento.reducer';

import { Monitoramento } from '../../models';


@Component({
  selector: 'form-modal',
  templateUrl: 'form-modal.html',
})
export class FormModalComponent {

  public formConfig;
  public dataForm;
  private funcionario;

  constructor(
    public viewCtrl: ViewController,
    public navParms: NavParams,
    private store: Store<State>,
  ) {
    this.infoPage();
    this.store.select('login').subscribe(user => this.funcionario = user);


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
      uuid,
    } = this.navParms.get('props');

    this.formConfig = {
      inputType,
      key,
      label,
      message,
      title,
      uuid,
    };
  }

  kmInicial() {
    this.store.dispatch(
      new KmInicial(
        this.formConfig.key,
        this.dataForm,
        this.funcionario._id,
        null,
      ),
    );
    this.close();
  }

  kmInicialAfterDescricao() {
    this.store.dispatch(
      new KmInicialAfterDescricao(
        this.dataForm,
        this.formConfig.uuid,
      ),
    );
    this.close();
  }

  monitoramentoDescricao() {
    this.store.dispatch(
      new Descricao(
        this.formConfig.key,
        this.dataForm,
        this.funcionario._id,
        null,
      ),
    );
    this.close();
  }

  kmInicialSalvar() {
    this.formConfig.key === 'outros' ? this.kmInicialAfterDescricao() : this.kmInicial();
  }

  kmFinal() {
    this.store.dispatch(new KmFinal(this.formConfig.uuid, this.dataForm));
    this.close();
  }

  iniciar() {
    this.store.dispatch(new Iniciar(this.formConfig.uuid));
    this.close();
  }

  finalizar() {
    this.store.dispatch(new Finalizar(this.formConfig.uuid));
    this.close();
  }

  saveMonitoramento() {
    switch (this.formConfig.label) {
      case 'Descrição':
        return this.monitoramentoDescricao();
      case 'km Inicial':
        return this.kmInicialSalvar();
      case 'km Final':
        return this.kmFinal();
      case 'Iniciar':
        return this.iniciar();
      case 'Finalizar':
        return this.finalizar();
    }
  }

}
