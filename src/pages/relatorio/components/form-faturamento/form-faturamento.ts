import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NavController, NavParams } from 'ionic-angular';
import { Component, OnInit, Input } from '@angular/core';
import { CategoriasPage } from './../categorias/categorias';

@Component({
  selector: 'form-faturamento',
  templateUrl: 'form-faturamento.html',
})
export class FormFaturamentoComponent  implements OnInit{

  @Input()
  initialData;

  public atividadeSelecionada;
  public form: FormGroup;

  constructor(
    public navCtrl: NavController,
    public nacParams: NavParams,
    private fb: FormBuilder,
  ) {}

  page = CategoriasPage;

  ngOnInit(): void {
    this.atividadeSelecionada = this.nacParams.get('atividade');
    this.initForm();
  }

  initForm() {
    this.form = this.fb.group({
      cnpj: ['', Validators.required],
      razao_social: ['', Validators.required],
      email: ['', Validators.required],
    });
  }
  navPageDetail() {
    this.navCtrl.push(this.page, {
      atividade: this.atividadeSelecionada,
      tipoPage: 'faturar',
    });
  }
}
