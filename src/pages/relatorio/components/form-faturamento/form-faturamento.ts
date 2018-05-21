import {
  atendimentosAll,
  RemoveEquipamentoFaturado,
} from './../../../../redux/reducers/atendimento.reducer';
import { Store } from '@ngrx/store';
import { Atendimento } from './../../../../models/atendimento';
import { Observable } from 'rxjs/Rx';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NavController, NavParams } from 'ionic-angular';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CategoriasPage } from './../categorias/categorias';
import { State } from '../../../../redux/reducers';
import {
  FaturarEquipamentoSelecionadoPage,
} from './../faturar-equipamento-selecionado/faturar-equipamento-selecionado';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'form-faturamento',
  templateUrl: 'form-faturamento.html',
})
export class FormFaturamentoComponent  implements OnInit{

  @Input()
  initialData;

  @Input()
  atividadeSelecionada;


  @Output()
  change = new EventEmitter();

  public atividadeSelecionadaStore$: Observable<Atendimento>;
  public form: FormGroup;
  subscription : Subscription;

  constructor(
    public navCtrl: NavController,
    public nacParams: NavParams,
    private fb: FormBuilder,
    private store: Store<State>,
  ) {}

  page = CategoriasPage;


  ngOnInit(): void {
    this.initForm(this.initialData);
    this.atividadeSelecionadaStore$ = this.store.select(atendimentosAll).map(atendimentos =>
      atendimentos.find(
        atendimento => atendimento._id === this.atividadeSelecionada.atendimento._id,
      ),
    );
  }

  initForm({ cnpj = '',
    email = '',
    razao_social = '',
  } = {}) {
    this.form = this.fb.group({
      cnpj,
      razao_social,
      email,
    });

    this.subscription = this.form
      .valueChanges
      .subscribe(values => this.change.emit({
        formName: 'faturamento',
        formData: values,
        formValid: this.form.valid,
      }));
  }

  navPageDetail() {
    this.navCtrl.push(this.page, {
      atividade: this.atividadeSelecionada,
      tipoPage: 'faturar',
    });
  }

  editarEquipamento(equipamento) {
    this.navCtrl.push(FaturarEquipamentoSelecionadoPage, {
      equipamento,
      atividade: this.atividadeSelecionada,
      tipoPage: 'faturar',
    });
  }

  removerEquipamento(equipamento) {
    const { atendimento: { _id } } = this.atividadeSelecionada;
    this.store.dispatch(new RemoveEquipamentoFaturado(_id, equipamento));
  }


  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
