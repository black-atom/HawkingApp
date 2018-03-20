import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

import { UserLogin } from './../models/login';
import { LoginState } from './../redux/models/loginState';

@Injectable()
export class LoginProvider {
  private url = 'http://165.227.78.113:3000/login';

  constructor(private http: Http) {  }

  login(user: UserLogin): Observable<LoginState>{
    return this.http.post(this.url, user).map( res => res.json() as LoginState);
  }

}
