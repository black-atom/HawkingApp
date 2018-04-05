import { Component } from '@angular/core';
import { NavController, NavParams, PopoverController } from 'ionic-angular';
import { Observable } from 'rxjs/Rx';
import { Store } from '@ngrx/store';

import { State } from './../../redux/reducers';
import {
getAllAtividades,
filterAtividadeByID,
filterAtividadeEmExecucao,
} from './../../redux/reducers/monitoramento.reducer';

import { TabPage } from './../../pages/tab-page/tab-page';
import { FormModalComponent } from './../form-modal/form-modal.component';
import { buttonProperties } from '../../utils/ButtonProperties';

@Component({
  selector: 'modal-monitoramento',
  templateUrl: 'modal-monitoramento.html',
})
export class ModalMonitoramento {

  public pageType;
  public atividades$: Observable<any[]>;
  public atividadeEmExecucao$;
  public atividadeId;

  constructor(
    public navParms: NavParams,
    public navCtrl: NavController,
    public popoverCtrl: PopoverController,
    private store: Store<State>,
  ) {
    this.pageType = navParms.get('props');

    this.atividades$ = this.store.select(getAllAtividades);

    this.atividadeEmExecucao$ = this.atividades$.map((atividades) => {

      const findAtividade = atividades.find(filterAtividadeEmExecucao);

      const foundAtividade =
        findAtividade ? findAtividade : atividades.find(filterAtividadeByID(this.pageType.uuid));

      this.atividadeId = findAtividade ? findAtividade.uuid : this.pageType.uuid;

      return foundAtividade;

    });
  }


  presentPopover(propsButton) {
    const uuid = this.atividadeId;
    const props = {
      uuid,
      ...propsButton,
      key: this.pageType.key,
      name: this.pageType.name,
    };

    const options = { cssClass : 'form-modal' };
    const popover = this.popoverCtrl.create(
      FormModalComponent,
      { props },
      options,
    );
    popover.present();
  }

  close() {
    this.navCtrl.setRoot(TabPage);
  }
}
