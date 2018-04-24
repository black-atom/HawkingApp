import {
  Component,
  Input,
  EventEmitter,
  Output,
} from '@angular/core';
import {
  Validators,
  FormBuilder,
  FormArray,
} from '@angular/forms';

import { EQUIPAMENTOS } from '../../../../../../utils/mocks/index';


@Component({
  selector: 'equipamento-faturamento',
  templateUrl: 'equipamento-faturamento.html',
})
export class EquipamentoFaturamentoComponent {

  @Input()
  equipamentoForm;

  @Output()
  removeEquipamentoEmitter =  new EventEmitter();

  public itensEquipamentoSelecionado = [];

  public equipamentos = EQUIPAMENTOS;

  constructor(
    private fb: FormBuilder,
  ) {

  }

  itemControl() {
    return this.fb.group({
      descricao: ['', Validators.required],
      quantidade: [1, Validators.required],
      preco: [0, Validators.required],
    });
  }

  addItem(modeloEquipamento) {
    this.itensEquipamentoSelecionado = [];

    const equipamentoSelecionado =
      this.equipamentos.find(equipamento => equipamento.modelo === modeloEquipamento).pecas;

    this.itensEquipamentoSelecionado = equipamentoSelecionado;

    const items = (<FormArray>this.equipamentoForm.controls['pecas']);
    items.push(this.itemControl());

  }

  removeItem(index) {
    const items = (<FormArray>this.equipamentoForm.controls['pecas']);
    items.removeAt(index);
  }

  resetItemsForm() {
    const items = (<FormArray>this.equipamentoForm.controls['pecas']);
    items.value.forEach(() => items.removeAt(0));
  }

  removeEquipamento() {
    this.removeEquipamentoEmitter.emit();
  }
}


