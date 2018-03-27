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

import { PopoverComponent } from '../../components/popover/popover.component';

@Component({
  selector: 'atividades',
  templateUrl: 'atividades.html',
})
export class AtividadesPage {

  public title = 'Atividades';

  public atividades$: Observable<Atendimento[]>;
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

  }

  ionViewDidLoad() {
    this.store.dispatch(new RetriveAtendimento());
  }

  eventRefresh() {
    this.store.dispatch(new RetriveAtendimento());
    this.atividades$ = this.store.select(atendimentosPendentes);
  }

  presentPopover() {
    const popover = this.popoverCtrl.create(
      PopoverComponent,
      { buttonProperties: this.buttonProperties },
    );
    popover.present();
  }
}
