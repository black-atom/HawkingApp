import { Component, ViewChild, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { NavController, Slides, IonicPage, NavParams } from 'ionic-angular';
import { lensProp, set, view } from 'ramda';

@IonicPage({
  name: 'RelatorioPage',
})
@Component({
  selector: 'page-relatorio',
  templateUrl: 'relatorio.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RelatorioPage  implements OnInit{

  @ViewChild(Slides) slides: Slides;
  activeFormIndex = 0;
  currentFormsData = {};
  atividadeSelecionada;

  get beginning() {
    return this.slides.isBeginning();
  }

  get end() {
    return this.slides.isEnd();
  }

  get treinamentoData() {
    return this.getFormData('treinamento');
  }

  get equipamentosRetiradosData() {
    return this.getFormData('equipamentos_retirados');
  }

  get resumoData() {
    return {
      resumo_atendimento: this.getFormData('resumo_atendimento'),
      motivo_retorno: this.getFormData('motivo_retorno'),
    };
  }

  get faturamentoData() {
    return this.getFormData('faturamento');
  }

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
  ) {

  }

  ngOnInit() {
    this.atividadeSelecionada = this.navParams.get('atividade');
    this.activeFormIndex = this.navParams.get('tipoPage') || 0;
  }

  getFormData(formName) {
    return view(
      lensProp(formName),
      this.currentFormsData,
    );
  }

  ionSlideDidChange() {
    const currentIndex = this.slides.realIndex;
    this.activeFormIndex = currentIndex;
  }

  handleFormMenuClick(index) {
    this.activeFormIndex = index;
    this.slides.slideTo(index);
  }

  formChange({ formName, formData, formValid }) {
    if (formName && formData) {
      this.currentFormsData = set(
        lensProp(formName),
        formData,
        this.currentFormsData,
      );
    }
  }

  next() {
    this.slides.slideNext();
  }

  previous() {
    this.slides.slidePrev();
  }

  saveData() {
    console.log('saving', this.currentFormsData);
  }
}
