import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';

import {
  TOPICOS_DETALHES_TREINAMENTO } from './../../../../utils/mocks/topicos-detalhes-treinamento';
import { MOTIVOS_RETORNO_LOCAL } from './../../../../utils/mocks/motivos-retorno-local';
import { SOFTWARES } from './../../../../utils/mocks/softwares';
import { EQUIPAMENTOS } from './../../../../utils/mocks/equipamentos';

@Component({
  selector: 'relatorio-interacao',
  templateUrl: 'relatorio-interacao.html',
})
export class RelatorioInteracaoPage {

  public equipamentos = EQUIPAMENTOS;
  public softwares = SOFTWARES;
  public motivosRetornoLocal = MOTIVOS_RETORNO_LOCAL;
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
