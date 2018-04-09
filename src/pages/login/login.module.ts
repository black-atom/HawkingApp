import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { IonicPageModule } from 'ionic-angular';

import { LoginPage } from './login';
import { ComponentsModule } from '../../components';

@NgModule({
  declarations: [
    LoginPage,
  ],
  imports: [
    ComponentsModule,
    FormsModule,
    IonicPageModule.forChild(LoginPage),
  ],
  entryComponents: [
    LoginPage,
  ],
})

export class LoginModule { }
