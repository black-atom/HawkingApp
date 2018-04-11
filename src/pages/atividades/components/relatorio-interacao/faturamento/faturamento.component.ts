import { Component, OnInit, Input } from '@angular/core';
import { IonicPage, NavController, Item, ItemSliding  } from 'ionic-angular';
import { FormArray, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'faturamento',
  templateUrl: 'faturamento.html',
})
export class FaturamentoComponent implements OnInit {

  @Input()
  public faturamentoForm: FormGroup;

  public showInput: boolean = false;

  constructor(
    private fb: FormBuilder,
  ) { }

  ngOnInit() { }

}
