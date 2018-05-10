import { Component, OnInit } from '@angular/core';
import { AlertController, IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, Validators, FormArray, FormGroup, FormControl } from '@angular/forms';


@IonicPage()
@Component({
  selector: 'page-equipamento-selecionado',
  templateUrl: 'equipamento-selecionado.html',
})
export class EquipamentoSelecionadoPage implements OnInit {

  public equipamentoSelecionado;
  public model: string = '';
  public numberEquipments: string = '';
  public formEquipment: FormGroup;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    private fb: FormBuilder,
  ) { }

  ngOnInit() {
    this.equipamentoSelecionado = this.navParams.get('equipamento');
    this.initForm();
  }

  initForm() {
    this.formEquipment = this.fb.group({
      modelo_equipamento: ['', [Validators.required]],
      numero_equipamento: ['', [Validators.required]],
      problema: ['', [Validators.required]],
      testes_efetuados: ['', [Validators.required]],
      pecas: this.fb.array([]),
    });
  }

  setModelEquipments(model) {
    const modeloEquipamento = `${this.equipamentoSelecionado.descricao} ${model}`;
    this.formEquipment.get('modelo_equipamento').patchValue(modeloEquipamento);
    this.model = model;
  }

  showCheckbox() {
    const alert = this.alertCtrl.create();
    alert.setTitle('Selecione os itens!');

    this.equipamentoSelecionado.pecas.map((peca) => {
      return  alert.addInput({
        type: 'checkbox',
        label: peca.descricao,
        value: peca,
      });
    });


    alert.addButton('Cancelar');
    alert.addButton({
      text: 'Ok',
      handler: (data) => {
        const pecas = data.map((peca) => {
          const quantidade = 1;
          const control = <FormArray>this.formEquipment.controls['pecas'];
          control.push(new FormControl({ ...peca, quantidade }));
        });
      },
    });
    alert.present();
  }

  get pecas(): FormArray {
    return this.formEquipment.get('pecas') as FormArray;
  }

  deleteItem(index) {
    this.pecas.removeAt(index);
  }

  moreQuantity(index) {
    const {
      quantidade,
      descricao,
      foto ,
    } = (<FormArray>this.formEquipment.controls['pecas']).at(index).value;

    (<FormArray>this.formEquipment.controls['pecas']).at(index).patchValue({
      descricao,
      foto,
      quantidade: quantidade + 1,
    });
  }

  lessQuantity(index) {
    const {
      quantidade,
      descricao,
      foto ,
    } = (<FormArray>this.formEquipment.controls['pecas']).at(index).value;

    if (quantidade > 1) {
      (<FormArray>this.formEquipment.controls['pecas']).at(index).patchValue({
        descricao,
        foto,
        quantidade: quantidade + -1,
      });
    }
  }

  saveEquipment(equipment) {
    console.log('=======>', equipment);
  }

}
