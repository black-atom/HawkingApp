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
      name: 'Almoço',
      imgPath: 'assets/icon/restaurant.svg',
      pageType: 'ContentModalAlmoco',
    },
    {
      name: 'Abastecimento',
      imgPath: 'assets/icon/gas-station.svg',
      pageType: 'ContentModalAtendimento',
    },
    {
      name: 'Realponto',
      imgPath: 'assets/icon/realponto.svg',
      pageType: 'ContentModalAlmoco',
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
    const options = { cssClass : 'atividade-modal' };
    const popover = this.popoverCtrl.create(
      PopoverComponent,
      { buttonProperties: this.buttonProperties },
      options,
    );
    popover.present();
  }
}
