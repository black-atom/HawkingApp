import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ViewController, NavController, ToastController, NavParams } from 'ionic-angular';
import { AssinaturaComponent } from '../assinatura/assinatura.component';

@Component({
  selector: 'assinatura-form',
  templateUrl: 'assinatura-form.html',
})
export class AssinaturaFormComponent implements OnInit {

  public responsavelForm: FormGroup;
  public atendimentoID: string;

  constructor(
    private fb: FormBuilder,
    private viewCtrl: ViewController,
    private navCtrl: NavController,
    private navParams: NavParams,
    public toastCtrl: ToastController,
  ) { }

  ngOnInit(): void {
    this.initiaForm();
    this.atendimentoID = this.navParams.get('atendimentoID');
  }

  initiaForm() {
    this.responsavelForm = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(5)]],
      documento_id: ['', [Validators.required, Validators.minLength(9)]],
    });
  }

  close() {
    this.viewCtrl.dismiss();
  }

  openAssinatura(valid, assinatura) {
    const toast = this.toastCtrl.create({
      message: 'Por favor, preencha os dados!',
      duration: 3000,
    });

    !valid && toast.present();

    valid && this.navCtrl.push(AssinaturaComponent, {
      assinatura,
      atendimentoID: this.atendimentoID,
    });
    valid && this.close();
  }

}
