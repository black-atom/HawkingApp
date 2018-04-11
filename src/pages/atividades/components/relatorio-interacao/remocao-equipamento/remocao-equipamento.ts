import { FormGroup, Validators, FormBuilder, FormArray } from '@angular/forms';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'remocao-equipamento',
  templateUrl: 'remocao-equipamento.html',
})
export class RemocaoEquipamentoComponent implements OnInit {

  @Input()
  public remocaoEquipamentoForm: FormGroup;

  public showInput: boolean = false;

  constructor(
    private fb: FormBuilder,
  ) { }

  ngOnInit() {  }

}


