import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ViewController, NavController } from 'ionic-angular';
import { AssinaturaComponent } from '../assinatura/assinatura.component';

@Component({
  selector: 'assinatura-form',
  templateUrl: 'assinatura-form.html',
})
export class AssinaturaFormComponent implements OnInit {

  public responsavelForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private viewCtrl: ViewController,
    private navCtrl: NavController,
  ) { }

  ngOnInit(): void {
    this.initiaForm();
  }

  initiaForm() {
    this.responsavelForm = this.fb.group({
      nome: [''],
      documento_id: [''],
    });
  }

  close() {
    this.viewCtrl.dismiss();
  }

  openAssinatura() {
    this.navCtrl.push(AssinaturaComponent);
    this.close();
  }

}
