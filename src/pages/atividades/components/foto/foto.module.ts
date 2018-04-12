import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { FotoPage } from './foto';

@NgModule({
  declarations: [
    FotoPage,
  ],
  imports: [
    IonicPageModule.forChild(FotoPage),
  ],
  entryComponents: [
    FotoPage,
  ],
})

export class FotoModule { }
