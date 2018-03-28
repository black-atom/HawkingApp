import { TabPage } from './tab-page';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { IonicPageModule } from 'ionic-angular';

import { ComponentsModule } from '../../components';

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
