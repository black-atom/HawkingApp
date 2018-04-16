import { Component } from '@angular/core';
import { NavController, IonicPage } from 'ionic-angular';
import { Store } from '@ngrx/store';
import { LoginState } from '../../redux/models/loginState';
import { Login } from './../../redux/reducers/login.reducer';


@Component({
  selector: 'login',
  templateUrl: 'login.html',
})
@IonicPage({
  name: 'LoginPage',
})
export class LoginPage {

  public title: string = 'Login';
  public username: string = '';
  public password: string = '';

  constructor(
    public navCtrl: NavController,
    private store: Store<LoginState>,
  ) { }

  login() {
    const parserUserLowerCase = this.username.toLocaleLowerCase();
    this.store.dispatch(new Login({ username: parserUserLowerCase, password: this.password }));
  }
}
