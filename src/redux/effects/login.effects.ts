import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Rx';

import { Storage } from '@ionic/storage';

import { LoginSuccess, LoginFailed, LOGIN } from './../reducers/login.reducer';
import { LoginProvider } from '../../providers';

const storage = new Storage({});

@Injectable()
export class LoginEffects {

  constructor(
    private actions$: Actions,
    private loginProvider: LoginProvider,
  ) { }

@Effect() login$ = this.actions$
  .ofType(LOGIN)
  .map((action: any) => action.payload)
  .switchMap(payload => this.loginProvider
    .login(payload)
      .do(response => storage.set('token', response.token))
      .map(user => new LoginSuccess(user))
      .catch(err => Observable.of(new LoginFailed())),
  );
}





