import { TREINAMENTO_TOPICOS } from './treinamentoTopicos';
import { Component, OnInit, EventEmitter, Output, Input, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SOFTWARES } from './softwareList';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'form-treinamento',
  templateUrl: 'form-treinamento.html',
})
export class FormTreinamentoComponent  implements OnInit, OnDestroy{

  formTreinamento: FormGroup;
  subscription : Subscription;
  softwareList = SOFTWARES;
  treinamentoTopicos = TREINAMENTO_TOPICOS;

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
    topicos = [],
    software = '',
    caminho_rede = ''
  } = {}){
    this.formTreinamento = this.fb.group({
      topicos: [topicos],
      software: [software],
      caminho_rede: [caminho_rede],
    });

    this.subscription = this.formTreinamento
      .valueChanges
      .subscribe((values) => this.change.emit({
        formName: 'treinamento',
        formData: values,
        formValid: this.formTreinamento.valid,
      }));
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
}
