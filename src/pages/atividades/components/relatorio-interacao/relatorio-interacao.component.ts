import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';

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

  public equipamentos = EQUIPAMENTOS;
  public funcinarios = FUNCIONARIOS;
  public motivosRetornoLocal = MOTIVOS_RETORNO_LOCAL;
  public softwares = SOFTWARES;
  public topicosDetalhesTreinamento = TOPICOS_DETALHES_TREINAMENTO;

  public relatorioInteracao: any = {
    resumoAtendimento: '',
    relatorioAtendimento: '',
    retornoLocal: {
      retorno: false,
      motivo: '',
    },
    detalhesTreinamento: {
      houveTreinamento: false,
      topicos: [],
      software: '',
      caminho: '',
    },
    remocaoRelogio: {
      houveRemocaoRelogio: false,
      equipamento: 'MESMO RELÓGIO',
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

  teste() {
    console.log(this.equipamentos);
  }

  constructor(
  ) {  }
}
