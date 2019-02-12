import { Injectable } from '@angular/core';
import { Observable } from "rxjs/Observable";

import { GETService, ServiceParameters } from "../get-service/get-service";
import { MobileLocationInfo, ActivateMobileLocationResult } from '../../models/open-my-door/open-my-door.interface';
import { GeoCoordinates } from '../../models/geolocation/geocoordinates.interface';


@Injectable()
export class MobileAccessService extends GETService {

  private serviceUrl: string = '/json/commerce';

  /**
    * Retrieve Mobile Access locations for user
    * 
    * @param geoData   Geolocation data for user. null if none exists
    */
  public getMobileLocations(geoData: GeoCoordinates): Observable<MobileLocationInfo[]> {

    return Observable.create((observer: any) => {

      let geoDataParam: GeoCoordinates = {
        coords: {
          latitude: null,
          longitude: null,
          accuracy: null
        }
      }

      if (!(geoData == null || geoData.coords == null || geoData.coords.latitude == null || geoData.coords.longitude == null)) {
        geoDataParam = geoData;
      }

      let postParams: ServiceParameters = {
        "latitude": geoDataParam.coords.latitude,
        "longitude": geoDataParam.coords.longitude,
        "accuracy": geoDataParam.coords.accuracy,
        "filters": ["Normal", "TempCode", "Attendance"]
      };

      this.httpRequest(this.serviceUrl, 'getMobileLocations', true, postParams)
        .subscribe(
          data => {
            // validate data then throw error or send
            if (data == null) {
              observer.error("No location information available.")
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
  public activateMobileLocation(locationId: string, geoData: any, sourceInfo: string): Observable<ActivateMobileLocationResult> {

    return Observable.create((observer: any) => {

      let latitude = geoData == null || geoData.coords == null || geoData.coords.latitude == null ? null : geoData.coords.latitude;
      let longitude = geoData == null || geoData.coords == null || geoData.coords.longitude == null ? null : geoData.coords.longitude;
      let accuracy = geoData == null || geoData.coords == null || geoData.coords.accuracy == null ? null : geoData.coords.accuracy;
      let altitude = geoData == null || geoData.coords == null || geoData.coords.altitude == null ? null : geoData.coords.altitude;
      let altitudeAccuracy = geoData == null || geoData.coords == null || geoData.coords.altitudeAccuracy == null ? null : geoData.coords.altitudeAccuracy;
      let heading = geoData == null || geoData.coords == null || geoData.coords.heading == null ? null : geoData.coords.heading;
      let speed = geoData == null || geoData.coords == null || geoData.coords.speed == null ? null : geoData.coords.speed;


      let postParams = {
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

      console.log(JSON.stringify(postParams));

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
                observer.error("An unexpected error occurred");
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