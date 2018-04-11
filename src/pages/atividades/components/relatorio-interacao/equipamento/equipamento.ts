import {
  Component,
  Input,
  EventEmitter,
  Output,
} from '@angular/core';
import {
  FormGroup,
  Validators,
  FormBuilder,
  FormArray,
} from '@angular/forms';

import { ModalController } from 'ionic-angular';

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

  public equipamentos = [{
    id: 1,
    modelo: 'Prisma R02',
    itens: [
      'Chave',
      'Fonte',
      'Bateria',
      'Pino da Bobina',
      'Bobina',
    ],
    pecas: [
      { id: 1, decricao: 'impressora', preco: 256.3 },
      { id: 2, decricao: 'pino da bobina', preco: 256.3 },
      { id: 3, decricao: 'leitor biometrico', preco: 256.3 },
      { id: 4, decricao: 'sensor da impresora', preco: 256.3 },
    ],
  },
  {
    id: 2,
    modelo: 'Orion 6B',
    itens: [
      'Lapis',
      'Caneta',
      'Borracha',
      'Caminhao',
      'cortina',
    ],
    pecas: [
      { id: 1, decricao: 'impressora', preco: 256.3 },
      { id: 2, decricao: 'pino da bobina', preco: 256.3 },
      { id: 3, decricao: 'leitor biometrico', preco: 256.3 },
      { id: 4, decricao: 'sensor da impresora', preco: 256.3 },
    ],
  }];

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


