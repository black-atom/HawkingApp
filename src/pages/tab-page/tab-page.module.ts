import { TabPage } from './tab-page';
import { NgModule } from '@angular/core';

import { IonicPageModule } from 'ionic-angular';


@NgModule({
  declarations: [
    TabPage,
  ],
  imports: [
    IonicPageModule.forChild(TabPage),
  ],
  entryComponents: [
    TabPage,
  ],
})

export class TabPageModule { }
