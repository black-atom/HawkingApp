import { Component, Output, EventEmitter } from '@angular/core';
import { ViewController, NavParams, NavController, ModalController } from 'ionic-angular';

import { ModalComponent } from '../modal/modal';


@Component({
  selector: 'popover',
  templateUrl: 'popover.html',
})
export class PopoverComponent {

  public buttonProperties = [];

  @Output()
  actionButtonPopover = new EventEmitter();

  constructor(
    public viewCtrl: ViewController,
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public navParms: NavParams,
  ) {
    this.buttonProperties = navParms.get('buttonProperties');
  }

  openModal(pageType) {
    const modal = this.modalCtrl.create(ModalComponent, { pageType });
    modal.present();
  }

  close() {
    this.viewCtrl.dismiss();
  }
}

