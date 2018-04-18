import { Component, ViewChild } from '@angular/core';
import { IonicPage, Slides } from 'ionic-angular';

@Component({
  selector: 'client-data-page',
  templateUrl: 'client-data-page.html',
})
@IonicPage({
  name: 'DataClientPage',
})
export class ClientDataPage {

  @ViewChild(Slides) slides: Slides;

  constructor() { }

  ngAfterViewInit() {
    this.slides.lockSwipes(true);
  }


  goToSlide() {
    this.slides.lockSwipes(false);
    this.slides.slideNext(200);
    this.slides.lockSwipes(true);
  }

}

