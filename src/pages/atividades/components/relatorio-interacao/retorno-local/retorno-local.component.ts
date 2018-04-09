import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Component, Input, OnInit } from '@angular/core';
import { MOTIVOS_RETORNO_LOCAL } from '../../../../../utils/mocks';

@Component({
  selector: 'retorno-local',
  templateUrl: 'retorno-local.html',
})
export class RetornoLocalComponent implements OnInit {

  public showInput: boolean = false;
  public retornoLocalForm: FormGroup;
  public motivos = MOTIVOS_RETORNO_LOCAL;

  constructor(
    private fb: FormBuilder,
  ) { }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.retornoLocalForm = this.fb.group({
      motivo: [''],
    });
  }

  print() {
    // this.retornoLocalForm.get('motivo').disable();
    console.log(this.retornoLocalForm);
  }

  print1() {
    this.retornoLocalForm.get('motivo').reset();
  }
}


