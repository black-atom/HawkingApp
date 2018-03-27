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
  public fabIcon = 'add';

  public atividades$: Observable<any[]>;
  public atividadesPausadas$;
  public atividadesEmExecucao$;
  public atividadesPendentes$;

  public changeAtendimentos$: Subject<string> = new Subject<string>();
  public buttonProperties = [
    {
      name: 'Almoço',
      imgPath: 'assets/icon/restaurant.svg',
      pageType: 'ContentModalAlmocoAbastecimentoEmpresa',
    },
    {
      name: 'Abastecimento',
      imgPath: 'assets/icon/gas-station.svg',
      pageType: 'ContentModalAlmocoAbastecimentoEmpresa',
    },
    {
      name: 'Realponto',
      imgPath: 'assets/icon/realponto.svg',
      pageType: 'ContentModalAlmocoAbastecimentoEmpresa',
    },
    {
      name: 'Outros',
      imgPath: 'assets/icon/other.svg',
      pageType: 'ContentModalOutros',
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
    const popover = this.popoverCtrl.create(
      PopoverComponent,
      { buttonProperties: this.buttonProperties },
    );
    popover.present();
  }
}
