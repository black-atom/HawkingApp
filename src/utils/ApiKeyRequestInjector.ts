import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ApikeyReqInject implements HttpInterceptor {
  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler) : any {
    return Observable.of(localStorage.getItem('apiKey')).mergeMap((apiKey) => {
      const request = req.clone({ setHeaders: { apiKey } });
      return next.handle(request);
    })
    .catch((error) => {
      console.log('noApiKey', JSON.stringify(error));
      return next.handle(req);
    });
  }
}
