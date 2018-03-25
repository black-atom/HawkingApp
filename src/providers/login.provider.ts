import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

import { UserLogin } from './../models/login';
import { LoginState } from './../redux/models/loginState';

import API_URL from '../app/api';

@Injectable()
export class LoginProvider {

  private url = `${API_URL}/login`;

  constructor(private http: Http) {  }

  login(user: UserLogin): Observable<LoginState> {
    return this.http.post(this.url, user).map( res => res.json() as LoginState);
  }

}
