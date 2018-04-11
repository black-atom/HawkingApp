import { Component } from '@angular/core';

import {
  IonicPage,
  NavController,
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

@Component({
  selector: 'relatorio-interacao',
  templateUrl: 'relatorio-interacao.html',
})
export class RelatorioInteracaoPage {

  public form: FormGroup;

  constructor(private fb: FormBuilder) {
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
    this.addEquipamento();
  }

  faturamentoControl() {
    return this.fb.group({
      cnpj: ['', Validators.required],
      razao_social: ['', Validators.required],
      email: ['', Validators.required],
    });
  }
  treinamentoControl() {
    return this.fb.group({
      topicos: [[], Validators.required],
      software: ['', Validators.required],
      caminho_rede: ['', Validators.required],
    });
  }
  equipamentoControl() {
    return this.fb.group({
      modelo_equipamento: ['', Validators.required],
      numero_equipamento: ['', Validators.required],
      itens: this.fb.array([]),
    });
  }

  addEquipamento() {
    const equipamentos: FormArray = <FormArray>this.form.controls['equipamentos_retirados'];
    equipamentos.push(this.equipamentoControl());
  }

  saveForm(form) {
    console.log(form.value);
  }

}
