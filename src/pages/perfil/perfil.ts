import { Component } from '@angular/core';
import { NavController, IonicPage } from 'ionic-angular';
import { Store } from '@ngrx/store';

import { Login } from './../../redux/reducers/login.reducer';
import { LoginState } from './../../redux/models/loginState';

@Component({
  selector: 'perfil',
  templateUrl: 'perfil.html',
})
@IonicPage({
  name: 'PerfilPage',
})
export class PerfilPage {

  public title: string = 'Perfil';
  public user$;

  constructor(
    public navCtrl: NavController,
    private store: Store<LoginState>,
  ) {
    this.user$ = this.store.select('login');
  }

}
