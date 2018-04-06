import { Component } from '@angular/core';
import { IonicPage, NavController, Item, ItemSliding  } from 'ionic-angular';
import { FormArray, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import {
  EQUIPAMENTOS,
  FUNCIONARIOS,
  MOTIVOS_RETORNO_LOCAL,
  SOFTWARES,
  TOPICOS_DETALHES_TREINAMENTO,
} from './../../../../utils/mocks';


@Component({
  selector: 'relatorio-interacao',
  templateUrl: 'relatorio-interacao.html',
})
export class RelatorioInteracaoPage {

  // public equipamentos = EQUIPAMENTOS;
  public funcinarios = FUNCIONARIOS;
  public motivosRetornoLocal = MOTIVOS_RETORNO_LOCAL;
  public softwares = SOFTWARES;
  public equipamentoSelecionado;
  public allEquipamentosSelecionado = [];
  public topicosDetalhesTreinamento = TOPICOS_DETALHES_TREINAMENTO;
  public form: FormGroup;


  public equipamentosMock = ['A', 'B','C'];
  public equipamentoItems = {
    A: [
      'Caneta',
      'Lapis',
      'Camisinha',
    ],
    B: [
      'Caneta',
      'Lapis',
      'Camisinha',
    ],
    C: [
      'Caneta',
      'Lapis',
      'Camisinha',
    ],
  };

  public relatorioInteracao: any = {
    resumoAtendimento: '',
    retornoLocal: {
      retorno: false,
      motivo: '',
    },
    detalhesTreinamento: {
      houveTreinamento: false,
      topicos: [],
      software: '',
      caminhoRede: '',
    },
    remocaoEquipamento: {
      houveRemocaoEquipamento: false,
      equipamentos: [
        {
          nome: 'MESMO RELÓGIO',
          itens: [],
        },
      ],
    },
    faturamento: {
      mesmoCnpj: false,
      cnpj: '',
      razaoSocial: '',
      email: '',
      quemAprovou: '',
      valor: '',
      prazoPagamento: '',
    },
  };

  items = [];

  constructor(private fb: FormBuilder) {
    this.initForm();
  }


  initForm() {
    this.form = new FormGroup({
      equipamentos: new FormArray([]),
    });
    this.addItem();
  }

  get ItemsEquipamento() {
    return [1,2,3,4];
  }
  equipamento() {
    return this.fb.group({
      modelo_equipamento: ['A', Validators.required],
      numero_equipamento: ['', Validators.required],
      pecas: this.fb.array([]),
    });
  }

  print() {
    console.log(this.relatorioInteracao);
  }

  addItem() {
    const equipamentos: FormArray = <FormArray>this.form.get('equipamentos');
    equipamentos.push(this.equipamento());
  }

  get equipamentos(): FormArray {
    return this.form.get('equipamentos') as FormArray;
  }

  removerEquipamento(list, index) {
    list.splice(index,1);
  }

}

interface Equipamento {
  nome: string;
  itens: string[];
}
