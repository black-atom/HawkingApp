import { Component } from '@angular/core';
import {
  ViewController,
  NavParams,
  ModalController,
} from 'ionic-angular';

import { ModalComponent } from '../modal/modal';


@Component({
  selector: 'popover',
  templateUrl: 'popover.html',
})
export class PopoverComponent {

  public buttonProperties = [];

  constructor(
    public navParms: NavParams,
    public viewCtrl: ViewController,
    public modalCtrl: ModalController,
  ) {
    this.buttonProperties = navParms.get('buttonProperties');
  }

  openModal(props) {
    const modal = this.modalCtrl.create(ModalComponent, { props });
    modal.present();
    this.close();
  }

  close() {
    this.viewCtrl.dismiss();
  }
}

