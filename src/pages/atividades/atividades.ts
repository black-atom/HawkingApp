import { Component } from '@angular/core';
import { PopoverController } from 'ionic-angular';
import { Observable, Subject } from 'rxjs/Rx';
import { Store } from '@ngrx/store';

import { Atendimento } from '../../models';
import { State } from '../../redux/reducers';

import {
  RetriveAtendimento,
  atendimentosPendentes,
  atendimentosEmAndamento,
} from '../../redux/reducers/atendimento.reducer';


import {
  filterAllAtividadesEmExecucao,
  filterAllAtividadesPausadas,
} from './../../redux/reducers/monitoramento.reducer';

import { PopoverComponent } from '../../components/popover/popover.component';
import { getAllAtividades } from '../../redux/reducers/monitoramento.reducer';

@Component({
  selector: 'atividades',
  templateUrl: 'atividades.html',
})
export class AtividadesPage {

  public title = 'Atividades';

  public atividades$: Observable<any[]>;
  public atividadesPausadas$;
  public atividadesEmExecucao$;
  public atividadesPendentes$;
  public atividadesConcluidas$;

  public changeAtendimentos$: Subject<string> = new Subject<string>();

  public buttonProperties = [
    {
      key: 'almoco',
      name: 'Almoço',
      imgPath: 'assets/icon/restaurant.svg',
      pageType: 'ContentModalMonitoramento',
      imageHeader: '',
      props: [
        {
          buttonName: 'km Inicial',
          inputType: 'number',
          message: 'Insira a quilometrangem do veículo para o deslocamento.',
        },
        {
          buttonName: 'km Final',
          inputType: 'number',
          message: 'Insira a quilometrangem do veículo para o deslocamento.',
        },
        {
          buttonName: 'Iniciar',
          inputType: 'btn',
          message: 'Deseja iniciar o Almoço.',
        },
        {
          buttonName: 'Finalizar',
          inputType: 'btn',
          message: 'Deseja finalizar o Almoço.',
        },
      ],
    },
    {
      key: 'abastecimento',
      name: 'Abastecimento',
      imgPath: 'assets/icon/gas-station.svg',
      pageType: 'ContentModalMonitoramento',
      imageHeader: '',
      props: [
        {
          buttonName: 'km Inicial',
          inputType: 'number',
          message: 'Insira a quilometrangem do veículo para o deslocamento.',
        },
        {
          buttonName: 'km Final',
          inputType: 'number',
          message: 'Insira a quilometrangem do veículo para o deslocamento.',
        },
        {
          buttonName: 'Iniciar',
          inputType: 'btn',
          message: 'Deseja iniciar o Abastecimento.',
        },
        {
          buttonName: 'Finalizar',
          inputType: 'btn',
          message: 'Deseja finalizar o Abastecimento.',
        },
      ],
    },
    {
      key: 'empresa',
      name: 'Realponto',
      imgPath: 'assets/icon/realponto.svg',
      pageType: 'ContentModalMonitoramento',
      imageHeader: '',
      props: [
        {
          buttonName: 'km Inicial',
          inputType: 'number',
          message: 'Insira a quilometrangem do veículo para o deslocamento.',
        },
        {
          buttonName: 'km Final',
          inputType: 'number',
          message: 'Insira a quilometrangem do veículo para o deslocamento.',
        },
      ],
    },
    {
      key: 'outros',
      name: 'Outros',
      imgPath: 'assets/icon/other.svg',
      pageType: 'ContentModalMonitoramento',
      imageHeader: '',
      props: [
        {
          buttonName: 'Descrição',
          inputType: 'text',
          message: 'Insira a descrição do deslocamento.',
        },
        {
          buttonName: 'km Inicial',
          inputType: 'number',
          message: 'Insira a quilometrangem do veículo para o deslocamento.',
        },
        {
          buttonName: 'km Final',
          inputType: 'number',
          message: 'Insira a quilometrangem do veículo para o deslocamento.',
        },
        {
          buttonName: 'Iniciar',
          inputType: 'btn',
          message: 'Deseja iniciar.',
        },
        {
          buttonName: 'Finalizar',
          inputType: 'btn',
          message: 'Deseja finalizar.',
        },
      ],
    },
  ];

  constructor(
    public popoverCtrl: PopoverController,
    private store: Store<State>,
  ) {
    this.atividades$ = this.store.select(getAllAtividades);
    this.atividadesPausadas$ = this.atividades$.map((atividades) => {
      return atividades.filter(filterAllAtividadesPausadas);
    });
    this.atividadesEmExecucao$ = this.atividades$.map((atividades) => {
      return atividades.filter(filterAllAtividadesEmExecucao);
    });
    this.atividadesPendentes$ = this.store.select(atendimentosPendentes);
  }

  ionViewDidLoad() {
    this.store.dispatch(new RetriveAtendimento());
  }

  eventRefresh() {
    this.store.dispatch(new RetriveAtendimento());
  }

  presentPopover() {
    const options = { cssClass : 'atividade-modal' };
    const popover = this.popoverCtrl.create(
      PopoverComponent,
      { buttonProperties: this.buttonProperties },
      options,
    );
    popover.present();
  }
}
