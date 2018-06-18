import { SaveRelatorio, atendimentosAll } from './../../redux/reducers/atendimento.reducer';
import { Component, ViewChild, OnInit } from '@angular/core';
import { NavController, Slides, IonicPage, NavParams } from 'ionic-angular';
import { lensProp, set, view } from 'ramda';
import { Store } from '@ngrx/store';
import { State } from '../../redux/reducers';

@IonicPage({
  name: 'RelatorioPage',
})
@Component({
  selector: 'page-relatorio',
  templateUrl: 'relatorio.html',
})
export class RelatorioPage  implements OnInit{

  @ViewChild(Slides) slides: Slides;
  activeFormIndex = 0;
  currentFormsData;
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
    private store: Store<State>,
  ) {

  }

  ngOnInit() {
    this.atividadeSelecionada = this.navParams.get('atividade');
    this.activeFormIndex = this.navParams.get('tipoPage') || 0;
    this.store.select(atendimentosAll).subscribe(atendimentos =>
      this.currentFormsData = atendimentos.find(
        atendimento => atendimento._id === this.atividadeSelecionada.atendimento._id,
      ).relatorio ?  atendimentos.find(
        atendimento => atendimento._id === this.atividadeSelecionada.atendimento._id,
      ).relatorio : {},
    );
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
    this.saveData();
  }

  previous() {
    this.slides.slidePrev();
    this.saveData();
  }

  saveData() {
    this.store.dispatch(
      new SaveRelatorio(this.atividadeSelecionada.atendimento._id, this.currentFormsData),
    );
  }
}
