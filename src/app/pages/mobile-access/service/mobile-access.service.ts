import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { BaseService, ServiceParameters } from 'src/app/core/service/base-service/base.service';

import { MGeoCoordinates } from 'src/app/core/model/geolocation/geocoordinates.interface';
import { MMobileLocationInfo, MActivateMobileLocationResult } from '../model/mobile-access.interface';


@Injectable({
  providedIn: 'root'
})
export class MobileAccessService extends BaseService {

  private serviceUrl = '/json/commerce';

  /**
    * Retrieve Mobile Access locations for user
    *
    * @param geoData   Geolocation data for user. null if none exists
    */
  getMobileLocations(geoData: MGeoCoordinates): Observable<MMobileLocationInfo[]> {

    return Observable.create((observer: any) => {

      let geoDataParam: MGeoCoordinates = {
        coords: {
          latitude: null,
          longitude: null,
          accuracy: null
        }
      };

      if (!(geoData == null || geoData.coords == null || geoData.coords.latitude == null || geoData.coords.longitude == null)) {
        geoDataParam = geoData;
      }

      const postParams: ServiceParameters = {
        'latitude': geoDataParam.coords.latitude,
        'longitude': geoDataParam.coords.longitude,
        'accuracy': geoDataParam.coords.accuracy,
        'filters': ['Normal', 'TempCode', 'Attendance']
      };

      this.httpRequest(this.serviceUrl, 'getMobileLocations', true, postParams)
        .subscribe(
          data => {
            // validate data then throw error or send
            if (data == null) {
              observer.error('No location information available.');
            } else {
              observer.next(data.response);
              observer.complete();
            }
          },
          error => {
            // do error stuff then push it to observer
            observer.error(error);
          }
        );
    });

  }


  /**
   * Activate 'Mobile Location' location for user
   *
   * @param locationId    Id of location to activate
   * @param geoData       Geolocation data of user if avaialable, null otherwise
   * @param sourceInfo    I don't know but we always null this out
   */
  activateMobileLocation(locationId: string, geoData: any, sourceInfo: string): Observable<MActivateMobileLocationResult> {

    return Observable.create((observer: any) => {

      const latitude = geoData == null || geoData.coords == null || geoData.coords.latitude == null ? null : geoData.coords.latitude;
      const longitude = geoData == null || geoData.coords == null || geoData.coords.longitude == null ? null : geoData.coords.longitude;
      const accuracy = geoData == null || geoData.coords == null || geoData.coords.accuracy == null ? null : geoData.coords.accuracy;
      const altitude = geoData == null || geoData.coords == null || geoData.coords.altitude == null ? null : geoData.coords.altitude;
      const altitudeAccuracy = geoData == null || geoData.coords == null ||
      geoData.coords.altitudeAccuracy == null ? null : geoData.coords.altitudeAccuracy;
      const heading = geoData == null || geoData.coords == null || geoData.coords.heading == null ? null : geoData.coords.heading;
      const speed = geoData == null || geoData.coords == null || geoData.coords.speed == null ? null : geoData.coords.speed;


      const postParams = {
        locationId: locationId,
        tranDate: new Date().toISOString(),
        latitude: latitude,
        longitude: longitude,
        accuracy: accuracy,
        altitude: altitude,
        altAccuracy: altitudeAccuracy,
        speed: speed,
        heading: heading,
        sourceInfo: sourceInfo
      };

      this.httpRequest(this.serviceUrl, 'activateMobileLocation', true, postParams)
        .subscribe(
          data => {
            // validate data then throw error or send
            if (data != null && data.response != null) {
              observer.next(data.response);
              observer.complete();
            } else {
              if (data != null && data.exception != null) {
                observer.error(data.exception);
              } else {
                observer.error('An unexpected error occurred');
              }

            }

          },
          error => {
            // do error stuff then push it to observer
            observer.error(error);
          }
        );
    });

  }

}
