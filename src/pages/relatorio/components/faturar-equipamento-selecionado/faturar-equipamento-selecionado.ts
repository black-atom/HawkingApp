import { Component, OnInit } from '@angular/core';
import { AlertController, IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, Validators, FormArray, FormGroup, FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { State } from './../../../../redux/reducers/';
import { equipamentosFaturamento } from './../../../../utils/mocks/equipamentos';
import { SaveFaturamentoEquipamento } from '../../../../redux/reducers/atendimento.reducer';

@IonicPage()
@Component({
  selector: 'page-faturar-equipamento-selecionado',
  templateUrl: 'faturar-equipamento-selecionado.html',
})
export class FaturarEquipamentoSelecionadoPage  implements OnInit {

  public equipamentos = equipamentosFaturamento;
  private equipamentoRecebido;
  public equipamentoSelecionado;
  public model: string = '';
  public numberEquipments: string = '';
  public formEquipment: FormGroup;
  public atividadeSelecionado;
  public tipoPage;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    private fb: FormBuilder,
    private store: Store<State>,
  ) { }

  ngOnInit() {
    this.equipamentoRecebido = this.navParams.get('equipamento');

    this.equipamentoSelecionado =
      this.equipamentos
        .find(equipamento => equipamento.descricao === this.equipamentoRecebido.descricao);

    this.atividadeSelecionado = this.navParams.get('atividade');
    this.initForm();
    this.recuperarEquipamento();
  }

  initForm() {
    this.formEquipment = this.fb.group({
      descricao: ['', [Validators.required]],
      modelo: ['', [Validators.required]],
      numero_equipamento: ['', [Validators.required]],
      problema: ['', [Validators.required]],
      solucao: ['', [Validators.required]],
      pecas: this.fb.array([]),
    });
  }

  recuperarEquipamento() {
    if (!this.equipamentoRecebido.id) {
      return;
    }

    const {
      descricao,
      modelo,
      numero_equipamento,
      problema,
      testes,
      pecas,
    } = this.equipamentoRecebido;
    this.formEquipment.get('descricao').patchValue(descricao);
    this.formEquipment.get('modelo').patchValue(modelo);
    this.formEquipment.get('numero_equipamento').patchValue(numero_equipamento);
    this.formEquipment.get('problema').patchValue(problema);
    this.formEquipment.get('solucao').patchValue(testes);
    this.model = modelo;
    this.numberEquipments = numero_equipamento;
    pecas.forEach(() => this.adicionarPecas());
    this.formEquipment.controls['pecas'].patchValue(pecas);
  }

  adicionarPecas() {
    const contatos: FormArray = <FormArray> this.formEquipment.get('pecas');
    contatos.push(this.fb.group({
      descricao : ['', [Validators.required]],
      quantidade : ['', [Validators.required]],
      foto : ['', [Validators.required]],
      preco: ['', [Validators.required]],
    }));
  }

  setModelEquipments(model) {
    this.formEquipment.get('descricao').patchValue(this.equipamentoSelecionado.descricao);
    this.formEquipment.get('modelo').patchValue(model);
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

  modifyPrice({ preco, foto, quantidade, descricao }, index) {
    const alert = this.alertCtrl.create();
    alert.setTitle('Alterar Preço do itens!');

    alert.addInput({
      type: 'text',
      label: 'Preço R$',
      value: preco,
      name: 'preco_alterado',
    });

    alert.addButton('Cancelar');
    alert.addButton({
      text: 'Ok',
      handler: ({ preco_alterado }) => {
        (<FormArray>this.formEquipment.controls['pecas']).at(index).patchValue({
          descricao,
          foto,
          quantidade,
          preco: preco_alterado,
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
      foto,
      preco,
    } = (<FormArray>this.formEquipment.controls['pecas']).at(index).value;

    (<FormArray>this.formEquipment.controls['pecas']).at(index).patchValue({
      descricao,
      foto,
      preco,
      quantidade: quantidade + 1,
    });
  }

  lessQuantity(index) {
    const {
      quantidade,
      descricao,
      foto,
      preco,
    } = (<FormArray>this.formEquipment.controls['pecas']).at(index).value;

    if (quantidade > 1) {
      (<FormArray>this.formEquipment.controls['pecas']).at(index).patchValue({
        descricao,
        foto,
        preco,
        quantidade: quantidade + -1,
      });
    }
  }

  saveOrEditEquipment(equipment) {
    this.store.dispatch(
      new SaveFaturamentoEquipamento(this.atividadeSelecionado.atendimento._id ,equipment),
    );
  }

  saveEquipment(equipment) {
    this.saveOrEditEquipment(equipment);
    this.goBackToPageDetail();
  }

  goBackToPageDetail() {
    const relatorioView  = this.navCtrl.getViews().find(nav => nav.name === 'RelatorioPage');
    this.navCtrl.popTo(relatorioView);
  }

}
