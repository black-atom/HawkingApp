import { Observable } from 'rxjs/Rx';
import { AddFoto, getAllFotos } from './../../../../redux/reducers/foto.reducer';
import { Component } from '@angular/core';
import { IonicPage, NavParams, normalizeURL } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { Store } from '@ngrx/store';
import { State } from '../../../../redux/reducers';
import { Foto } from '../../../../models';
import { File, DirectoryEntry, FileEntry } from '@ionic-native/file';
import { DomSanitizer } from '@angular/platform-browser';


interface FotoItem extends Foto {
  canClick: boolean;
}

@Component({
  selector: 'foto',
  templateUrl: 'foto.html',
})
@IonicPage({
  name: 'FotoPage',
})

export class FotoPage {

  private options: CameraOptions = {
    quality: 80,
    destinationType: this.camera.DestinationType.FILE_URI,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE,
    saveToPhotoAlbum: true,
    cameraDirection: 0,
    correctOrientation: true,
    targetWidth: 600,
    targetHeight: 800,
  };

  public photosStart: Observable<FotoItem[]>;
  public photosEnd: Observable<FotoItem[]>;
  public blockAction = false;

  private atendimentoID;

  constructor(
    private camera: Camera,
    private navParams: NavParams,
    private store: Store<State>,
    private file: File,
    public sanitizer: DomSanitizer,
  ) {
    this.atendimentoID = this.navParams.get('atendimento_id');
    this.photosStart = this.getFotosPorTipo('inicio_atedimento', this.atendimentoID);
    this.photosEnd = this.getFotosPorTipo('fim_atedimento', this.atendimentoID);
  }

  getFotosPorTipo(tipo, atendimentoID) {
    const fotoToFotoItem = (foto): FotoItem =>
      ({
        ...foto,
        localPath: this.sanitizer.bypassSecurityTrustResourceUrl(foto.localPath),
        canClick: false,
      });

    const totalFotosPorTipo  = 3;

    return this.store.select(getAllFotos)
      .map(fotos => fotos.filter(foto => foto.atendimentoID === atendimentoID
        && foto.tipo === tipo,
      ))
      .map(fotos => fotos.map(fotoToFotoItem))
      .map((fotos) => {
        const newFotos = [...fotos];
        for (let i = newFotos.length; i < totalFotosPorTipo; i += 1) {
          newFotos.push({
            tipo,
            canClick: true,
            localPath: 'assets/imgs/img-default.png',
          });
        }
        return newFotos;
      });
  }


  changePicture(tipo) {
    this.camera.getPicture(this.options)
    .then((imagePath) => {
      this.blockAction = true;
      if (imagePath) {
        this.file.resolveLocalFilesystemUrl(imagePath)
        .then(entry => (<FileEntry>entry).file((file) => {
          this.store.dispatch(new AddFoto(this.atendimentoID, tipo, file.localURL, imagePath));
          this.blockAction = false;
        }))
        .catch(() => this.blockAction = false);
      }
    });
  }
}
