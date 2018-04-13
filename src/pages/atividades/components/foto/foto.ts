import { AddFoto } from './../../../../redux/reducers/foto.reducer';
import { Component } from '@angular/core';
import { IonicPage, NavParams } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { Store } from '@ngrx/store';
import { State } from '../../../../redux/reducers';

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
    destinationType: this.camera.DestinationType.NATIVE_URI,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE,
    saveToPhotoAlbum: true,
    cameraDirection: 0,
    correctOrientation: true,
    targetWidth: 600,
    targetHeight: 800,
  };

  public photosStart = [
    {
      id: 1,
      tipo: 'inicio',
      src: 'assets/imgs/img-default.png',
    },
    {
      id: 2,
      tipo: 'inicio',
      src: 'assets/imgs/img-default.png',
    },
    {
      id: 3,
      tipo: 'inicio',
      src: 'assets/imgs/img-default.png',
    },
  ];
  public photosEnd = [
    {
      id: 1,
      tipo: 'fim',
      src: 'assets/imgs/img-default.png',
    },
    {
      id: 2,
      tipo: 'fim',
      src: 'assets/imgs/img-default.png',
    },
    {
      id: 3,
      tipo: 'fim',
      src: 'assets/imgs/img-default.png',
    },

  ];

  private atendimentoID;

  constructor(
    private camera: Camera,
    private navParams: NavParams,
    private store: Store<State>,
  ) {
    this.atendimentoID = this.navParams.get('atendimento_id');
  }

  changePicture(tipo) {
    this.camera.getPicture(this.options).then((imageData) => {
      this.store.dispatch(new AddFoto(this.atendimentoID, tipo, imageData));
    });
  }
}
