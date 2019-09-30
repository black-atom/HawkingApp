
import { Component, ViewChild, EventEmitter, Output } from '@angular/core';

import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { ToastController, Platform } from 'ionic-angular';
import { SignaturePad } from 'angular2-signaturepad/signature-pad';


@Component({
  selector: 'assinatura',
  templateUrl: 'assinatura.html',
})
export class AssinaturaComponent {

  @ViewChild(SignaturePad) public signaturePad : SignaturePad;

  public signaturePadOptions = {
    minWidth: 1,
    canvasWidth: this.platform.width() * 1.4,
    canvasHeight: this.platform.height() * 0.33,
  };

  @Output()
  next = new EventEmitter;

  @Output()
  save = new EventEmitter;

  constructor(
    private screenOrientation: ScreenOrientation,
    private readonly toastCtrl: ToastController,
    public platform: Platform,
  ) {
  }

  salvar() {
    const assinaturaBase64 = this.signaturePad.toDataURL().replace(/^data:image\/png;base64,/,'');
    this.save.emit(assinaturaBase64);
    this.presentToast();
    this.next.emit();
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
  }

  ngAfterViewInit() {
    this.signaturePad.clear();
    this.canvasResize();
  }

  limpar() {
    this.signaturePad.clear();
  }

}
