import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { File, FileEntry, IFile } from '@ionic-native/file';

import { Foto } from './../models';
import api from '../app/api';


@Injectable()
export class FotoProvider {

  private url = `${api}/api/atendimentos`;

  constructor(
    private http: HttpClient,
    private readonly file: File,
  ) { }

  getFile(foto: Foto): Promise<IFile> {
    return new Promise((resolve, reject) => {
      this.file.resolveLocalFilesystemUrl(foto.pathToUpload)
        .then(entry => (<FileEntry>entry).file(file => resolve(file)))
        .catch(err => reject(err));
    });
  }

  getFormData(file: IFile, foto: Foto): Promise<FormData> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const formData = new FormData();
        const imgBlob = new Blob([reader.result], { type: file.type });
        formData.append('file', imgBlob, file.name);
        formData.append('tipo', foto.tipo);
        resolve(formData);
      };
      reader.readAsArrayBuffer(file);
    });
  }

  enviarFoto(foto: Foto) {
    return Observable.fromPromise(this.getFile(foto))
      .switchMap(file => Observable.fromPromise(this.getFormData(file, foto)))
      .switchMap(formData => this.http.post(`${this.url}/${foto.atendimentoID}/imagens`, formData))
      .catch(e => this.handleError(e));
  }

  handleError(error: Response | any) {
    console.error('error',JSON.stringify(error));
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json();
      const err = body || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    return Observable.throw(errMsg);
  }

}
