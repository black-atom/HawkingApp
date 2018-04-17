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
import { Relatorio, Atendimento } from '../../../../models/atendimento';

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
    this.atendimento = atendimento;
    this.initForm();
  }

  initForm() {
    this.form = this.fb.group({
      motivo_retorno: [{ value: '', disabled: true }, Validators.required],
    });
  }

  addRetorno(value) {
    console.log(value);
    if (value) return this.form.get('motivo_retorno').disable();
    return this.form.get('motivo_retorno').enable();
  }

//   this.interacaoTecnicoForm = this.fb.group({
//     resumo_atendimento: [ '', Validators.required ],
//     retorno: this.fb.group({
//       retornar: [ false, Validators.required ],
//       motivo: [{ value: '', disabled: true}, Validators.required]
//     }),
//     relatorio_tecnico: ['', Validators.required],
//     treinamento: this.fb.group({
//       treinamento: [ false, Validators.required ],
//       cadastros: [{ value: false, disabled: true }],
//       interrupcoes: [{ value: false, disabled: true }],
//       relatorios: [{ value: false, disabled: true }],
//       importacao_dados: [{ value: false, disabled: true }],
//       parametros_gerais: [{ value: false, disabled: true }],
//       abonos_justificativas: [{ value: false, disabled: true }],
//       backup_sistema: [{ value: false, disabled: true }],
//       software: [{ value: '', disabled: true }, Validators.required],
//       caminho: [{ value: '', disabled: true }],
//     }),
//     retirou_equipamento: this.fb.group({
//       retirado: [ false, Validators.required ],
//       mesmo_equipamento:  [{ value: true, disabled: true }, Validators.required ],
//       informacoe_equipamento: [{ value: '', disabled: true }, Validators.required ],
//     }),
//     faturamento: this.fb.group({
//       mesmo_cnpj: [ true, Validators.required ],
//       cnpj: [{ value: '', disabled: true }, Validators.required ],
//       nome_razao_social: [{ value: '', disabled: true }, Validators.required ],
//       email: [{ value: '', disabled: true }, Validators.required ],
//       quem_aprovou: [{ value: '', disabled: true }, Validators.required ],
//       valor: [{ value: '', disabled: true }, Validators.required ],
//       prazo_pagamento: [{ value: '', disabled: true} , Validators.required ],
//     })
//   });
// }


  openPhotoPage() {
    this.navCtrl.push(FotoPage, { atendimento_id: this.atendimento._id });
  }

  saveForm(form) {
    // this.store.dispatch(new SaveRelatorio(this.atendimento._id, form.value));
    // console.log(form.value);
  }

}
