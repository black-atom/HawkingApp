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
} from 'ionic-angular';


@Component({
  selector: 'assinatura-form',
  templateUrl: 'assinatura-form.html',
})
export class AssinaturaFormComponent implements OnInit {

  @Output()
  next = new EventEmitter();

  @Output()
  save = new EventEmitter();

  public responsavelForm: FormGroup;
  public atendimentoID: string;

  constructor(
    private fb: FormBuilder,
    public alertCtrl: AlertController,
  ) {
    this.initiaForm();
  }

  ngOnInit(): void {
    this.initiaForm();
  }

  initiaForm() {
    this.responsavelForm = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(5)]],
      documento_id: ['', [Validators.required, Validators.minLength(9)]],
    });
  }

  emitNextEvent() {
    this.next.emit();
  }

  openAssinatura(valid, values) {
    valid && this.save.emit(values);
    valid && this.emitNextEvent();
    !valid && this.showAlert();
  }

  showAlert() {
    const alert = this.alertCtrl.create({
      title: 'Atenção!',
      subTitle: 'Por favor, preencha os dados!',
      buttons: ['OK'],
    });
    alert.present();
  }

}
