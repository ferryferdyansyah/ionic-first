import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

declare var google: any;

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor() { }

  geocode(position: {latitude: number, longitude: number}) : Observable<any> {
    return new Observable<any>(observer => {
      const geocoder = new google.maps.Geocoder();
      const latlng = new google.maps.LatLng(position.latitude, position.longitude)
      geocoder.geocode({location: latlng}, (results: any, status: any) => {
        console.log(status, results)
      })
    })
  }
}
