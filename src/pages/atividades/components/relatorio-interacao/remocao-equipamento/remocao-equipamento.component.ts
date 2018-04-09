import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'remocao-equipamento',
  templateUrl: 'remocao-equipamento.html',
})
export class RemocaoEquipamentoComponent implements OnInit {

  @Input()
  equipamentoForm: FormGroup;

  items = [];
  equipamentosItems = { A:[1,2,3], B:[1,2,3] };
  equipamentos = ['A', 'B'];

  constructor(
    private fb: FormBuilder,
  ) { }

  addEquipamentoItem(descricao) {
    // const formGroup = this.fb.group({
    //   descricao: [descricao, Validators.required],
    //   quantidade: [1, Validators.required],
    // });
    // this.equipamentoForm.controls.pecas.push(formGroup);
  }

  changeItens(values) {
    // let removeCount = 0;
    // this.equipamentoForm.get('pecas').value.forEach((peca, index) => {
    //   const found = values.find(item => item === peca.descricao);
    //   if (found === undefined) {
    //     this.equipamentoForm.get('pecas').removeAt(index - removeCount);
    //     removeCount++;
    //   }
    // });

    // values.forEach(descricao => {
    //   const found = this.equipamentoForm.get('pecas').value
    //     .find(peca => peca.descricao === descricao);
    //   if (found === undefined) {
    //     this.addEquipamentoItem(descricao);
    //   }
    // });
  }


  print() {
    console.log(this.items);
  }


  ngOnInit() {
    this.equipamentoForm.controls.modelo_equipamento.valueChanges
      .subscribe(equip => (this.items = this.equipamentosItems[equip] || []));
  }

}


