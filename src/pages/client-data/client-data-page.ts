import { Component, ViewChild, OnInit } from '@angular/core';
import { IonicPage, Slides, NavParams, ViewController, Platform } from 'ionic-angular';
import { State } from '../../redux/reducers';
import { Store } from '@ngrx/store';
import { Assinatura } from '../../models';
import { AddAssinatura } from '../../redux/reducers/assinatura.reducer';
import { Avaliacao } from '../../models/atendimento';
import { AddAssinaturaInfo } from './../../redux/reducers/assinatura.reducer';
import { FinalizaAtividade } from './../../redux/reducers/atividade.reduce';
import {
  SaveAtendimentoAssinatura,
  SaveAvaliacao,
} from './../../redux/reducers/atendimento.reducer';
import { AtividadeI } from './../../models/atividade';
import { ScreenOrientation } from '@ionic-native/screen-orientation';

@Component({
  selector: 'client-data-page',
  templateUrl: 'client-data-page.html',
})
@IonicPage({
  name: 'DataClientPage',
})
export class ClientDataPage implements OnInit {

  atividade: AtividadeI;
  ngOnInit(): void {
    this.atividade = this.navParams.get('atividade');
  }
  @ViewChild(Slides) slides: Slides;

  constructor(
    public navParams: NavParams,
    public store: Store<State>,
    public view: ViewController,
    public platform: Platform,
    private screenOrientation: ScreenOrientation,
  ) {

  }

  ngAfterViewInit() {
    this.slides.lockSwipes(true);
  }

  goToSlide() {
    this.slides.lockSwipes(false);
    this.slides.slideNext(200);
    this.slides.lockSwipes(true);

    if (this.slides.getActiveIndex() === 2) {
      !this.platform.is('core')
        && !this.platform.is('mobileweb')
        && this.screenOrientation
        .lock(this.screenOrientation.ORIENTATIONS.LANDSCAPE);
    } else {
      !this.platform.is('core')
        && !this.platform.is('mobileweb')
        && this.screenOrientation
      .lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
    }
  }

  saveAtendimentoAssinatura(clienteData) {
    this.store.dispatch(new AddAssinaturaInfo(
      { ...clienteData, atendimentoID: this.atividade.atendimento_id },
    ));
  }

  saveAssinaturaBase64(assinaturaBase64) {
    const assinatura: Assinatura = {
      assinaturaBase64,
      atendimentoID: this.atividade.atendimento_id,
    };
    this.store.dispatch(new AddAssinatura(assinatura));
  }

  saveAvaliacao(value) {
    const avaliacao: Avaliacao  = {
      pergunta: 'Como voce avalia o atendimento?',
      valor: value,
    };
    this.store.dispatch(new SaveAvaliacao(this.atividade.atendimento_id, avaliacao));
  }

  close() {
    this.store.dispatch(new FinalizaAtividade(this.atividade.atividade_id));
    this.view.dismiss();
  }
}

