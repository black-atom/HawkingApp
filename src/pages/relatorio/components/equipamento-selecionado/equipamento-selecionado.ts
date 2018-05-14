import { Equipamentos } from './../../../../models/atendimento';
import { ClientDataPage } from './../../../client-data/client-data-page';
import { Component, OnInit } from '@angular/core';
import { AlertController, IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, Validators, FormArray, FormGroup, FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { State } from '../../../../redux/reducers';
import {
  SaveRemoveEquipamento,
  EditarRemoveEquipamento,
} from './../../../../redux/reducers/atendimento.reducer';
import { RelatorioPage } from './../../relatorio';
import { relogiosMock } from '../../../../utils/mocks/equipamentos';

@IonicPage()
@Component({
  selector: 'page-equipamento-selecionado',
  templateUrl: 'equipamento-selecionado.html',
})
export class EquipamentoSelecionadoPage implements OnInit {

  public equipamentos = relogiosMock;
  private equipamentoRecebido;
  public equipamentoSelecionado;
  public model: string = '';
  public numberEquipments: string = '';
  public formEquipment: FormGroup;
  public atividadeSelecionado;
  public tipoPage;

  page = RelatorioPage;

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
    this.tipoPage = this.navParams.get('tipoPage');
    this.initForm();
    this.recuperarEquipamento();
  }

  initForm() {
    this.formEquipment = this.fb.group({
      descricao: ['', [Validators.required]],
      modelo: ['', [Validators.required]],
      numero_equipamento: ['', [Validators.required]],
      problema: ['', [Validators.required]],
      testes: ['', [Validators.required]],
      pecas: this.fb.array([]),
    });
  }

  recuperarEquipamento() {
    if (!this.equipamentoRecebido.numero_equipamento) {
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
    this.formEquipment.get('testes').patchValue(testes);
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
      foto,
    } = (<FormArray>this.formEquipment.controls['pecas']).at(index).value;

    if (quantidade > 1) {
      (<FormArray>this.formEquipment.controls['pecas']).at(index).patchValue({
        descricao,
        foto,
        quantidade: quantidade + -1,
      });
    }
  }

  saveOrEditEquipmentsRetirado(equipment) {
    if (this.equipamentoRecebido.id) {
      const { id } = this.equipamentoRecebido;
      this.store.dispatch(new EditarRemoveEquipamento(
        this.atividadeSelecionado.atendimento._id,
        {
          ...equipment,
          id,
          foto: this.equipamentoSelecionado.foto,
          key: this.equipamentoSelecionado.key,
        },
      ));

      return this.navPageDetail();
    }

    this.store.dispatch(
      new SaveRemoveEquipamento(
        this.atividadeSelecionado.atendimento._id,
        {
          ...equipment,
          foto: this.equipamentoSelecionado.foto,
          key: this.equipamentoSelecionado.key,
        },
      ),
    );


    return this.navPageDetail();
  }

  saveOrEditEquipmentsFaturar(equipment) {

  }

  saveEquipment(equipment) {
    if (this.tipoPage === 'retirar') {
      return this.saveOrEditEquipmentsRetirado(equipment);
    }
    return this.saveOrEditEquipmentsFaturar(equipment);
  }

  navPageDetail() {
    const indexPageForm = {
      retirar: 1,
      faturar: 2,
    };

    this.navCtrl.push(this.page, {
      atividade: this.atividadeSelecionado,
      tipoPage: indexPageForm[this.tipoPage],
    });

  }

}
