import { Component, ViewChild, OnInit } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Store } from '@ngrx/store';
import { State } from '../redux/reducers';
import { isLogged } from '../redux/reducers/login.reducer';


@Component({
  templateUrl: 'app.html',
})
export class MyApp implements OnInit {

  rootPage: any;

  constructor(
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    private store: Store<State>,
  ) {
    this.store.select(isLogged)
      .subscribe((isLogged) => {
        this.rootPage = isLogged ?
          'TabPage' : 'LoginPage';
      });
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.backgroundColorByHexString('#0E91D8');
      this.splashScreen.hide();
    });
  }

  ngOnInit() {
    this.initializeApp();
  }

}
