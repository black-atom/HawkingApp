import { SaveRelatorio } from './../../../../redux/reducers/atendimento.reducer';
import { State } from './../../../../redux/reducers/index';
import { Store } from '@ngrx/store';
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
import { Atendimento } from '../../../../models/atendimento';

@Component({
  selector: 'relatorio-interacao',
  templateUrl: 'relatorio-interacao.html',
})
export class RelatorioInteracaoPage {

  public form: FormGroup;
  public atendimento: Atendimento;

  constructor(
    private fb: FormBuilder,
    public navParams: NavParams,
    public navCtrl: NavController,
    private store: Store<State>,
  ) {
    const { atendimento } = <AtividadeI>this.navParams.get('atividade');
    console.log(atendimento);
    this.atendimento = atendimento;
    this.initForm();
  }

  initForm() {
    const { relatorio  } = this.atendimento;
    const {
      equipamentos_retirados = [],
      motivo_retorno = '',
      resumo_atendimento = '',
    } = relatorio || {};

    this.form = this.fb.group({
      motivo_retorno: [motivo_retorno , Validators.required],
      resumo_atendimento: [resumo_atendimento, Validators.required],
      equipamentos_retirados: this.initEquipamentos(equipamentos_retirados),
    });
    if (relatorio) {
      relatorio.faturamento && this.addFaturamento(true, relatorio.faturamento);
      relatorio.treinamento && this.addTreinamento(true, relatorio.treinamento);
    }
  }

  initEquipamentos(equipamentos = []) {
    const getItem = ({
      descricao = '',
      quantidade = 0,
    } = {}) => this.fb.group({
      descricao: [descricao, Validators.required],
      quantidade: [quantidade, Validators.required],
    });

    const getEquipamentos = ({
      modelo_equipamento = '',
      numero_equipamento = '',
      itens = [],
    }) => this.fb.group({
      modelo_equipamento: [modelo_equipamento, Validators.required],
      numero_equipamento: [numero_equipamento, Validators.required],
      itens: this.fb.array(itens.map(getItem)),
    });

    return this.fb.array(equipamentos.map(getEquipamentos));
  }

  faturamentoControl({
    cnpj = '',
    razao_social = '',
    email = '',
    equipamentos= [],
  } = {}) {
    const getPecas = ({
      descricao = '',
      quantidade = 1,
      preco = 0,
    }= {}) => this.fb.group({
      descricao: [descricao, Validators.required],
      quantidade: [1, Validators.required],
      preco: [preco, Validators.required],
    });

    const getEquipamento = ({
      modelo_equipamento = '',
      numero_equipamento = '',
      pecas = [],
    } = {}) => this.fb.group({
      modelo_equipamento: [modelo_equipamento, Validators.required],
      numero_equipamento: [numero_equipamento, Validators.required],
      pecas: this.fb.array(pecas.map(getPecas)),
    });

    return this.fb.group({
      cnpj: [cnpj, Validators.required],
      razao_social: [razao_social, Validators.required],
      email: [email, Validators.required],
      equipamentos: this.fb.array(equipamentos.map(getEquipamento)),
    });
  }

  addTreinamento(add, defaulValues?) {
    const addToForm = () => this.form
      .addControl('treinamento', this.treinamentoControl(defaulValues));
    const removeForm = () => this.form.removeControl('treinamento');
    add ? addToForm() : removeForm();
  }

  addFaturamento(add, defaulValues?) {
    const addToForm = () => this.form
      .addControl('faturamento', this.faturamentoControl(defaulValues));
    const removeForm = () => this.form.removeControl('faturamento');
    add ? addToForm() : removeForm();
  }

  treinamentoControl({
    topicos = [],
    software = '',
    caminho_rede = '',
  } = {}) {
    return this.fb.group({
      topicos: [topicos, Validators.required],
      software: [software, Validators.required],
      caminho_rede: [caminho_rede, Validators.required],
    });
  }


  openPhotoPage() {
    this.navCtrl.push(FotoPage, { atendimento_id: this.atendimento._id });
  }

  saveForm(form) {
    this.store.dispatch(new SaveRelatorio(this.atendimento._id, form.value));
  }

}
