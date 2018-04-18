import { AddAssinatura } from './../../../redux/reducers/assinatura.reducer';
import { Avaliacao, Assinatura } from './../../../models/atendimento';
import {
  SaveAtendimentoAssinatura,
  SaveAvaliacao,
} from './../../../redux/reducers/atendimento.reducer';
import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { NavController, ViewController, NavParams, ToastController, Platform } from 'ionic-angular';
import { SignaturePad } from 'angular2-signaturepad/signature-pad';
import { State } from '../../../redux/reducers';
import { Store } from '@ngrx/store';


@Component({
  selector: 'assinatura',
  templateUrl: 'assinatura.html',
})
export class AssinaturaComponent implements OnInit, OnDestroy {

  @ViewChild(SignaturePad) public signaturePad : SignaturePad;

  public signaturePadOptions = {
    minWidth: 1,
    canvasWidth: this.platform.width() * 1.4,
    canvasHeight: this.platform.height() * 0.33,
  };

  public responsavelForm: FormGroup;

  public rating: number = 0;

  public assinatura: Assinatura;
  public atendimentoID: string;

  constructor(
    private screenOrientation: ScreenOrientation,
    public navCtrl: NavController,
    private view: ViewController,
    private fb: FormBuilder,
    public navParams: NavParams,
    private readonly toastCtrl: ToastController,
    public platform: Platform,
    public store: Store<State>,
  ) {
  }

  ngOnInit(): void {
    !this.platform.is('core')
        && !this.platform.is('mobileweb')
        &&  this.screenOrientation
      .lock(this.screenOrientation.ORIENTATIONS.LANDSCAPE);
    this.assinatura = this.navParams.get('assinatura');
    this.atendimentoID = this.navParams.get('atendimentoID');
    this.store.dispatch(new SaveAtendimentoAssinatura(this.atendimentoID, this.assinatura));
  }

  ngOnDestroy(): void {
    !this.platform.is('core')
        && !this.platform.is('mobileweb')
        && this.screenOrientation
      .lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
  }

  initiaForm() {
    this.responsavelForm = this.fb.group({
      nome: ['', Validators.required],
      documento_id: ['', Validators.required],
    });
  }

  evaluate(rating: number) {
    this.rating = rating;
    this.changeStyle(rating);
  }

  changeStyle(number) {
    return number > this.rating
    ? 'md-star-outline'
    : 'md-star';
  }

  salvar() {
    const dispatchAvaliacao = () => {
      const avaliacao: Avaliacao  = {
        pergunta: 'Como voce avalia o atendimento?',
        valor: this.rating,
      };

      this.store.dispatch(new SaveAvaliacao(this.atendimentoID, avaliacao));
    };
    this.rating > 0 && dispatchAvaliacao();

    const dispatchAssinatura = () => {
      const assinaturaBase64 = this.signaturePad.toDataURL().replace(/^data:image\/png;base64,/,'');
      const assinatura: Assinatura = {
        assinaturaBase64,
        atendimentoID: this.atendimentoID,
      };
      this.store.dispatch(new AddAssinatura(assinatura));
    };
    dispatchAssinatura();

    this.presentToast();
    this.view.dismiss();
  }

  canvasResize() {
    const canvas = document.querySelector('canvas');
    this.signaturePad.set('minWidth', 1);
    this.signaturePad.set('canvasWidth', canvas.offsetWidth);
    this.signaturePad.set('canvasHeight', canvas.offsetHeight);
  }

  presentToast() {
    const toast = this.toastCtrl.create({
      message: 'Salvo com sucesso!',
      duration: 3000,
      showCloseButton: true,
      closeButtonText: 'Ok',
    });
    toast.present();
  }

  ngAfterViewInit() {
    this.signaturePad.clear();
    this.canvasResize();
  }

  limpar() {
    this.signaturePad.clear();
  }

}
