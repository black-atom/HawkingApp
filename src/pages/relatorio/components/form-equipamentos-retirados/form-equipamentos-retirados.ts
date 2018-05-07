import { EquipamentoComponent } from './equipamento/equipamento';
import { Component, OnInit, EventEmitter, Output, Input, OnDestroy } from '@angular/core';
import { FormBuilder, Validators, FormArray } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'form-equipamentos-retirados',
  templateUrl: 'form-equipamentos-retirados.html',
})
export class FormEquipamentosRetiradosComponent  implements OnInit, OnDestroy{

  form: FormArray;
  subscription : Subscription;

  @Input()
  initialData;

  @Output()
  change = new EventEmitter();

  constructor(
    private fb: FormBuilder,
  ) {}

  ngOnInit(): void {
    this.initForm(this.initialData);
  }

  initForm(equipamentos = []){
    const getItem = ({
      descricao = '',
      quantidade = 0,
    } = {}) => this.fb.group({
      descricao: [descricao, Validators.required],
      quantidade: [quantidade, Validators.required],
    });

    const getEquipamentos = ({
      modelo_equipamento = '',
      numero_equipamento = '',
      itens = [],
    }) => this.fb.group({
      modelo_equipamento: [modelo_equipamento, Validators.required],
      numero_equipamento: [numero_equipamento, Validators.required],
      itens: this.fb.array(itens.map(getItem)),
    });

    this.form = this.fb.array(equipamentos.map(getEquipamentos));
    this.subscription = this.form
      .valueChanges
      .subscribe((values) => this.change.emit({
        formName: 'equipamentos_retirados',
        formData: values,
        formValid: this.form.valid,
      }));
  }

  equipamentoControl() {
    return this.fb.group({
      modelo_equipamento: ['', Validators.required],
      numero_equipamento: ['', Validators.required],
      itens: this.fb.array([]),
    });
  }

  addEquipamento() {
    const equipamentos: any = this.form;
    equipamentos.push(this.equipamentoControl());
  }

  removeEquipamento(index) {
    const equipamento: any = this.form;
    equipamento.removeAt(index);
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
}
