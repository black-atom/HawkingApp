import {
  Component,
  OnInit,
  Output,
  EventEmitter,
} from '@angular/core';

import {
  FormBuilder,
  Validators,
  FormGroup,
} from '@angular/forms';

import {
  AlertController,
  ViewController,
  NavParams,
} from 'ionic-angular';


@Component({
  selector: 'assinatura-form',
  templateUrl: 'assinatura-form.html',
})
export class AssinaturaFormComponent implements OnInit {

  @Output()
  next = new EventEmitter();

  public responsavelForm: FormGroup;
  public atendimentoID: string;

  constructor(
    private fb: FormBuilder,
    private viewCtrl: ViewController,
    private navParams: NavParams,
    public alertCtrl: AlertController,
  ) {
    this.initiaForm();
    }

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

  emitNextEvent() {
    this.next.emit();
  }

  openAssinatura(valid) {
    valid && this.emitNextEvent();
    !valid && this.showAlert();
  }

  showAlert() {
    const alert = this.alertCtrl.create({
      title: 'Atenção!',
      // tslint:disable-next-line:max-line-length
      subTitle: 'Por favor, preencha os dados!',
      buttons: ['OK'],
    });
    alert.present();
  }

}
