import { Component, ViewChild, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { NavController, Slides, IonicPage } from 'ionic-angular';
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

  get beginning(){
    return this.slides.isBeginning();
  }

  get end(){
    return this.slides.isEnd();
  }

  get treinamentoData(){
    return this.getFormData('treinamento');
  }

  get equipamentosRetiradosData(){
    return this.getFormData('equipamentos_retirados');
  }

  get resumoData(){
    return {
      resumo_atendimento: this.getFormData('resumo_atendimento'),
      motivo_retorno: this.getFormData('motivo_retorno')
    };
  }

  get faturamentoData(){
    return this.getFormData('faturamento');
  }

  constructor(public navCtrl: NavController) {

  }

  ngOnInit() {

  }

  getFormData(formName){
    return view(
      lensProp(formName),
      this.currentFormsData
    )
  }

  ionSlideDidChange(){
    let currentIndex = this.slides.realIndex;
    this.activeFormIndex  = currentIndex;
  }

  handleFormMenuClick(index){
    this.activeFormIndex = index;
    this.slides.slideTo(index);
    this.saveData();
  }

  formChange({formName, formData, formValid}) {
    if(formName && formData){
      this.currentFormsData = set(
        lensProp(formName),
        formData,
        this.currentFormsData
      );
    }
  }

  next(){
    this.slides.slideNext();
    this.saveData();
  }

  previous(){
    this.slides.slidePrev();
    this.saveData();
  }

  saveData(){
    console.log('saving', this.currentFormsData)
  }
}