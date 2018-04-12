import { Component, Input } from '@angular/core';
import { IonicPage, NavController, Item, ItemSliding  } from 'ionic-angular';
import { FormArray, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'faturamento',
  templateUrl: 'faturamento.html',
})
export class FaturamentoComponent {

  @Input()
  public faturamentoForm: FormGroup;

  @Input()
  public dadosCliente;

  public showInput: boolean = false;
  public showFaturamento: boolean = false;
  public showInputFaturamento: boolean = false;

  constructor(
    private fb: FormBuilder,
  ) {
    console.log(this.dadosCliente);
  }

  equipamentoControl() {
    return this.fb.group({
      modelo_equipamento: ['', Validators.required],
      numero_equipamento: ['', Validators.required],
      pecas: this.fb.array([]),
    });
  }

  addEquipamento() {
    const equipamentos: FormArray =
    (<FormArray>this.faturamentoForm.controls['equipamentos_com_troca_de_peca']);
    if (this.showFaturamento) return equipamentos.push(this.equipamentoControl());
    return equipamentos.value.forEach(() => equipamentos.removeAt(0));
  }


  removeEquipamento(index) {
    const equipamento: FormArray =
    (<FormArray>this.faturamentoForm.controls['equipamentos_com_troca_de_peca']);
    equipamento.removeAt(index);
  }

}
