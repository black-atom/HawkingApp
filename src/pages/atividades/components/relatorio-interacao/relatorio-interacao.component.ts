import { AtividadeI } from './../../../../models/atividade';

import { Component } from '@angular/core';

import {
  NavController,
  NavParams,
} from 'ionic-angular';

import {
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';

import { FotoPage } from '../foto/foto';

@Component({
  selector: 'relatorio-interacao',
  templateUrl: 'relatorio-interacao.html',
})
export class RelatorioInteracaoPage {

  public form: FormGroup;
  public atividade: AtividadeI;

  constructor(
    private fb: FormBuilder,
    public navParams: NavParams,
    public navCtrl: NavController,
  ) {
    this.atividade = this.navParams.get('atividade');
    this.initForm();
  }

  initForm() {
    this.form = this.fb.group({
      motivo_retorno: ['', Validators.required],
      resumo_atendimento: ['', Validators.required],
      equipamentos_retirados: this.fb.array([]),
    });
  }

  faturamentoControl() {
    return this.fb.group({
      cnpj: ['', Validators.required],
      razao_social: ['', Validators.required],
      email: ['', Validators.required],
      equipamentos_com_troca_de_peca: this.fb.array([]),
    });
  }

  addTreinamento(add) {
    const addToForm = () => this.form.addControl('treinamento', this.treinamentoControl());
    const removeForm = () => this.form.removeControl('treinamento');
    add ? addToForm() : removeForm();
  }

  addFaturamento(add) {
    const addToForm = () => this.form.addControl('faturamento', this.faturamentoControl());
    const removeForm = () => this.form.removeControl('faturamento');
    add ? addToForm() : removeForm();
  }

  treinamentoControl() {
    return this.fb.group({
      topicos: [[], Validators.required],
      software: ['', Validators.required],
      caminho_rede: ['', Validators.required],
    });
  }


  openPhotoPage() {
    this.navCtrl.push(FotoPage, { atendimento_id: this.atividade.atendimento_id });
  }

  saveForm(form) {
    console.log(form.value);
  }

}
