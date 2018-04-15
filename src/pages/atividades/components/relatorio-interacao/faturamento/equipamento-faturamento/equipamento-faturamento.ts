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
      { id: 1, descricao: 'impressora', preco: 256.3 },
      { id: 2, descricao: 'pino da bobina', preco: 256.3 },
      { id: 3, descricao: 'leitor biometrico', preco: 256.3 },
      { id: 4, descricao: 'sensor da impresora', preco: 256.3 },
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
      { id: 1, descricao: 'impressora', preco: 256.3 },
      { id: 2, descricao: 'pino da bobina', preco: 256.3 },
      { id: 3, descricao: 'leitor biometrico', preco: 256.3 },
      { id: 4, descricao: 'sensor da impresora', preco: 256.3 },
    ],
  }];

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


