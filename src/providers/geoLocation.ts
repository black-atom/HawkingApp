import { Injectable } from '@angular/core';
import {
  BackgroundGeolocation,
  BackgroundGeolocationResponse,
  BackgroundGeolocationConfig,
} from '@ionic-native/background-geolocation';

@Injectable()
export class LocationProvider {
  constructor(private backgroundGeolocation: BackgroundGeolocation) {  }

  public startTracking () {
    const config: BackgroundGeolocationConfig = {
      desiredAccuracy: 10,
      stationaryRadius: 10,
      distanceFilter: 10,
      url: '204.48.20.120:5000/locations',
      maxLocations: 1000,
      interval: 60000,
      fastestInterval: 5000,
      activitiesInterval: 10000,
      startOnBoot: true,
      syncThreshold: 10,
      httpHeaders: {
        'TECNICO-ID': localStorage.getItem('tecnico_id'),
        'X-FOO': 'bar',
      },
    };
    this.backgroundGeolocation.configure(config)
      .subscribe((location: BackgroundGeolocationResponse) => {
        console.log(JSON.stringify(location));
      });

    this.backgroundGeolocation.start();
  }

}
