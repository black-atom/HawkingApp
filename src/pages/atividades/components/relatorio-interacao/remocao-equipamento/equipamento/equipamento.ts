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

import { ModalController } from 'ionic-angular';
import { EQUIPAMENTOS } from '../../../../../../utils/mocks/equipamentos';


@Component({
  selector: 'equipamento',
  templateUrl: 'equipamento.html',
})
export class EquipamentoComponent {

  @Input()
  equipamentoForm;

  @Output()
  removeEquipamentoEmitter =  new EventEmitter();

  public itensEquipamentoSelecionado = [];

  public equipamentos = EQUIPAMENTOS;

  constructor(
    private fb: FormBuilder,
    public modalCtrl: ModalController,
  ) { }

  itemControl() {
    return this.fb.group({
      descricao: ['', Validators.required],
      quantidade: [1, Validators.required],
    });
  }

  addItem(modeloEquipamento) {
    this.itensEquipamentoSelecionado = [];

    const equipamentoSelecionado =
      this.equipamentos.find(equipamento => equipamento.modelo === modeloEquipamento).itens;

    this.itensEquipamentoSelecionado = equipamentoSelecionado;

    const items = (<FormArray>this.equipamentoForm.controls['itens']);
    items.push(this.itemControl());

  }

  removeItem(index) {
    const items = (<FormArray>this.equipamentoForm.controls['itens']);
    items.removeAt(index);
  }

  resetItemsForm() {
    const items = (<FormArray>this.equipamentoForm.controls['itens']);
    items.value.forEach(() => items.removeAt(0));
  }

  removeEquipamento() {
    this.removeEquipamentoEmitter.emit();
  }

}


