import { FormGroup, Validators, FormBuilder } from '@angular/forms';
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

  ngOnInit() {
    this.showInput = Boolean(this.remocaoEquipamentoForm);
  }

  equipamentoControl() {
    return this.fb.group({
      modelo_equipamento: ['', Validators.required],
      numero_equipamento: ['', Validators.required],
      itens: this.fb.array([]),
    });
  }

  addEquipamento() {
    const equipamentos: any = this.remocaoEquipamentoForm;
    if (this.showInput) return equipamentos.push(this.equipamentoControl());
    return equipamentos.value.forEach(() => equipamentos.removeAt(0));
  }

  removeEquipamento(index) {
    const equipamento: any = this.remocaoEquipamentoForm;
    equipamento.removeAt(index);
  }

}


