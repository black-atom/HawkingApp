
import { Store } from '@ngrx/store';
import { Component } from '@angular/core';

import {
  IonicPage,
  NavController,
  NavParams,
  Item,
  ItemSliding,
} from 'ionic-angular';

import {
  FormArray,
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';
import { Observable } from 'rxjs/Rx';

import { Atendimento } from './../../../../models';
import { State } from '../../../../redux/reducers';

@Component({
  selector: 'relatorio-interacao',
  templateUrl: 'relatorio-interacao.html',
})
export class RelatorioInteracaoPage {

  public form: FormGroup;
  public atividadeID;
  public atividadeDetail$: Observable<Atendimento>;

  constructor(
    private fb: FormBuilder,
    public navParams: NavParams,
    private store: Store<State>,
  ) {

    this.atividadeID = this.navParams.get('id_atendimento');
    this.atividadeDetail$ = this.store.select((state) => {
      const { atendimentos } = state;
      return atendimentos.find(atendimento => atendimento._id === this.atividadeID);
    });
    this.initForm();
  }

  initForm() {
    this.form = this.fb.group({
      motivo_retorno: ['', Validators.required],
      resumo_atendimento: ['', Validators.required],
      equipamentos_retirados: this.fb.array([]),
      treinamento: this.treinamentoControl(),
      faturamento: this.faturamentoControl(),
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
  treinamentoControl() {
    return this.fb.group({
      topicos: [[], Validators.required],
      software: ['', Validators.required],
      caminho_rede: ['', Validators.required],
    });
  }

  saveForm(form) {
    console.log(form.value);
  }

}
