import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Observable } from 'rxjs/Observable';

const storage = new Storage({});

@Injectable()
export class ApikeyReqInject implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler) : any {
    const getPromise = storage.get('apiKey');
    return Observable.fromPromise(getPromise).mergeMap((apiKey) => {
      const request = req.clone({ setHeaders: { apiKey } });
      return next.handle(request);
    })
    .catch(() => {
      return next.handle(req);
    });
  }
}
