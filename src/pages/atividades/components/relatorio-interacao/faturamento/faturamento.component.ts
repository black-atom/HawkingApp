import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, Item, ItemSliding  } from 'ionic-angular';
import { FormArray, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'faturamento',
  templateUrl: 'faturamento.html',
})
export class FaturamentoComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
  ) { }

  ngOnInit() { }

}
