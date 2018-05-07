import { Component, OnInit, EventEmitter, Output, Input, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'form-faturamento',
  templateUrl: 'form-faturamento.html',
})
export class FormFaturamentoComponent  implements OnInit, OnDestroy{

  form: FormGroup;
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

  initForm({
    cnpj = '',
    razao_social = '',
    email = '',
    equipamentos= [],
  } = {}) {
    const getPecas = ({
      descricao = '',
      quantidade = 1,
      preco = 0,
    }= {}) => this.fb.group({
      descricao: [descricao, Validators.required],
      quantidade: [1, Validators.required],
      preco: [preco, Validators.required],
    });

    const getEquipamento = ({
      modelo_equipamento = '',
      numero_equipamento = '',
      pecas = [],
    } = {}) => this.fb.group({
      modelo_equipamento: [modelo_equipamento, Validators.required],
      numero_equipamento: [numero_equipamento, Validators.required],
      pecas: this.fb.array(pecas.map(getPecas)),
    });

    this.form = this.fb.group({
      cnpj: [cnpj, Validators.required],
      razao_social: [razao_social, Validators.required],
      email: [email, Validators.required],
      equipamentos: this.fb.array(equipamentos.map(getEquipamento)),
    });

    this.subscription = this.form
      .valueChanges
      .subscribe((values) => this.change.emit({
        formName: 'faturamento',
        formData: values,
        formValid: this.form.valid,
      }));
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
    (<FormArray>this.form.controls['equipamentos']);
    equipamentos.push(this.equipamentoControl());
  }


  removeEquipamento(index) {
    const equipamento: FormArray =
    (<FormArray>this.form.controls['equipamentos_com_troca_de_peca']);
    equipamento.removeAt(index);
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
}
