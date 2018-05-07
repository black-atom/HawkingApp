import { Component, OnInit, EventEmitter, Output, Input, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { MOTIVOS_RETORNO_LOCAL } from './motivos';

@Component({
  selector: 'form-resumo',
  templateUrl: 'form-resumo.html',
})
export class FormResumoComponent  implements OnInit, OnDestroy{

  form: FormGroup;
  subscriptions : Subscription[] = [];
  public motivos = MOTIVOS_RETORNO_LOCAL;

  @Input()
  initialData;

  @Output()
  change = new EventEmitter();

  constructor(
    private fb: FormBuilder,
  ) {}

  ngOnInit(): void {
    this.initForm(this.initialData);
  }

  initForm({
    motivo_retorno = '',
    resumo_atendimento = '',
  } = {}){
    this.form = this.fb.group({
      motivo_retorno: [motivo_retorno],
      resumo_atendimento: [resumo_atendimento],
    });

    const sub1 = this.form
      .get('motivo_retorno')
      .valueChanges
      .subscribe((values) => this.change.emit({
        formName: 'motivo_retorno',
        formData: values,
        formValid: this.form.valid,
      }));

    const sub2 = this.form
      .get('resumo_atendimento')
      .valueChanges
      .subscribe((values) => this.change.emit({
        formName: 'resumo_atendimento',
        formData: values,
        formValid: this.form.valid,
      }));

    this.subscriptions = [sub1, sub2];
  }

  ngOnDestroy(){
    //this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
