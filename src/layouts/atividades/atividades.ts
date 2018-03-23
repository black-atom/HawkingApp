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

  public segmentRoot: string = 'pendentes';

  public title = 'Atividades';
  public fabIcon = 'add';

  public atividades$: Observable<Atendimento[]>;
  public changeAtendimentos$: Subject<string> = new Subject<string>();

  public buttonProperties = [
    {
      name: 'Almoço',
      imgPath: 'assets/icon/restaurant.svg',
      pageType: '',
    },
    {
      name: 'Almoço',
      imgPath: 'assets/icon/restaurant.svg',
      pageType: '',
    },
    {
      name: 'Almoço',
      imgPath: 'assets/icon/restaurant.svg',
      pageType: '',
    },
    {
      name: 'Almoço',
      imgPath: 'assets/icon/restaurant.svg',
      pageType: '',
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
    this.swichtMapToGetAtividadesOfTab();
  }

  swichtMapToGetAtividadesOfTab () {
    this.store.dispatch(new RetriveAtendimento());
    switch (this.segmentRoot) {
      case 'pendentes':
        return this.atividades$ = this.store.select(atendimentosPendentes);
      case 'em-execucao':
        return this.atividades$ = this.store.select(atendimentosEmAndamento);
      default:
        return this.atividades$ = this.store.select(atendimentosPendentes);
    }
  }

  presentPopover() {
    const popover = this.popoverCtrl.create(
      PopoverComponent,
      { buttonProperties: this.buttonProperties },
    );
    popover.present();
  }
}
